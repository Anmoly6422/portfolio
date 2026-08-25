import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const INITIAL_DEMO_FEEDBACK = [
  {
    id: 'demo-1',
    name: 'Sarah Jenkins',
    role: 'Tech Lead @ Vercel',
    message: 'Anmol’s portfolio is pure magic! The 3D planet transitions and UI polish are top-notch.',
    emoji: '🔥',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'demo-2',
    name: 'David Chen',
    role: 'Senior Recruiter @ Google',
    message: 'Insanely clean codebase and mobile app showcase. One of the best engineer portfolios I have reviewed.',
    emoji: '🚀',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'demo-3',
    name: 'Elena Rostova',
    role: 'Product Designer',
    message: 'The micro-interactions, dark aesthetic, and performance optimizations feel incredibly smooth!',
    emoji: '💜',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'demo-4',
    name: 'Alex Rivera',
    role: 'Startup Founder',
    message: 'Anmol delivered our React Native app ahead of schedule with flawless 60fps animations.',
    emoji: '👏',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'demo-5',
    name: 'Marcus Vance',
    role: 'Full-Stack Engineer',
    message: 'Obsessed with the custom cursor and Awwwards-style architectural curtain preloader!',
    emoji: '😍',
    created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
];

export function useFeedbackWall() {
  const [items, setItems] = useState(INITIAL_DEMO_FEEDBACK);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    // 1. Initial fetch from Supabase
    async function fetchFeedback() {
      try {
        const { data, error } = await supabase
          .from('feedback')
          .select('*')
          .eq('approved', true)
          .order('created_at', { ascending: false })
          .limit(50);

        if (!error && data && data.length > 0) {
          setItems(data);
        }
      } catch (err) {
        console.warn('Error fetching feedback from Supabase:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeedback();

    // 2. Realtime Subscription for live instant feedback updates
    const channel = supabase
      .channel('feedback-wall')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'feedback' },
        (payload) => {
          const newItem = payload.new;
          setItems((prev) => [newItem, ...prev.filter(item => item.id !== newItem.id)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addLocalItem = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
  };

  return { items, loading, addLocalItem };
}
