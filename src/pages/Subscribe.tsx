import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Leaf, Shield, Clock, Sparkles, CreditCard, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const sharedBenefits = [
  "Consultoria personalizada com IA",
  "Protocolos de aromaterapia únicos",
  "Biblioteca completa de óleos essenciais",
  "Plano de bem-estar personalizado",
  "Acompanhamento por 90 dias",
  "Acesso ilimitado a todas as funcionalidades",
];

const Subscribe = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="flex min-h-[calc(100vh-65px)] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Essência Vital</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Comece sua Jornada</h1>
          <p className="text-muted-foreground">
            Invista no seu bem-estar com aromaterapia personalizada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plano À Vista */}
          <div className="rounded-2xl bg-card p-8 shadow-elevated border-2 border-primary/20 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                Melhor valor
              </span>
            </div>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">À Vista</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Pagamento único</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-primary">R$97</span>
                <span className="text-muted-foreground text-sm">,00</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">3 meses de acesso completo</p>
            </div>

            <div className="space-y-3 mb-8">
              {sharedBenefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => handleSubscribe("onetime")}
              disabled={loading !== null}
              className="w-full rounded-full text-base py-6"
              size="lg"
            >
              {loading === "onetime" ? "Processando..." : "Pagar À Vista"}
            </Button>
          </div>

          {/* Plano Mensal */}
          <div className="rounded-2xl bg-card p-8 shadow-elevated border border-border">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <RefreshCw className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Mensal</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">3 cobranças automáticas</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-primary">R$47</span>
                <span className="text-muted-foreground text-sm">,00/mês</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Total: R$141,00</p>
            </div>

            <div className="space-y-3 mb-8">
              {sharedBenefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => handleSubscribe("monthly")}
              disabled={loading !== null}
              variant="outline"
              className="w-full rounded-full text-base py-6"
              size="lg"
            >
              {loading === "monthly" ? "Processando..." : "Assinar Mensal"}
            </Button>
          </div>
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
      </motion.div>
    </div>
  );
};

export default Subscribe;
