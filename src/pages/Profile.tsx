import { motion } from "framer-motion";
import { User, Mail, Calendar, Shield, Clock, Leaf, LogOut, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const { user, hasAccess, isAdmin, accessUntil, signOut, checkAccess } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    toast.success("Até logo! 🌿");
    navigate("/");
  };

  const handleRefreshAccess = async () => {
    await checkAccess();
    toast.success("Status atualizado!");
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const daysRemaining = accessUntil
    ? Math.max(0, Math.ceil((new Date(accessUntil).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-md space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent">
            <User className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold">Meu Perfil</h1>
          <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
        </div>

        {/* Subscription Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-2xl p-6 shadow-card border-2 ${
            hasAccess
              ? "bg-card border-primary/20"
              : "bg-card border-border"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            {hasAccess ? (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                <Crown className="h-5 w-5 text-primary" />
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Leaf className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
            <div>
              <h2 className="font-semibold text-lg">
                {hasAccess ? "Acesso Ativo" : "Sem Assinatura"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {hasAccess ? "Essência Vital — 3 meses" : "Você ainda não tem acesso"}
              </p>
            </div>
          </div>

          {hasAccess ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Acesso até
                </span>
                <span className="font-medium">{formatDate(accessUntil)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Dias restantes
                </span>
                <span className="font-medium">{daysRemaining} dias</span>
              </div>

              {/* Progress bar */}
              <div className="mt-2">
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (daysRemaining / 90) * 100)}%` }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => navigate("/assinar")}
              className="w-full rounded-full mt-2"
            >
              Assinar Agora
            </Button>
          )}
        </motion.div>

        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-card p-6 shadow-card space-y-4"
        >
          <h3 className="font-semibold text-lg">Conta</h3>

          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground text-xs">E-mail</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground text-xs">Membro desde</p>
              <p className="font-medium">{formatDate(user.created_at)}</p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {isAdmin && (
            <Button
              onClick={() => navigate("/admin")}
              className="w-full rounded-full"
            >
              <Shield className="h-4 w-4 mr-2" />
              Painel Admin
            </Button>
          )}

          <Button
            variant="outline"
            onClick={handleRefreshAccess}
            className="w-full rounded-full"
          >
            <Clock className="h-4 w-4 mr-2" />
            Atualizar status da assinatura
          </Button>

          <Button
            variant="outline"
            onClick={handleSignOut}
            className="w-full rounded-full text-destructive hover:text-destructive"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair da conta
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
