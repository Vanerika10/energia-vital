import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, LayoutGrid, MessageCircle, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-botanical.jpg";

const paths = [
  {
    to: "/biblioteca",
    icon: Leaf,
    title: "Consultar Óleos",
    description: "Pesquise protocolos e descubra qual óleo essencial é ideal para você.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    to: "/programas",
    icon: LayoutGrid,
    title: "Meus Programas",
    description: "Inicie uma jornada de transformação com desafios e checklists guiados.",
    color: "bg-amber-50 text-amber-700",
  },
  {
    to: "/jornada",
    icon: MessageCircle,
    title: "Chat com a Lu",
    description: "Tire dúvidas pontuais com a Lu, sua aromaterapeutа pessoal.",
    color: "bg-violet-50 text-violet-700",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Óleos essenciais e plantas naturais"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-4">
              <span className="text-gradient-hero">Essência</span>{" "}
              <span className="text-white italic">Vital</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg mx-auto">
              Uma jornada de autoconhecimento e bem-estar natural, guiada por
              inteligência artificial com o acolhimento de quem cuida de verdade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3 caminhos */}
      <section className="px-6 py-10 -mt-8 relative z-10">
        <div className="mx-auto max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-sm text-muted-foreground mb-6 font-medium"
          >
            O que você precisa hoje?
          </motion.p>
          <div className="flex flex-col gap-4">
            {paths.map((path, i) => (
              <motion.div
                key={path.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <Link
                  to={path.to}
                  className="flex items-center gap-4 rounded-2xl bg-card p-5 shadow-sm hover:shadow-md transition-shadow duration-300 group"
                >
                  <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl ${path.color}`}>
                    <path.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base leading-snug">{path.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{path.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
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
