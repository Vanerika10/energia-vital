import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Shield, UserPlus, Trash2, Leaf, Users, RefreshCw, BarChart2, TrendingUp, MessageSquare, BookOpen, Activity } from "lucide-react";

interface ManualAccess {
  id: string;
  user_email: string;
  user_name: string | null;
  granted_at: string;
  expires_at: string;
}

interface EventRow {
  event_type: string;
  program: string | null;
  item_id: string | null;
  score: number | null;
  created_at: string;
  user_id: string;
}

interface ProgramStat {
  name: string;
  opens: number;
  completions: number;
  color: string;
}

interface AnalyticsData {
  totalEvents: number;
  totalUsers: number;
  chatMessages: number;
  libraryViews: number;
  programStats: ProgramStat[];
  diagnosticScores: { level: string; count: number; color: string }[];
  recentActivity: { user_id: string; event_type: string; program: string | null; created_at: string }[];
  topLibraryItems: { item_id: string; count: number }[];
}

const PROGRAM_LABELS: Record<string, string> = {
  "7-dias": "7 Dias",
  checklist: "Checklist",
  diagnostico: "Diagnostico",
  rotina: "Rotina",
  biblioteca: "Biblioteca",
};

const PROGRAM_COLORS: Record<string, string> = {
  "7-dias": "bg-green-500",
  checklist: "bg-rose-500",
  diagnostico: "bg-purple-500",
  rotina: "bg-indigo-500",
  biblioteca: "bg-amber-500",
};

