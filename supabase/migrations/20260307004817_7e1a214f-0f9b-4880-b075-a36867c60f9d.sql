
CREATE TABLE public.chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

CREATE UNIQUE INDEX chat_history_user_id_idx ON public.chat_history (user_id);

CREATE POLICY "Users can read own chat history"
ON public.chat_history FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can insert own chat history"
ON public.chat_history FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own chat history"
ON public.chat_history FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own chat history"
ON public.chat_history FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- Function to clean old chat history
CREATE OR REPLACE FUNCTION public.cleanup_old_chat_history()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  DELETE FROM public.chat_history WHERE updated_at < now() - interval '7 days';
$$;
