import { motion } from "framer-motion";
import { Check, Leaf, Shield, Clock, CreditCard, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const sharedBenefits = [
  "Consultoria personalizada com IA",
  "Protocolos de aromaterapia únicos",
  "Biblioteca completa de óleos essenciais",
  "Plano de bem-estar personalizado",
  "Acompanhamento por 90 dias",
  "Acesso ilimitado a todas as funcionalidades",
];

const NEXANO_MENSAL = "https://checkout.nexano.com.br/checkout/cmmjodmj505n11snxlet0pn6b?offer=HR7J7S2";
const NEXANO_TRIMESTRAL = "https://checkout.nexano.com.br/checkout/cmmjodmj505n11snxlet0pn6b?offer=Q96HUGG";

const Subscribe = () => {
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
            <span className="text-sm font-medium text-primary">Essencia Vital</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Comece sua Jornada</h1>
          <p className="text-muted-foreground">
            Invista no seu bem-estar com aromaterapia personalizada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-card p-8 shadow-elevated border-2 border-primary/20 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                Melhor valor
              </span>
            </div>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">A Vista</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Pagamento unico</p>
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
            <Button asChild className="w-full rounded-full text-base py-6" size="lg">
              <a href={NEXANO_TRIMESTRAL} target="_blank" rel="noopener noreferrer">
                Pagar A Vista
              </a>
            </Button>
          </div>

          <div className="rounded-2xl bg-card p-8 shadow-elevated border border-border">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <RefreshCw className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Mensal</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">3 cobrancas automaticas</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-primary">R$47</span>
                <span className="text-muted-foreground text-sm">,00/mes</span>
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
            <Button asChild variant="outline" className="w-full rounded-full text-base py-6" size="lg">
              <a href={NEXANO_MENSAL} target="_blank" rel="noopener noreferrer">
                Assinar Mensal
              </a>
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
