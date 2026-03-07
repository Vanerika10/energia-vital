import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  hasAccess: boolean;
  isAdmin: boolean;
  accessUntil: string | null;
  checkingAccess: boolean;
  signOut: () => Promise<void>;
  checkAccess: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessUntil, setAccessUntil] = useState<string | null>(null);
  const [checkingAccess, setCheckingAccess] = useState(false);

  const checkAccess = async () => {
    if (!session) {
      setHasAccess(false);
      setIsAdmin(false);
      setAccessUntil(null);
      return;
    }
    setCheckingAccess(true);
    try {
      const { data, error } = await supabase.functions.invoke("check-payment");
      if (!error && data) {
        setHasAccess(data.has_access ?? false);
        setIsAdmin(data.is_admin ?? false);
        setAccessUntil(data.access_until ?? null);
      }
    } catch {
      // silent fail
    } finally {
      setCheckingAccess(false);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      checkAccess();
    } else {
      setHasAccess(false);
      setIsAdmin(false);
      setAccessUntil(null);
    }
  }, [session]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, hasAccess, isAdmin, accessUntil, checkingAccess, signOut, checkAccess }}>
      {children}
    </AuthContext.Provider>
  );
};
