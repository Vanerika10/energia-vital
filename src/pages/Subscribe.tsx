import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Leaf, Shield, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const benefits = [
  "Consultoria personalizada com IA",
  "Protocolos de aromaterapia únicos",
  "Biblioteca completa de óleos essenciais",
  "Plano de bem-estar personalizado",
  "Acompanhamento por 90 dias",
  "Acesso ilimitado a todas as funcionalidades",
];

const Subscribe = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment");
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast.error("Erro ao processar pagamento. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-65px)] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
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

        <div className="rounded-2xl bg-card p-8 shadow-elevated border-2 border-primary/20">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-1">Acesso Essência Vital</h2>
            <p className="text-sm text-muted-foreground mb-4">3 meses de acesso completo</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-primary">R$97</span>
              <span className="text-muted-foreground text-sm">,00</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Pagamento único</p>
          </div>

          <div className="space-y-3 mb-8">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={handlePayment}
            disabled={loading}
            className="w-full rounded-full text-base py-6"
            size="lg"
          >
            {loading ? "Processando..." : "Assinar Agora"}
          </Button>

          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
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
      </motion.div>
    </div>
  );
};

export default Subscribe;
