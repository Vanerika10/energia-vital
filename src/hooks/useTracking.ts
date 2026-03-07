import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type EventType =
  | "program_open"
  | "program_task"
  | "program_complete"
  | "library_view"
  | "diagnostic_complete"
  | "chat_message";

interface TrackOptions {
  program?: string;
  item_id?: string;
  score?: number;
  metadata?: Record<string, unknown>;
}

export const useTracking = () => {
  const { user } = useAuth();

  const track = useCallback(
    async (event_type: EventType, options: TrackOptions = {}) => {
      if (!user) return;
      try {
        await supabase.from("user_events").insert([{
          user_id: user.id,
          event_type,
          program: options.program ?? null,
          item_id: options.item_id ?? null,
          score: options.score ?? null,
          metadata: (options.metadata as any) ?? null,
        }]);
      } catch {
        // silencioso — tracking nunca deve quebrar a experiência
      }
    },
    [user]
  );

  return { track };
};
