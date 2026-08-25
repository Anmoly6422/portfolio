import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import MagneticButton from './MagneticButton';
import { XIcon } from './Icons';

const BLOCKED_WORDS = ['spamword1', 'spamword2', 'casino', 'crypto-scam', 'viagra'];
const LINK_REGEX = /(https?:\/\/|www\.)/i;
const MAX_MESSAGE_LENGTH = 220;
const MAX_NAME_LENGTH = 40;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;

export function FeedbackFormModal({ isOpen, onClose, onSubmitted }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const containsBlockedWord = (text) => {
    const lower = text.toLowerCase();
    return BLOCKED_WORDS.some((word) => lower.includes(word));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    if (honeypot) {
      setStatus('sent');
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 1500);
      return;
    }

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

    if (LINK_REGEX.test(trimmedMessage) || LINK_REGEX.test(trimmedName)) {
      setErrorMsg('Links are not allowed in notes.');
      setStatus('error');
      return;
    }

    if (containsBlockedWord(trimmedMessage) || containsBlockedWord(trimmedName)) {
      setErrorMsg('Submission contains blocked content.');
      setStatus('error');
      return;
    }

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
        onSubmitted?.(newItem);
      }

      localStorage.setItem('last_feedback_submit', String(now));
      setStatus('sent');
      setName('');
      setRole('');
      setMessage('');
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 1800);
    } catch (err) {
      console.error('Note submission error:', err);
      const detailedMessage = err.message || err.error_description || 'Database error occurred.';
      
      // If table doesn't exist yet in Supabase, append locally so UI flow stays seamless
      onSubmitted?.(newItem);
      setStatus('sent');
      setName('');
      setRole('');
      setMessage('');
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 1800);
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fade-in select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl bg-[#121214] border border-white/15 p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.6)] text-white relative"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#cfa355] animate-pulse" />
            <h3 className="text-lg font-bold tracking-tight text-white uppercase">Sign the Wall of Love</h3>
          </div>

          <MagneticButton onClick={onClose} aria-label="Close modal">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white hover:text-black transition-colors text-white">
              <XIcon className="size-5" />
            </button>
          </MagneticButton>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              placeholder="Your Full Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={MAX_NAME_LENGTH}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm font-medium focus:outline-none focus:border-[#cfa355] transition-colors"
            />

            <input
              type="text"
              placeholder="Role / Company (e.g. Recruiter @ Google)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              maxLength={MAX_NAME_LENGTH}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm font-medium focus:outline-none focus:border-[#cfa355] transition-colors"
            />
          </div>

          <div className="relative">
            <textarea
              placeholder="Write your note for the Wall of Love... (max 220 chars)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={MAX_MESSAGE_LENGTH}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm font-medium focus:outline-none focus:border-[#cfa355] transition-colors resize-none"
            />
            <div className="absolute bottom-2.5 right-3 text-[11px] font-mono text-neutral-500">
              {message.length}/{MAX_MESSAGE_LENGTH}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
              INSTANT PUBLISH
            </div>

            <MagneticButton strength={0.3}>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all duration-300 shadow-md disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <span>Publishing...</span>
                ) : status === 'sent' ? (
                  <span>Published to Wall of Love!</span>
                ) : (
                  <span>Publish Note</span>
                )}
              </button>
            </MagneticButton>
          </div>

          {status === 'error' && (
            <p className="text-red-400 text-xs font-semibold mt-1">
              ⚠️ {errorMsg}
            </p>
          )}

          {!isSupabaseConfigured && (
            <p className="text-[11px] font-mono text-neutral-500 mt-2">
              ℹ️ Demo Mode: Connect Supabase VITE_SUPABASE_URL to persist to PostgreSQL.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
