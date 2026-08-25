import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import MagneticButton from './MagneticButton';

const EMOJIS = ['💜', '🔥', '🚀', '👏', '😍'];
const BLOCKED_WORDS = ['spamword1', 'spamword2', 'casino', 'crypto-scam', 'viagra'];
const LINK_REGEX = /(https?:\/\/|www\.)/i;
const MAX_MESSAGE_LENGTH = 220;
const MAX_NAME_LENGTH = 40;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

export function FeedbackForm({ onSubmitted }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [emoji, setEmoji] = useState('💜');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const containsBlockedWord = (text) => {
    const lower = text.toLowerCase();
    return BLOCKED_WORDS.some((word) => lower.includes(word));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    // 1. Honeypot guard (silent rejection for bots)
    if (honeypot) {
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 2500);
      return;
    }

    // 2. Validation
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const trimmedRole = role.trim();

    if (!trimmedName || !trimmedMessage) {
      setErrorMsg('Name and message are required.');
      setStatus('error');
      return;
    }

    if (trimmedName.length > MAX_NAME_LENGTH || trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      setErrorMsg('Input text exceeds character limit.');
      setStatus('error');
      return;
    }

    // 3. No links policy
    if (LINK_REGEX.test(trimmedMessage) || LINK_REGEX.test(trimmedName)) {
      setErrorMsg('Links are not allowed in feedback notes.');
      setStatus('error');
      return;
    }

    // 4. Profanity / spam filter
    if (containsBlockedWord(trimmedMessage) || containsBlockedWord(trimmedName)) {
      setErrorMsg('Submission contains blocked content.');
      setStatus('error');
      return;
    }

    // 5. Rate limiting via localStorage
    const lastSubmit = localStorage.getItem('last_feedback_submit');
    const now = Date.now();
    if (lastSubmit && now - Number(lastSubmit) < RATE_LIMIT_WINDOW_MS) {
      setErrorMsg('You are submitting too fast. Please wait a few minutes.');
      setStatus('error');
      return;
    }

    const newItem = {
      id: `live-${Date.now()}`,
      name: trimmedName,
      role: trimmedRole || null,
      message: trimmedMessage,
      emoji: emoji || '💜',
      approved: true,
      created_at: new Date().toISOString(),
    };

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('feedback')
          .insert({
            name: trimmedName,
            role: trimmedRole || null,
            message: trimmedMessage,
            emoji: emoji || '💜',
            approved: true,
          })
          .select()
          .single();

        if (error) throw error;
        if (data) {
          onSubmitted?.(data);
        } else {
          onSubmitted?.(newItem);
        }
      } else {
        // Fallback for pre-Supabase setup
        onSubmitted?.(newItem);
      }

      localStorage.setItem('last_feedback_submit', String(now));
      setStatus('sent');
      setName('');
      setRole('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('Feedback submission error:', err);
      setErrorMsg('Something went wrong submitting feedback. Please try again.');
      setStatus('error');
    }
  }

  return (
    <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Hidden Honeypot Input for anti-spam */}
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Your Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={MAX_NAME_LENGTH}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-black/15 text-black placeholder-neutral-500 text-sm font-medium focus:outline-none focus:border-black transition-colors"
          />

          <input
            type="text"
            placeholder="Role / Company (optional)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            maxLength={MAX_NAME_LENGTH}
            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-black/15 text-black placeholder-neutral-500 text-sm font-medium focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="relative">
          <textarea
            placeholder="Leave a note — say something nice or share your thoughts! (max 220 chars)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={MAX_MESSAGE_LENGTH}
            required
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-black/15 text-black placeholder-neutral-500 text-sm font-medium focus:outline-none focus:border-black transition-colors resize-none"
          />
          <div className="absolute bottom-2.5 right-3 text-[11px] font-mono text-neutral-600">
            {message.length}/{MAX_MESSAGE_LENGTH}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-black/5 p-1 rounded-xl border border-black/10">
            {EMOJIS.map((e) => (
              <button
                type="button"
                key={e}
                onClick={() => setEmoji(e)}
                aria-label={`Select emoji reaction ${e}`}
                className={`text-lg px-2 py-1 rounded-lg transition-all ${
                  emoji === e ? 'bg-white shadow-sm scale-110' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {e}
              </button>
            ))}
          </div>

          <MagneticButton strength={0.3}>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-6 py-3 rounded-full bg-black text-white font-semibold text-sm hover:bg-neutral-800 transition-all duration-300 shadow-md disabled:opacity-50 flex items-center gap-2"
            >
              {status === 'sending' ? (
                <span>Publishing...</span>
              ) : status === 'sent' ? (
                <span>Published! 🎉</span>
              ) : (
                <span>Send Note</span>
              )}
            </button>
          </MagneticButton>
        </div>

        {status === 'error' && (
          <p className="text-red-600 text-xs font-semibold mt-1 animate-fade-in">
            ⚠️ {errorMsg}
          </p>
        )}

        {!isSupabaseConfigured && (
          <p className="text-[11px] font-mono text-neutral-600 mt-1">
            ℹ️ Demo Mode: Connect Supabase VITE_SUPABASE_URL to persist to PostgreSQL.
          </p>
        )}
      </form>
    </div>
  );
}
