import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Shield, UserPlus, Trash2, Leaf, Users, RefreshCw } from "lucide-react";

interface ManualAccess {
  id: string;
  user_email: string;
  user_name: string | null;
  granted_at: string;
  expires_at: string;
}

const Admin = () => {
  const { user, loading, isAdmin, checkingAccess } = useAuth();
  const [users, setUsers] = useState<ManualAccess[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [granting, setGranting] = useState(false);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-users", {
        body: { action: "list_users" },
      });
      if (error) throw error;
      setUsers(data.users || []);
    } catch (err: any) {
      toast.error("Erro ao carregar usuários");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  const handleGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setGranting(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-users", {
        body: { action: "grant_access", email: email.trim().toLowerCase(), name: name.trim() },
      });
      if (error) throw error;
      toast.success(`Acesso concedido para ${email}`);
      setEmail("");
      setName("");
      fetchUsers();
    } catch (err: any) {
      toast.error("Erro ao conceder acesso");
    } finally {
      setGranting(false);
    }
  };

  const handleRevoke = async (userEmail: string) => {
    try {
      const { error } = await supabase.functions.invoke("admin-users", {
        body: { action: "revoke_access", email: userEmail },
      });
      if (error) throw error;
      toast.success("Acesso revogado");
      fetchUsers();
    } catch {
      toast.error("Erro ao revogar acesso");
    }
  };

  if (loading || checkingAccess) {
    return (
      <div className="flex min-h-[calc(100vh-65px)] items-center justify-center">
        <Leaf className="h-8 w-8 text-primary animate-pulse" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-65px)] px-4 py-8 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Painel Admin</h1>
        </div>

        {/* Grant access form */}
        <div className="rounded-2xl bg-card p-6 shadow-elevated border border-border mb-8">
          <div className="flex items-center gap-2 mb-4">
            <UserPlus className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Conceder Acesso (90 dias)</h2>
          </div>
          <form onSubmit={handleGrant} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail do usuário *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@email.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="name">Nome (opcional)</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do usuário"
              />
            </div>
            <Button type="submit" disabled={granting} className="w-full rounded-full">
              {granting ? "Concedendo..." : "Conceder Acesso"}
            </Button>
          </form>
        </div>

        {/* User list */}
        <div className="rounded-2xl bg-card p-6 shadow-elevated border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Usuários com Acesso Manual</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={fetchUsers} disabled={loadingUsers}>
              <RefreshCw className={`h-4 w-4 ${loadingUsers ? "animate-spin" : ""}`} />
            </Button>
          </div>

          {users.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Nenhum usuário com acesso manual ainda.
            </p>
          ) : (
            <div className="space-y-3">
              {users.map((u) => {
                const isExpired = new Date(u.expires_at) < new Date();
                return (
                  <div
                    key={u.id}
                    className={`flex items-center justify-between p-3 rounded-xl border ${
                      isExpired ? "border-destructive/30 bg-destructive/5" : "border-border"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">
                        {u.user_name || u.user_email}
                      </p>
                      {u.user_name && (
                        <p className="text-xs text-muted-foreground truncate">{u.user_email}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {isExpired ? "Expirado" : `Expira em ${new Date(u.expires_at).toLocaleDateString("pt-BR")}`}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRevoke(u.user_email)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Admin;
