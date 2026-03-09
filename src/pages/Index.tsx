import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, LayoutGrid, MessageCircle, ArrowRight, BookOpen, Star } from "lucide-react";
import heroImage from "@/assets/hero-botanical.jpg";

const paths = [
  {
    to: "/programas",
    icon: LayoutGrid,
    title: "Começar Minha Jornada",
    description: "Inicie um programa de transformação com desafios e checklists guiados.",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
  },
  {
    to: "/biblioteca",
    icon: BookOpen,
    title: "Explorar Biblioteca",
    description: "Pesquise protocolos e descubra qual óleo essencial é ideal para você.",
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
  },
  {
    to: "/jornada",
    icon: MessageCircle,
    title: "Conversar",
    description: "Tire dúvidas pontuais de forma rápida e prática.",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Óleos essenciais e plantas naturais"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
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

      {/* Assinatura */}
      <section className="px-5 pt-6 -mt-6 relative z-10">
        <div className="mx-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/assinar"
              className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm">
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base text-white leading-snug">Assine e Tenha Acesso Completo</h3>
                <p className="text-white/80 text-sm leading-relaxed mt-0.5">A partir de R$47/mês · Cancele quando quiser</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3 caminhos */}
      <section className="px-5 py-8 relative z-10 pb-32">
        <div className="mx-auto max-w-lg">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm text-muted-foreground mb-5 font-medium"
          >
            O que você precisa hoje?
          </motion.p>
          <div className="flex flex-col gap-3">
            {paths.map((path, i) => (
              <motion.div
                key={path.to}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <Link
                  to={path.to}
                  className={`flex items-center gap-4 rounded-2xl ${path.bg} border border-white/60 p-4 hover:shadow-md transition-all duration-300 group`}
                >
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
