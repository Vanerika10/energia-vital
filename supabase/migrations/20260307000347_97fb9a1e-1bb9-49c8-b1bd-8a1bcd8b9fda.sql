-- Function to assign admin role by email (called from edge function with service role)
CREATE OR REPLACE FUNCTION public.assign_admin_by_email(_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid;
BEGIN
  SELECT id INTO _user_id FROM auth.users WHERE email = _email;
  IF _user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;

-- Auto-assign admin role on signup for known admin emails
CREATE OR REPLACE FUNCTION public.handle_admin_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email IN ('vanerikaamorim@gmail.com', 'balsamolucianepeixoto@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_admin_signup();

-- Try to assign admin to existing users with these emails
SELECT public.assign_admin_by_email('vanerikaamorim@gmail.com');
SELECT public.assign_admin_by_email('balsamolucianepeixoto@gmail.com');