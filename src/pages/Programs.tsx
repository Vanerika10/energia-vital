import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    to: "/programas/7-dias",
    title: "7 Dias para Organizar Sua Saúde",
    description: "Uma jornada de 7 dias para mapear suas dores, ajustar sua rotina e criar práticas naturais de autocuidado.",
    tag: "7 dias",
    tagColor: "bg-emerald-100 text-emerald-700",
    image: "/programa-7dias.jpg",
  },
  {
    to: "/programas/checklist",
    title: "Checklist da Mulher Saudável",
    description: "21 ajustes simples para elevar sua qualidade de vida. Descubra onde você está e o que precisa mudar.",
    tag: "21 hábitos",
    tagColor: "bg-pink-100 text-pink-700",
    image: "/programa-checklist.jpg",
  },
  {
    to: "/programas/diagnostico",
    title: "Diagnóstico Feminino",
    description: "Descubra em qual dos 5 níveis de saúde você está realmente. Um diagnóstico honesto para mulheres que acham que estão bem.",
    tag: "Diagnóstico",
    tagColor: "bg-violet-100 text-violet-700",
    image: "/programa-diagnostico.jpg",
  },
  {
    to: "/programas/rotina",
    title: "Rotina Natural para Mulheres",
    description: "O método dos 3 blocos para viver com qualidade de vida mesmo na correria. Manhã, dia e noite em poucos minutos.",
    tag: "Método 3B",
    tagColor: "bg-amber-100 text-amber-700",
    image: "/programa-rotina.jpg",
  },
];

const Programs = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-1">Programas 🌿</h1>
          <p className="text-muted-foreground">Escolha um programa e inicie sua jornada de transformação.</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-5">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={program.to}
                className="block group rounded-2xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${program.tagColor}`}>
                    {program.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-base mb-1 leading-snug">{program.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{program.description}</p>
                  <div className="flex items-center gap-1 mt-3 text-primary text-sm font-medium">
                    Ver programa <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-xl mx-auto">
          🌿 Os programas são complementares e não substituem orientação médica profissional.
        </p>
      </div>
    </div>
  );
};

export default Programs;