const Admin = () => {
  const { user, loading, isAdmin, checkingAccess } = useAuth();
  const [tab, setTab] = useState<"users" | "analytics">("analytics");
  const [users, setUsers] = useState<ManualAccess[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [granting, setGranting] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-users", { body: { action: "list_users" } });
      if (error) throw error;
      setUsers(data.users || []);
    } catch {
      toast.error("Erro ao carregar usuarios");
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const { data: events, error } = await supabase
        .from("user_events" as never)
        .select("event_type, program, item_id, score, created_at, user_id")
        .order("created_at", { ascending: false })
        .limit(1000) as { data: EventRow[] | null; error: unknown };

      if (error || !events) throw error;

      const totalEvents = events.length;
      const uniqueUsers = new Set(events.map((e) => e.user_id)).size;
      const chatMessages = events.filter((e) => e.event_type === "chat_message").length;
      const libraryViews = events.filter((e) => e.event_type === "library_view").length;

      // Program stats
      const programMap: Record<string, { opens: number; completions: number }> = {};
      events.forEach((e) => {
        if (!e.program) return;
        if (!programMap[e.program]) programMap[e.program] = { opens: 0, completions: 0 };
        if (e.event_type === "program_open") programMap[e.program].opens++;
        if (e.event_type === "program_complete") programMap[e.program].completions++;
      });
      const programStats: ProgramStat[] = Object.entries(programMap).map(([key, val]) => ({
        name: PROGRAM_LABELS[key] || key,
        opens: val.opens,
        completions: val.completions,
        color: PROGRAM_COLORS[key] || "bg-gray-400",
      })).sort((a, b) => b.opens - a.opens);

      // Diagnostic scores
      const diagEvents = events.filter((e) => e.event_type === "diagnostic_complete" && e.score != null);
      const levelCounts = { "Nivel 1": 0, "Nivel 2": 0, "Nivel 3": 0, "Nivel 4": 0, "Nivel 5": 0 };
      diagEvents.forEach((e) => {
        const s = e.score!;
        if (s <= 20) levelCounts["Nivel 1"]++;
        else if (s <= 30) levelCounts["Nivel 2"]++;
        else if (s <= 40) levelCounts["Nivel 3"]++;
        else if (s <= 50) levelCounts["Nivel 4"]++;
        else levelCounts["Nivel 5"]++;
      });
      const diagColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"];
      const diagnosticScores = Object.entries(levelCounts).map(([level, count], i) => ({ level, count, color: diagColors[i] }));

      // Top library items
      const libEvents = events.filter((e) => e.event_type === "library_view" && e.item_id);
      const libMap: Record<string, number> = {};
      libEvents.forEach((e) => { libMap[e.item_id!] = (libMap[e.item_id!] || 0) + 1; });
      const topLibraryItems = Object.entries(libMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([item_id, count]) => ({ item_id, count }));

      // Recent activity (last 10)
      const recentActivity = events.slice(0, 10).map((e) => ({
        user_id: e.user_id.slice(0, 8) + "...",
        event_type: e.event_type,
        program: e.program,
        created_at: e.created_at,
      }));

      setAnalytics({ totalEvents, totalUsers: uniqueUsers, chatMessages, libraryViews, programStats, diagnosticScores, recentActivity, topLibraryItems });
    } catch {
      toast.error("Erro ao carregar analytics");
    } finally {
      setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchAnalytics();
    }
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
      setEmail(""); setName("");
      fetchUsers();
    } catch {
      toast.error("Erro ao conceder acesso");
    } finally {
      setGranting(false);
    }
  };

  const handleRevoke = async (userEmail: string) => {
    try {
      const { error } = await supabase.functions.invoke("admin-users", { body: { action: "revoke_access", email: userEmail } });
      if (error) throw error;
      toast.success("Acesso revogado");
      fetchUsers();
    } catch {
      toast.error("Erro ao revogar acesso");
    }
  };

  const formatEventLabel = (type: string) => {
    const labels: Record<string, string> = {
      program_open: "abriu programa",
      program_task: "completou tarefa",
      program_complete: "concluiu programa",
      library_view: "leu na biblioteca",
      diagnostic_complete: "fez diagnostico",
      chat_message: "mensagem no chat",
    };
    return labels[type] || type;
  };

  if (loading || checkingAccess) {
    return <div className="flex min-h-screen items-center justify-center"><Leaf className="h-8 w-8 text-primary animate-pulse" /></div>;
  }
  if (!user || !isAdmin) return <Navigate to="/" replace />;

  const maxOpens = analytics?.programStats.reduce((m, p) => Math.max(m, p.opens), 1) || 1;
  const maxDiag = analytics?.diagnosticScores.reduce((m, d) => Math.max(m, d.count), 1) || 1;

  return (
    <div className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">Painel Admin</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-muted rounded-xl p-1">
          <button
            onClick={() => setTab("analytics")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${tab === "analytics" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
          >
            <BarChart2 className="h-4 w-4" /> Analytics
          </button>
          <button
            onClick={() => setTab("users")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${tab === "users" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
          >
            <Users className="h-4 w-4" /> Usuarios
          </button>
        </div>

        {/* ── ANALYTICS TAB ── */}
        {tab === "analytics" && (
          <div className="space-y-5">
            {loadingAnalytics ? (
              <div className="flex justify-center py-12"><Leaf className="h-6 w-6 text-primary animate-pulse" /></div>
            ) : analytics ? (
              <>
                {/* Summary cards */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Activity, label: "Total de eventos", value: analytics.totalEvents, color: "text-purple-600" },
                    { icon: Users, label: "Usuarios ativos", value: analytics.totalUsers, color: "text-blue-600" },
                    { icon: MessageSquare, label: "Msgs no chat", value: analytics.chatMessages, color: "text-green-600" },
                    { icon: BookOpen, label: "Leituras biblioteca", value: analytics.libraryViews, color: "text-amber-600" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
                      <stat.icon className={`h-5 w-5 mb-2 ${stat.color}`} />
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Programas mais acessados */}
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm">Programas — engajamento</h3>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                  {analytics.programStats.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4">Nenhum dado ainda. As usuarias precisam usar os programas primeiro.</p>
                  ) : (
                    <div className="space-y-3">
                      {analytics.programStats.map((p) => (
                        <div key={p.name}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-foreground">{p.name}</span>
                            <span className="text-xs text-muted-foreground">{p.opens} acessos · {p.completions} concluidos</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${p.color} transition-all duration-700`}
                              style={{ width: `${Math.max(4, (p.opens / maxOpens) * 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Diagnostico — distribuicao de niveis */}
                <div className="bg-card border border-border rounded-2xl p-5">
                  <h3 className="font-semibold text-sm mb-4">Diagnostico — niveis das usuarias</h3>
                  {analytics.diagnosticScores.every((d) => d.count === 0) ? (
                    <p className="text-xs text-muted-foreground text-center py-4">Nenhum diagnostico feito ainda.</p>
                  ) : (
                    <div className="space-y-2">
                      {analytics.diagnosticScores.map((d) => (
                        <div key={d.level}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-foreground">{d.level}</span>
                            <span className="text-xs text-muted-foreground">{d.count} {d.count === 1 ? "usuaria" : "usuarias"}</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${d.color} transition-all duration-700`}
                              style={{ width: `${Math.max(d.count > 0 ? 6 : 0, (d.count / maxDiag) * 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-[11px] text-muted-foreground mt-3 italic">
                    Este dado mostra onde estao as suas clientes — orienta o desenvolvimento de novos produtos e servicos.
                  </p>
                </div>

                {/* Top biblioteca */}
                {analytics.topLibraryItems.length > 0 && (
                  <div className="bg-card border border-border rounded-2xl p-5">
                    <h3 className="font-semibold text-sm mb-3">Conteudo mais lido na Biblioteca</h3>
                    <div className="space-y-2">
                      {analytics.topLibraryItems.map((item, i) => (
                        <div key={item.item_id} className="flex items-center justify-between">
                          <span className="text-xs text-foreground truncate flex-1">{i + 1}. {item.item_id}</span>
                          <span className="text-xs text-muted-foreground shrink-0 ml-2">{item.count} {item.count === 1 ? "leitura" : "leituras"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Atividade recente */}
                {analytics.recentActivity.length > 0 && (
                  <div className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-sm">Atividade recente</h3>
                      <button onClick={fetchAnalytics} className="text-muted-foreground hover:text-foreground">
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {analytics.recentActivity.map((a, i) => (
                        <div key={i} className="flex items-start justify-between gap-2 py-1.5 border-b border-muted last:border-0">
                          <div>
                            <p className="text-xs text-foreground">
                              <span className="font-mono text-muted-foreground text-[10px]">{a.user_id}</span>{" "}
                              {formatEventLabel(a.event_type)}
                              {a.program && <span className="text-muted-foreground"> · {PROGRAM_LABELS[a.program] || a.program}</span>}
                            </p>
                          </div>
                          <span className="text-[10px] text-muted-foreground shrink-0">
                            {new Date(a.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        )}

        {/* ── USUARIOS TAB ── */}
        {tab === "users" && (
          <div className="space-y-5">
            {/* Instrucoes */}
            <div className="rounded-2xl p-4 border text-sm" style={{ background: "rgba(16,120,80,0.06)", borderColor: "rgba(16,120,80,0.2)" }}>
              <p className="font-semibold text-foreground mb-1">Como funciona o acesso manual?</p>
              <ol className="space-y-1 text-muted-foreground list-decimal list-inside text-xs leading-relaxed">
                <li>A pessoa precisa <strong>primeiro criar a conta dela</strong> no site (e-mail e senha) — você não consegue fazer isso por ela.</li>
                <li>Depois que ela criou a conta, você digita o e-mail dela aqui embaixo e clica em <strong>Conceder Acesso</strong>.</li>
                <li>O acesso é liberado por <strong>90 dias</strong> automaticamente.</li>
              </ol>
            </div>

            {/* Grant access form */}
            <div className="rounded-2xl bg-card p-5 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <UserPlus className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Conceder Acesso (90 dias)</h2>
              </div>
              <form onSubmit={handleGrant} className="space-y-3">
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="usuario@email.com" required />
                </div>
                <div>
                  <Label htmlFor="name">Nome (opcional)</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da usuario" />
                </div>
                <Button type="submit" disabled={granting} className="w-full rounded-full">
                  {granting ? "Concedendo..." : "Conceder Acesso"}
                </Button>
              </form>
            </div>

            {/* User list */}
            <div className="rounded-2xl bg-card p-5 border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Usuarios com Acesso Manual</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={fetchUsers} disabled={loadingUsers}>
                  <RefreshCw className={`h-4 w-4 ${loadingUsers ? "animate-spin" : ""}`} />
                </Button>
              </div>
              {users.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">Nenhum usuario com acesso manual ainda.</p>
              ) : (
                <div className="space-y-3">
                  {users.map((u) => {
                    const isExpired = new Date(u.expires_at) < new Date();
                    return (
                      <div key={u.id} className={`flex items-center justify-between p-3 rounded-xl border ${isExpired ? "border-destructive/30 bg-destructive/5" : "border-border"}`}>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm truncate">{u.user_name || u.user_email}</p>
                          {u.user_name && <p className="text-xs text-muted-foreground truncate">{u.user_email}</p>}
                          <p className="text-xs text-muted-foreground">
                            {isExpired ? "Expirado" : `Expira em ${new Date(u.expires_at).toLocaleDateString("pt-BR")}`}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRevoke(u.user_email)} className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Admin;
