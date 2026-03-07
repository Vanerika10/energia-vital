-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: users can read their own roles
CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- RLS: admins can manage all roles
CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Manual access table for admin-granted access
CREATE TABLE public.manual_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  granted_by uuid REFERENCES auth.users(id) NOT NULL,
  granted_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  user_name text,
  UNIQUE (user_email)
);

ALTER TABLE public.manual_access ENABLE ROW LEVEL SECURITY;

-- RLS: admins can manage manual_access
CREATE POLICY "Admins can manage manual_access"
  ON public.manual_access FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS: users can read own manual_access
CREATE POLICY "Users can read own manual_access"
  ON public.manual_access FOR SELECT TO authenticated
  USING (user_email = (SELECT email FROM auth.users WHERE id = auth.uid()));