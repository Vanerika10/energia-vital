import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, CheckSquare, Heart, Clock, ArrowRight } from "lucide-react";

const programs = [
  {
    to: "/programas/7-dias",
    icon: Calendar,
    title: "7 Dias para Organizar Sua Saúde",
    description: "Uma jornada de 7 dias para mapear suas dores, ajustar sua rotina e criar práticas naturais de autocuidado.",
    tag: "7 dias",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    to: "/programas/checklist",
    icon: CheckSquare,
    title: "Checklist da Mulher Saudável",
    description: "21 ajustes simples para elevar sua qualidade de vida. Descubra onde você está e o que precisa mudar.",
    tag: "21 hábitos",
    color: "bg-rose-50 border-rose-200",
    iconColor: "text-rose-600",
    tagColor: "bg-rose-100 text-rose-700",
  },
  {
    to: "/programas/diagnostico",
    icon: Heart,
    title: "Diagnóstico Feminino",
    description: "Descubra em qual dos 5 níveis de saúde você está realmente. Um diagnóstico honesto para mulheres que acham que estão bem.",
    tag: "Diagnóstico",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    tagColor: "bg-purple-100 text-purple-700",
  },
  {
    to: "/programas/rotina",
    icon: Clock,
    title: "Rotina Natural para Mulheres",
    description: "O método dos 3 blocos para viver com qualidade de vida mesmo na correria. Manhã, dia e noite em poucos minutos.",
    tag: "Método 3B",
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    tagColor: "bg-amber-100 text-amber-700",
  },
];

const Programs = () => {
  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Programas 🌿</h1>
          <p className="text-muted-foreground text-sm">
            Escolha um programa e inicie sua jornada de transformação.
          </p>
        </motion.div>

        <div className="space-y-4">
          {programs.map((program, i) => (
            <motion.div
              key={program.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link to={program.to}>
                <div className={`border rounded-2xl p-5 ${program.color} hover:shadow-md transition-shadow`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`mt-0.5 ${program.iconColor}`}>
                        <program.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h2 className="font-semibold text-foreground text-sm leading-snug">
                            {program.title}
                          </h2>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${program.tagColor}`}>
                            {program.tag}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {program.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          ⚕️ Os programas são complementares e não substituem orientação médica profissional.
        </motion.p>
      </div>
    </div>
  );
};

export default Programs;
