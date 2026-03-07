-- Tabela de eventos para rastreamento de comportamento das usuárias
CREATE TABLE IF NOT EXISTS public.user_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  event_type text NOT NULL,
  -- Tipos: 'program_open', 'program_task', 'program_complete', 'library_view', 'diagnostic_complete', 'chat_message'
  program text,
  -- '7-dias', 'checklist', 'diagnostico', 'rotina', 'biblioteca'
  item_id text,
  -- id da tarefa, artigo, etc
  score integer,
  -- pontuacao do diagnostico
  metadata jsonb,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.user_events ENABLE ROW LEVEL SECURITY;

-- Usuárias só inserem e leem os próprios eventos
CREATE POLICY "Users insert own events"
  ON public.user_events FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users read own events"
  ON public.user_events FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Admins leem todos os eventos (para analytics)
CREATE POLICY "Admins read all events"
  ON public.user_events FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Índices para queries de analytics
CREATE INDEX IF NOT EXISTS user_events_user_id_idx ON public.user_events (user_id);
CREATE INDEX IF NOT EXISTS user_events_event_type_idx ON public.user_events (event_type);
CREATE INDEX IF NOT EXISTS user_events_program_idx ON public.user_events (program);
CREATE INDEX IF NOT EXISTS user_events_created_at_idx ON public.user_events (created_at DESC);
