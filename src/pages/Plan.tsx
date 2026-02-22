import { motion } from "framer-motion";
import { CalendarCheck, Clock, Droplets, Wind, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const mockProtocol = {
  title: "Protocolo para Alívio da Ansiedade",
  status: "Ativo",
  daysLeft: 5,
  progress: 40,
  actions: [
    {
      icon: Droplets,
      title: "Óleo de Lavanda",
      description: "3 gotas no difusor antes de dormir",
      time: "21:00",
    },
    {
      icon: Wind,
      title: "Respiração 4-7-8",
      description: "4 ciclos ao acordar e antes de dormir",
      time: "07:00 / 21:00",
    },
    {
      icon: Sparkles,
      title: "Reflexão Guiada",
      description: "5 minutos de journaling sobre gatilhos emocionais",
      time: "20:00",
    },
  ],
};

const pastJourneys = [
  { title: "Jornada Insônia", date: "10 Fev 2026", completed: true },
  { title: "Jornada Dor de Cabeça", date: "28 Jan 2026", completed: true },
];

const Plan = () => {
  return (
    <div className="min-h-[calc(100vh-65px)] px-4 py-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-1">Meu Plano</h1>
          <p className="text-muted-foreground text-sm">
            Acompanhe seu protocolo ativo e reveja jornadas anteriores.
          </p>
        </motion.div>

        {/* Active Protocol */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl bg-gradient-hero p-6 text-primary-foreground shadow-soft"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="rounded-full bg-primary-foreground/20 px-3 py-1 text-xs font-medium">
              {mockProtocol.status}
            </span>
            <span className="flex items-center gap-1 text-xs text-primary-foreground/70">
              <Clock className="h-3 w-3" />
              {mockProtocol.daysLeft} dias restantes
            </span>
          </div>
          <h2 className="text-xl font-bold mb-3">{mockProtocol.title}</h2>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span>Progresso</span>
            <span>{mockProtocol.progress}%</span>
          </div>
          <Progress value={mockProtocol.progress} className="h-2 bg-primary-foreground/20" />
        </motion.div>

        {/* Daily Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-3">Micro-Ações de Hoje</h3>
          <div className="space-y-3">
            {mockProtocol.actions.map((action, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl bg-card p-4 shadow-card"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                  <action.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold">{action.title}</h4>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {action.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Check-in */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button asChild className="w-full rounded-xl h-12 text-base shadow-soft">
            <Link to="/jornada">
              <CalendarCheck className="mr-2 h-5 w-5" />
              Check-in Semanal
            </Link>
          </Button>
        </motion.div>

        {/* Past Journeys */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-3">Jornadas Anteriores</h3>
          <div className="space-y-2">
            {pastJourneys.map((j, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl bg-card p-4 shadow-card"
              >
                <div>
                  <h4 className="text-sm font-semibold">{j.title}</h4>
                  <p className="text-xs text-muted-foreground">{j.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium text-accent-foreground">
                    Concluída
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Plan;
