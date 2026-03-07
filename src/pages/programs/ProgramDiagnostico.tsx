import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useTracking } from "@/hooks/useTracking";

const questions = [
  {
    id: 1,
    section: "Energia e Descanso",
    question: "Voce acorda descansada ou ja cansada?",
    options: [
      { value: 1, label: "Acordo exausta, como se nao tivesse dormido" },
      { value: 2, label: "Acordo cansada, preciso de cafe imediatamente" },
      { value: 3, label: "Acordo ok, mas a energia cai rapidamente" },
      { value: 4, label: "Acordo relativamente bem, com disposicao razoavel" },
      { value: 5, label: "Acordo descansada e com energia natural" },
    ],
  },
  {
    id: 2,
    section: "Energia e Descanso",
    question: "Como e a qualidade do seu sono?",
    options: [
      { value: 1, label: "Durmo muito mal, acordo varias vezes, insonia frequente" },
      { value: 2, label: "Durmo mal, sono agitado, acordo cansada" },
      { value: 3, label: "Durmo ok, mas nao acordo renovada" },
      { value: 4, label: "Durmo bem na maioria das noites" },
      { value: 5, label: "Durmo profundamente e acordo revigorada" },
    ],
  },
  {
    id: 3,
    section: "Energia e Descanso",
    question: "Voce depende de estimulantes para produzir?",
    options: [
      { value: 1, label: "Sim, nao consigo funcionar sem cafe ou energetico" },
      { value: 2, label: "Sim, preciso de varias doses ao longo do dia" },
      { value: 3, label: "Sim, mas consigo reduzir em alguns dias" },
      { value: 4, label: "Uso ocasionalmente, nao ha dependencia" },
      { value: 5, label: "Nao preciso, tenho energia natural" },
    ],
  },
  {
    id: 4,
    section: "Dor e Corpo",
    question: "Sua dor aparece em momentos de estresse?",
    options: [
      { value: 1, label: "Sinto dor constante, que piora muito com estresse" },
      { value: 2, label: "Sim, dor frequente relacionada ao estresse" },
      { value: 3, label: "As vezes, mas nao e constante" },
      { value: 4, label: "Raramente sinto dor relacionada ao estresse" },
      { value: 5, label: "Nao sinto dor relacionada ao estresse" },
    ],
  },
  {
    id: 5,
    section: "Dor e Corpo",
    question: "Como seu corpo responde a desafios fisicos?",
    options: [
      { value: 1, label: "Qualquer esforco me deixa exausta por dias" },
      { value: 2, label: "Me recupero lentamente, com muito cansaco" },
      { value: 3, label: "Me recupero, mas leva tempo" },
      { value: 4, label: "Me recupero bem na maioria das vezes" },
      { value: 5, label: "Me recupero rapidamente e me sinto forte" },
    ],
  },
  {
    id: 6,
    section: "Dor e Corpo",
    question: "Voce sente seu corpo como aliado ou obstaculo?",
    options: [
      { value: 1, label: "Meu corpo me sabota constantemente" },
      { value: 2, label: "Sinto que luto contra meu corpo" },
      { value: 3, label: "As vezes aliado, as vezes obstaculo" },
      { value: 4, label: "Geralmente me sinto em sintonia" },
      { value: 5, label: "Sinto meu corpo como aliado confiavel" },
    ],
  },
  {
    id: 7,
    section: "Alimentacao e Habitos",
    question: "Sua alimentacao e estrategica ou improvisada?",
    options: [
      { value: 1, label: "Totalmente improvisada, como o que aparece" },
      { value: 2, label: "Improvisada na maioria das vezes" },
      { value: 3, label: "Tento planejar mas nem sempre consigo" },
      { value: 4, label: "Planejo a maior parte das refeicoes" },
      { value: 5, label: "Alimentacao consciente e estrategica" },
    ],
  },
  {
    id: 8,
    section: "Alimentacao e Habitos",
    question: "Como voce lida com o estresse?",
    options: [
      { value: 1, label: "Estou sempre estressada, nao consigo lidar" },
      { value: 2, label: "Lido mal, o estresse me domina" },
      { value: 3, label: "Tento lidar, mas nem sempre funciona" },
      { value: 4, label: "Tenho estrategias que funcionam" },
      { value: 5, label: "Gerencio bem, tenho ferramentas eficazes" },
    ],
  },
  {
    id: 9,
    section: "Alimentacao e Habitos",
    question: "Voce pratica alguma forma de movimento regular?",
    options: [
      { value: 1, label: "Nao, nao tenho energia para isso" },
      { value: 2, label: "Raramente, quando sobra tempo" },
      { value: 3, label: "Tento, mas sou inconsistente" },
      { value: 4, label: "Sim, algumas vezes por semana" },
      { value: 5, label: "Sim, regularmente e com prazer" },
    ],
  },
  {
    id: 10,
    section: "Emocoes e Autocuidado",
    question: "Voce sente culpa ao descansar?",
    options: [
      { value: 1, label: "Sim, sempre. Sinto que deveria estar produzindo" },
      { value: 2, label: "Sim, frequentemente me sinto culpada" },
      { value: 3, label: "As vezes, depende da situacao" },
      { value: 4, label: "Raramente, sei que descanso e importante" },
      { value: 5, label: "Nao, descanso sem culpa" },
    ],
  },
  {
    id: 11,
    section: "Emocoes e Autocuidado",
    question: "Como esta sua clareza mental?",
    options: [
      { value: 1, label: "Nevoa mental constante, dificuldade de concentracao" },
      { value: 2, label: "Confusao frequente, esquecimentos comuns" },
      { value: 3, label: "Varia, alguns dias melhor que outros" },
      { value: 4, label: "Geralmente boa, consigo focar" },
      { value: 5, label: "Excelente, mente clara e presente" },
    ],
  },
  {
    id: 12,
    section: "Emocoes e Autocuidado",
    question: "Voce se sente conectada consigo mesma?",
    options: [
      { value: 1, label: "Nao, estou desconectada de mim" },
      { value: 2, label: "Pouco, vivo no automatico" },
      { value: 3, label: "As vezes, em momentos especificos" },
      { value: 4, label: "Sim, na maior parte do tempo" },
      { value: 5, label: "Sim, tenho profunda conexao comigo" },
    ],
  },
];

