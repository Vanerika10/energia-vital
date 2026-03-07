import { useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Shield, Clock, LogOut, Crown, Leaf, ArrowRight, BarChart2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

// ─── helpers de progresso (lê localStorage) ──────────────────────────────────
const get7DiasProgress = () => {
  try {
    const data = JSON.parse(localStorage.getItem("ev_7dias_progress") || "{}");
    const completed = Object.values(data).filter(Boolean).length;
    return { completed, total: 28, pct: Math.round((completed / 28) * 100) };
  } catch { return { completed: 0, total: 28, pct: 0 }; }
};

const getChecklistProgress = () => {
  try {
    const data = JSON.parse(localStorage.getItem("ev_checklist_progress") || "{}");
    const completed = Object.values(data).filter(Boolean).length;
    return { completed, total: 24, pct: Math.round((completed / 24) * 100) };
  } catch { return { completed: 0, total: 24, pct: 0 }; }
};

const getDiagnosticoProgress = () => {
  // diagnóstico não persiste — apenas indicamos se foi feito alguma vez
  return { completed: 0, total: 1, pct: 0 };
};

const getRotinaProgress = () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const data = JSON.parse(localStorage.getItem(`ev_rotina_${today}`) || "{}");
    const completed = Object.values(data).filter(Boolean).length;
    // contar quantos dias distintos têm pelo menos 1 tarefa
    let daysActive = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("ev_rotina_")) {
        const d = JSON.parse(localStorage.getItem(key) || "{}");
        if (Object.values(d).some(Boolean)) daysActive++;
      }
    }
    return { completed, total: 12, pct: Math.round((completed / 12) * 100), daysActive };
  } catch { return { completed: 0, total: 12, pct: 0, daysActive: 0 }; }
};

const programs = [
  {
    id: "7-dias",
    label: "7 Dias",
    to: "/programas/7-dias",
    color: "bg-green-500",
    lightColor: "bg-green-50",
    textColor: "text-green-700",
    getProgress: get7DiasProgress,
    unit: "tarefas",
  },
  {
    id: "checklist",
    label: "Checklist",
    to: "/programas/checklist",
    color: "bg-rose-500",
    lightColor: "bg-rose-50",
    textColor: "text-rose-700",
    getProgress: getChecklistProgress,
    unit: "habitos",
  },
  {
    id: "rotina",
    label: "Rotina",
    to: "/programas/rotina",
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50",
    textColor: "text-indigo-700",
    getProgress: getRotinaProgress,
    unit: "passos hoje",
  },
  {
    id: "diagnostico",
    label: "Diagnostico",
    to: "/programas/diagnostico",
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-700",
    getProgress: getDiagnosticoProgress,
    unit: "",
  },
];

