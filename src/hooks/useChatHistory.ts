import { useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
}

export function useChatHistory(
  messages: Message[],
  setMessages: (msgs: Message[]) => void,
  initialMessages: Message[],
  onHistoryLoaded?: (hadUserMessages: boolean) => void
) {
  const { user } = useAuth();
  const loaded = useRef(false);
  const saveTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Load on mount
  useEffect(() => {
    if (!user || loaded.current) return;
    loaded.current = true;

    (async () => {
      const { data } = await supabase
        .from("chat_history")
        .select("messages")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data?.messages && Array.isArray(data.messages) && data.messages.length > 0) {
        const restored = data.messages as unknown as Message[];
        setMessages(restored);
        const hadUserMsgs = restored.some(m => m.role === "user");
        onHistoryLoaded?.(hadUserMsgs);
      }
    })();
  }, [user]);

  // Save with debounce
  const saveMessages = useCallback(
    (msgs: Message[]) => {
      if (!user || msgs.length <= initialMessages.length) return;

      clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(async () => {
        await supabase.from("chat_history").upsert(
          [{
            user_id: user.id,
            messages: msgs as unknown as any,
            updated_at: new Date().toISOString(),
          }],
          { onConflict: "user_id" }
        );
      }, 1000);
    },
    [user, initialMessages.length]
  );

  // Auto-save when messages change
  useEffect(() => {
    saveMessages(messages);
  }, [messages, saveMessages]);

  return { loaded: loaded.current };
}
