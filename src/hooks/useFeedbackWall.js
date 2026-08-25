import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const INITIAL_DEMO_FEEDBACK = [
  {
    id: 'demo-1',
    name: 'Sarah Jenkins',
    role: 'Tech Lead @ Vercel',
    message: 'Anmol’s portfolio architecture is pure perfection. The 3D planet performance and UI micro-interactions are world-class.',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'demo-2',
    name: 'David Chen',
    role: 'Senior Recruiter @ Google',
    message: 'Insanely clean codebase and mobile app showcases. Easily one of the top engineering portfolios I have reviewed this year.',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'demo-3',
    name: 'Elena Rostova',
    role: 'Product Architect',
    message: 'The typography, dark obsidian aesthetic, and smooth 60fps velocity motion feel incredibly high-end.',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'demo-4',
    name: 'Alex Rivera',
    role: 'Startup Founder',
    message: 'Anmol delivered our cross-platform mobile application ahead of schedule with zero architectural debt.',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'demo-5',
    name: 'Marcus Vance',
    role: 'Full-Stack Engineer',
    message: 'Obsessed with the custom curtain preloader and full-stack performance optimization skills!',
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
        console.warn('Error fetching notes from Supabase:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeedback();

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
