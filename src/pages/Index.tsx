import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-botanical.jpg";

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Óleos essenciais e plantas naturais"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground mb-6">
              <Leaf className="h-3.5 w-3.5" />
              Sua Plataforma de Bem-Estar
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-4">
              <span className="text-gradient-hero">Essência</span>{" "}
              <span className="text-white italic">Vital</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg mx-auto mb-8">
              Uma jornada de autoconhecimento e bem-estar natural, guiada por
              inteligência artificial com o acolhimento de quem cuida de verdade.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="rounded-full text-base px-8 shadow-soft">
                <Link to="/programas">
                  Começar Minha Jornada
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-base px-8">
                <Link to="/biblioteca">Explorar Biblioteca</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-base px-8">
                <Link to="/jornada">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Conversar
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-6 border-t border-border">
        <p className="text-center text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
          ⚕️ A Essência Vital é uma ferramenta complementar de bem-estar e não substitui
          o aconselhamento, diagnóstico ou tratamento médico profissional. Consulte
          sempre um profissional de saúde qualificado.
        </p>
      </section>
    </div>
  );
};

export default Index;
