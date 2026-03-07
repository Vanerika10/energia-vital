import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    to: "/programas/7-dias",
    description: "Uma jornada para mapear suas dores, ajustar sua rotina e criar práticas naturais de autocuidado.",
    image: "https://raw.githubusercontent.com/Vanerika10/energia-vital/main/public/programa-7dias.jpg",
  },
  {
    to: "/programas/checklist",
    description: "21 ajustes simples para elevar sua qualidade de vida e descobrir o que precisa mudar.",
    image: "https://raw.githubusercontent.com/Vanerika10/energia-vital/main/public/programa-checklist.jpg",
  },
  {
    to: "/programas/diagnostico",
    description: "Descubra em qual dos 5 níveis de saúde você está realmente, honesto e direto ao ponto.",
    image: "https://raw.githubusercontent.com/Vanerika10/energia-vital/main/public/programa-diagnostico.jpg",
  },
  {
    to: "/programas/rotina",
    description: "Viva com qualidade mesmo na correria. Manhã, dia e noite organizados em poucos minutos.",
    image: "https://raw.githubusercontent.com/Vanerika10/energia-vital/main/public/programa-rotina.jpg",
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
              key={program.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={program.to}
                className="block group rounded-2xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-full aspect-[16/10] overflow-hidden">
                  <img
                    src={program.image}
                    alt=""
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="font-sans text-muted-foreground text-sm leading-relaxed">{program.description}</p>
                  <div className="flex items-center gap-1 mt-3 text-primary text-sm font-medium font-sans">
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
