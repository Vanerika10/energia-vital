import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, LayoutGrid, MessageCircle, ArrowRight, BookOpen, Star, Check, Shield, Clock, Sparkles, CreditCard, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import heroImage from "@/assets/hero-botanical.jpg";

const paths = [
  {
    to: "/programas",
    icon: LayoutGrid,
    title: "Começar Minha Jornada",
    description: "Inicie um programa de transformação com desafios e checklists guiados.",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-accent",
  },
  {
    to: "/biblioteca",
    icon: BookOpen,
    title: "Explorar Biblioteca",
    description: "Pesquise protocolos e descubra qual óleo essencial é ideal para você.",
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-accent",
  },
  {
    to: "/jornada",
    icon: MessageCircle,
    title: "Conversar",
    description: "Tire dúvidas pontuais de forma rápida e prática.",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-accent",
  },
];

const sharedBenefits = [
  "Consultoria personalizada com IA",
  "Protocolos de aromaterapia únicos",
  "Biblioteca completa de óleos essenciais",
  "Plano de bem-estar personalizado",
  "Acompanhamento por 90 dias",
  "Acesso ilimitado a todas as funcionalidades",
];

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planType: "onetime" | "monthly") => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setLoading(planType);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: { planType },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast.error("Erro ao processar pagamento. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  // Logged-in user view
  if (user) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="relative min-h-[50vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Óleos essenciais e plantas naturais" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
          </div>
          <div className="relative z-10 mx-auto max-w-2xl px-6 py-16 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-sm font-medium text-white mb-5">
                <Leaf className="h-3.5 w-3.5" />
                Sua Plataforma de Bem-Estar
              </span>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-3">
                <span className="text-gradient-hero">Essência</span>{" "}
                <span className="text-white italic">Vital</span>
              </h1>
              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-md mx-auto">
                Bem-estar natural com protocolos personalizados e cuidado de verdade.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-5 py-8 relative z-10 pb-32">
          <div className="mx-auto max-w-lg">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center text-sm text-muted-foreground mb-5 font-medium">
              O que você precisa hoje?
            </motion.p>
            <div className="flex flex-col gap-3">
              {paths.map((path, i) => (
                <motion.div key={path.to} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
                  <Link to={path.to} className={`flex items-center gap-4 rounded-2xl ${path.bg} border border-border p-4 hover:shadow-md transition-all duration-300 group`}>
                    <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${path.gradient} shadow-sm`}>
                      <path.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-foreground leading-snug">{path.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mt-0.5">{path.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-6 px-6 border-t border-border">
          <p className="text-center text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
            ⚕️ A Essência Vital é uma ferramenta complementar de bem-estar e não substitui
            o aconselhamento, diagnóstico ou tratamento médico profissional.
          </p>
        </section>
      </div>
    );
  }

  // Logged-out landing page
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Óleos essenciais e plantas naturais" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>
        <div className="relative z-10 mx-auto max-w-2xl px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-sm font-medium text-white mb-6">
              <Leaf className="h-3.5 w-3.5" />
              Sua Plataforma de Bem-Estar
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-4">
              <span className="text-gradient-hero">Essência</span>{" "}
              <span className="text-white italic">Vital</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-lg mx-auto mb-8">
              Aromaterapia personalizada com inteligência artificial. Protocolos únicos para o seu bem-estar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="rounded-full px-8 py-6 text-base" onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}>
                <Sparkles className="w-4 h-4 mr-2" />
                Ver Planos
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-base bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white" asChild>
                <Link to="/auth">Entrar na Conta</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="px-5 py-16 bg-background">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Como a Essência Vital te ajuda</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Tudo que você precisa para começar sua jornada de bem-estar com óleos essenciais.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paths.map((path, i) => (
              <motion.div
                key={path.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-card border border-border p-6 text-center"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${path.gradient} shadow-sm mb-4`}>
                  <path.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{path.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{path.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="px-5 py-16 bg-muted/50">
        <div className="mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">Escolha seu Plano</h2>
            <p className="text-muted-foreground">Invista no seu bem-estar com aromaterapia personalizada</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Plano À Vista */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="rounded-2xl bg-card p-8 shadow-lg border-2 border-primary/20 relative h-full flex flex-col">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Melhor valor
                  </span>
                </div>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">À Vista</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Pagamento único</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-primary">R$97</span>
                    <span className="text-muted-foreground text-sm">,00</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">3 meses de acesso completo</p>
                </div>
                <div className="space-y-3 mb-8 flex-1">
                  {sharedBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={() => handleSubscribe("onetime")} disabled={loading !== null} className="w-full rounded-full text-base py-6" size="lg">
                  {loading === "onetime" ? "Processando..." : "Pagar À Vista"}
                </Button>
              </div>
            </motion.div>

            {/* Plano Mensal */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="rounded-2xl bg-card p-8 shadow-lg border border-border h-full flex flex-col">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <RefreshCw className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Mensal</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">3 cobranças automáticas</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-primary">R$47</span>
                    <span className="text-muted-foreground text-sm">,00/mês</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Total: R$141,00</p>
                </div>
                <div className="space-y-3 mb-8 flex-1">
                  {sharedBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={() => handleSubscribe("monthly")} disabled={loading !== null} variant="outline" className="w-full rounded-full text-base py-6" size="lg">
                  {loading === "monthly" ? "Processando..." : "Assinar Mensal"}
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5" />
              <span>Pagamento seguro</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Acesso imediato</span>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 px-6 border-t border-border">
        <p className="text-center text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
          ⚕️ A Essência Vital é uma ferramenta complementar de bem-estar e não substitui
          o aconselhamento, diagnóstico ou tratamento médico profissional.
        </p>
      </section>
    </div>
  );
};

export default Index;
