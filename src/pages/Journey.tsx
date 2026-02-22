import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Leaf, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import aiAvatar from "@/assets/ai-avatar.jpg";

interface Message {
  id: string;
  role: "ai" | "user";
  text: string;
}

const PILLARS = [
  "Anamnese Aromática",
  "Mapeamento de Protocolos",
  "Guia Personalizado",
  "Cuidado Consciente",
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "ai",
    text: "Olá, querida! 🌿 Eu sou a Essência Vital, sua consultora de bem-estar natural. Estou aqui para te guiar em uma jornada de autoconhecimento e cuidado com a aromaterapia.",
  },
  {
    id: "2",
    role: "ai",
    text: "Antes de começarmos, preciso te lembrar que nossas conversas são complementares e não substituem orientação médica profissional. Tudo bem? 💚",
  },
  {
    id: "3",
    role: "ai",
    text: "Me conta, meu amor: o que te traz aqui hoje? Qual desconforto físico ou emocional você gostaria de explorar?",
  },
];

const QUICK_REPLIES = [
  "Dor de cabeça frequente",
  "Insônia ou dificuldade para dormir",
  "Ansiedade e estresse",
  "Cansaço e falta de energia",
];

const Journey = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [currentPillar, setCurrentPillar] = useState(0);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowQuickReplies(false);

    // Simulated AI response
    setTimeout(() => {
      const aiResponses = [
        `Entendo, querida. ${msg} é algo que muitas mulheres enfrentam e pode ter raízes emocionais profundas. Vamos investigar juntas. 🌸`,
        "Posso te fazer algumas perguntas para entender melhor o seu contexto? Isso vai me ajudar a criar um protocolo personalizado para você.",
        "Há quanto tempo você vem sentindo isso? E como está sua rotina de sono e alimentação?",
      ];
      
      aiResponses.forEach((text, i) => {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { id: `ai-${Date.now()}-${i}`, role: "ai", text },
          ]);
          if (i === aiResponses.length - 1) {
            setCurrentPillar((p) => Math.min(p + 1, PILLARS.length - 1));
          }
        }, 800 * (i + 1));
      });
    }, 1000);
  };

  const progress = ((currentPillar + 1) / PILLARS.length) * 100;

  return (
    <div className="flex flex-col h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-md px-4 py-3">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={aiAvatar}
              alt="Essência Vital"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-accent"
            />
            <div>
              <h1 className="text-sm font-semibold">Minha Jornada</h1>
              <p className="text-xs text-muted-foreground">
                Pilar {currentPillar + 1}: {PILLARS[currentPillar]}
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {/* Medical disclaimer */}
          <div className="flex items-start gap-2 rounded-xl bg-terracotta-light/50 p-3 text-xs text-terracotta-dark">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>
              Este é um serviço complementar. Não substitui orientação médica profissional.
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card text-card-foreground shadow-card rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Quick replies */}
          {showQuickReplies && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="rounded-full border border-primary/30 bg-accent px-4 py-2 text-xs font-medium text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {reply}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-background/80 backdrop-blur-md px-4 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mx-auto flex max-w-2xl items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Descreva como você está se sentindo..."
            className="flex-1 rounded-full border border-input bg-card px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button
            type="submit"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Journey;
