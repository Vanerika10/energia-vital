-- Permite que o campo granted_by seja nulo (para webhooks automaticos do Nexano)
ALTER TABLE public.manual_access ALTER COLUMN granted_by DROP NOT NULL;