// ─── componente ──────────────────────────────────────────────────────────────
const Profile = () => {
  const { user, hasAccess, isAdmin, accessUntil, signOut, checkAccess } = useAuth();
  const navigate = useNavigate();

  const progressData = useMemo(() => programs.map((p) => ({ ...p, progress: p.getProgress() })), []);

  const totalTasksDone = useMemo(() => {
    const dias = get7DiasProgress().completed;
    const check = getChecklistProgress().completed;
    const rotina = getRotinaProgress().completed;
    return dias + check + rotina;
  }, []);

  const rotinaData = useMemo(() => getRotinaProgress(), []);

  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    toast.success("Ate logo!");
    navigate("/");
  };

  const handleRefreshAccess = async () => {
    await checkAccess();
    toast.success("Status atualizado!");
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  };

  const daysRemaining = accessUntil
    ? Math.max(0, Math.ceil((new Date(accessUntil).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const initials = user.email ? user.email.slice(0, 2).toUpperCase() : "EV";

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-md space-y-5">

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <span className="text-xl font-bold text-primary">{initials}</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Meu Perfil</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
          <p className="text-xs text-muted-foreground">Membro desde {formatDate(user.created_at)}</p>
        </div>

        {/* Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className={`rounded-2xl p-5 border-2 ${hasAccess ? "bg-green-50 border-green-200" : "bg-card border-border"}`}
        >
          <div className="flex items-center gap-3 mb-3">
            {hasAccess
              ? <Crown className="h-5 w-5 text-green-600 shrink-0" />
              : <Leaf className="h-5 w-5 text-muted-foreground shrink-0" />}
            <div>
              <p className="font-semibold text-sm">{hasAccess ? "Acesso Ativo" : "Sem Assinatura"}</p>
              <p className="text-xs text-muted-foreground">{hasAccess ? "Essencia Vital — 3 meses" : "Voce ainda nao tem acesso"}</p>
            </div>
          </div>

          {hasAccess ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Acesso ate</span>
                <span className="font-medium">{formatDate(accessUntil)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Dias restantes</span>
                <span className="font-medium">{daysRemaining} dias</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-green-200 overflow-hidden mt-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (daysRemaining / 90) * 100)}%` }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="h-full rounded-full bg-green-500"
                />
              </div>
            </div>
          ) : (
            <Button onClick={() => navigate("/assinar")} className="w-full rounded-full mt-1" size="sm">
              Assinar Agora
            </Button>
          )}
        </motion.div>

        {/* Minha Jornada */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm text-foreground">Minha Jornada</h2>
            <span className="text-xs text-muted-foreground">{totalTasksDone} acoes concluidas</span>
          </div>

          {rotinaData.daysActive > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mb-4 flex items-center gap-2">
              <span className="text-lg">🔥</span>
              <p className="text-xs text-amber-700 font-medium">
                Voce usou a rotina em {rotinaData.daysActive} {rotinaData.daysActive === 1 ? "dia" : "dias"} diferentes!
              </p>
            </div>
          )}

          <div className="space-y-3">
            {progressData.map((p) => (
              <Link key={p.id} to={p.to} className="block group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground">{p.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {p.id === "diagnostico"
                        ? "Quiz interativo"
                        : `${p.progress.completed}/${p.progress.total} ${p.unit}`}
                    </span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </div>
                {p.id !== "diagnostico" && (
                  <div className={`h-1.5 w-full rounded-full ${p.lightColor} overflow-hidden`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.progress.pct}%` }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className={`h-full rounded-full ${p.color}`}
                    />
                  </div>
                )}
              </Link>
            ))}
          </div>

          <Link to="/programas" className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            Ver todos os programas <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* Admin */}
        {isAdmin && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl bg-purple-50 border border-purple-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-purple-600" />
              <h2 className="font-semibold text-sm text-purple-900">Area Admin</h2>
            </div>
            <div className="space-y-2">
              <Button onClick={() => navigate("/admin")} variant="outline" size="sm" className="w-full rounded-xl justify-start gap-2 border-purple-200 bg-white/60 text-purple-800 hover:bg-purple-100">
                <BarChart2 className="h-4 w-4" /> Analytics e padroes de consumo
              </Button>
              <Button onClick={() => navigate("/admin")} variant="outline" size="sm" className="w-full rounded-xl justify-start gap-2 border-purple-200 bg-white/60 text-purple-800 hover:bg-purple-100">
                <UserPlus className="h-4 w-4" /> Gerenciar acessos de usuarios
              </Button>
            </div>
          </motion.div>
        )}

        {/* Acoes */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-2">
          <Button variant="outline" onClick={handleRefreshAccess} className="w-full rounded-full" size="sm">
            <Clock className="h-4 w-4 mr-2" /> Atualizar status da assinatura
          </Button>
          <Button variant="outline" onClick={handleSignOut} className="w-full rounded-full text-destructive hover:text-destructive" size="sm">
            <LogOut className="h-4 w-4 mr-2" /> Sair da conta
          </Button>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Profile;