const levels = [
  {
    level: 1,
    range: [12, 20],
    title: "Nivel 1 — Sobrevivencia",
    color: "bg-red-50 border-red-200",
    titleColor: "text-red-700",
    barColor: "bg-red-400",
    description: "Seu corpo esta enviando sinais de alerta maximo. Voce esta operando em modo de emergencia constante. As tarefas mais basicas exigem esforco enorme e o cansaco e avassalador.",
    message: "Este e um momento que exige atencao urgente. Voce nao pode continuar ignorando os sinais que seu corpo envia. E hora de buscar ajuda — medica, emocional e pratica.",
    action: "Comece pelo mais basico: sono, agua e um momento de respiracao consciente ao dia. Pequenos gestos nao negociaveis.",
  },
  {
    level: 2,
    range: [21, 30],
    title: "Nivel 2 — Funcional",
    color: "bg-orange-50 border-orange-200",
    titleColor: "text-orange-700",
    barColor: "bg-orange-400",
    description: "Voce funciona. Produz. Entrega. Mas tudo tem um custo alto e invisivel. O cansaco e seu companheiro constante. Voce precisa de estimulantes para comecar o dia e de forca de vontade pura para termina-lo.",
    message: "Este e o nivel mais comum — e tambem o mais perigoso, porque parece aceitavel. Seus exames voltam normais mas voce sabe que algo nao esta certo.",
    action: "Escolha 3 habitos basicos para implementar: hidratacao, ritual matinal de 5 min e pelo menos uma refeicao anti-inflamatoria por dia.",
  },
  {
    level: 3,
    range: [31, 40],
    title: "Nivel 3 — Compensada",
    color: "bg-yellow-50 border-yellow-200",
    titleColor: "text-yellow-700",
    barColor: "bg-yellow-400",
    description: "Voce descobriu estrategias para lidar com o cansaco. Faz escolhas mais conscientes em alguns momentos. Mas ainda esta apenas compensando deficiencias, nao construindo saude real.",
    message: "Voce tem momentos de energia e bem-estar, mas eles nao se sustentam. A instabilidade e constante — alguns dias bons, outros pessimos.",
    action: "Foque em consistencia, nao em perfeicao. Escolha 2 praticas e mantenha por 21 dias seguidos. Consistencia gentil cria saude real.",
  },
  {
    level: 4,
    range: [41, 50],
    title: "Nivel 4 — Consciente",
    color: "bg-blue-50 border-blue-200",
    titleColor: "text-blue-700",
    barColor: "bg-blue-400",
    description: "Aqui voce comeca a entender de verdade o que seu corpo precisa. Voce reconhece os sinais que ele envia e responde a eles. Sua energia e mais estavel, sua mente mais clara.",
    message: "A grande diferenca deste nivel: voce prioriza sua saude como pratica diaria. Voce nao se sente mais culpada ao descansar. Entende que cuidar de si nao e egoismo.",
    action: "Aprofunde nas praticas que mais ressoam. Adicione um elemento novo por vez. Explore oleos essenciais, alimentacao anti-inflamatoria e tecnicas de regulacao emocional.",
  },
  {
    level: 5,
    range: [51, 60],
    title: "Nivel 5 — Saude Plena",
    color: "bg-green-50 border-green-200",
    titleColor: "text-green-700",
    barColor: "bg-green-500",
    description: "Este e o estado ideal — onde saude nao e apenas ausencia de doenca, mas presenca de vitalidade. Voce acorda com energia natural, tem clareza mental e resiliencia emocional.",
    message: "Voce nao esta apenas sobrevivendo ou funcionando — esta verdadeiramente vivendo. Seu corpo nao e um obstaculo, e um aliado.",
    action: "Mantenha a consciencia e as praticas que te trouxeram ate aqui. Continue evoluindo. Compartilhe o que aprendeu com outras mulheres.",
  },
];

const ProgramDiagnostico = () => {
  const { track } = useTracking();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [current, setCurrent] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // rastrear abertura uma vez
  useState(() => { track("program_open", { program: "diagnostico" }); });

  const currentQ = questions[current];
  const totalAnswered = Object.keys(answers).length;
  const isLastQuestion = current === questions.length - 1;

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
  };

  const goNext = () => {
    if (isLastQuestion) {
      const score = Object.values(answers).reduce((sum, v) => sum + v, 0) + (answers[currentQ.id] || 0);
      track("diagnostic_complete", { program: "diagnostico", score });
      setShowResult(true);
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  const reset = () => {
    setAnswers({});
    setCurrent(0);
    setShowResult(false);
  };

  const getScore = () => Object.values(answers).reduce((sum, v) => sum + v, 0);

  const getLevel = (score: number) => levels.find((l) => score >= l.range[0] && score <= l.range[1]) || levels[4];

  const sectionColor = (section: string) => {
    if (section.includes("Energia")) return "bg-amber-100 text-amber-700";
    if (section.includes("Dor")) return "bg-rose-100 text-rose-700";
    if (section.includes("Alimentacao")) return "bg-green-100 text-green-700";
    return "bg-purple-100 text-purple-700";
  };

  if (showResult) {
    const score = getScore();
    const lvl = getLevel(score);
    const pct = ((score - 12) / (60 - 12)) * 100;

    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/programas" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4" /> Programas
            </Link>

            <div className={`border rounded-2xl p-6 mb-6 ${lvl.color}`}>
              <p className="text-xs text-muted-foreground mb-1">Sua pontuacao: {score}/60</p>
              <h2 className={`text-xl font-bold mb-2 ${lvl.titleColor}`}>{lvl.title}</h2>
              <div className="bg-white/50 rounded-full h-3 mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-3 rounded-full ${lvl.barColor}`}
                />
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-3">{lvl.description}</p>
              <p className="text-sm text-muted-foreground leading-relaxed italic mb-4">{lvl.message}</p>
              <div className="bg-white/60 rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-1">Seu proximo passo:</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{lvl.action}</p>
              </div>
            </div>

            <div className="bg-muted/40 rounded-2xl p-4 mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Os 5 niveis de saude feminina</h3>
              <div className="space-y-2">
                {levels.map((l) => (
                  <div key={l.level} className={`flex items-center gap-3 px-3 py-2 rounded-xl ${l.level === lvl.level ? l.color + " border" : ""}`}>
                    <div className={`w-2 h-2 rounded-full ${l.barColor} shrink-0`} />
                    <span className={`text-xs ${l.level === lvl.level ? "font-semibold " + l.titleColor : "text-muted-foreground"}`}>
                      {l.title.split(" — ")[0]}: {l.title.split(" — ")[1]} ({l.range[0]}-{l.range[1]} pts)
                      {l.level === lvl.level && " — voce esta aqui"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-muted text-sm text-muted-foreground hover:bg-muted/30 transition-colors"
            >
              <RotateCcw className="h-4 w-4" /> Refazer o diagnostico
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Link to="/programas" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" /> Programas
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-1">Diagnostico Feminino</h1>
          <p className="text-sm text-muted-foreground mb-3">Descubra em qual dos 5 niveis de saude voce esta realmente.</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(totalAnswered / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{totalAnswered}/{questions.length}</span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bg-purple-50 border border-purple-200 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${sectionColor(currentQ.section)}`}>
                {currentQ.section}
              </span>
              <span className="text-xs text-muted-foreground">Pergunta {current + 1} de {questions.length}</span>
            </div>

            <h2 className="text-base font-semibold text-foreground mb-5 leading-snug">{currentQ.question}</h2>

            <div className="space-y-2 mb-6">
              {currentQ.options.map((opt) => {
                const selected = answers[currentQ.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all border ${
                      selected
                        ? "bg-purple-200 border-purple-400 text-purple-900 font-medium"
                        : "bg-white/60 border-white/60 text-foreground hover:bg-white/80"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={goBack}
                disabled={current === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm text-muted-foreground disabled:opacity-40 hover:bg-muted/20 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Voltar
              </button>
              <button
                onClick={goNext}
                disabled={!answers[currentQ.id]}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-medium disabled:opacity-40 hover:bg-purple-700 transition-colors"
              >
                {isLastQuestion ? "Ver resultado" : "Proxima"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-6"
        >
          Responda com sinceridade, sem julgamento. Nao existe resposta certa ou errada.
        </motion.p>
      </div>
    </div>
  );
};

export default ProgramDiagnostico;
