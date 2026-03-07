import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Leaf, AlertTriangle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import aiAvatar from "@/assets/ai-avatar.jpg";
import { useChatHistory } from "@/hooks/useChatHistory";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
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
    role: "assistant",
    content: "Olá, querida! 🌿 Eu sou a Essência Vital, sua consultora de bem-estar natural. Estou aqui para te guiar em uma jornada de autoconhecimento e cuidado com a aromaterapia.",
  },
  {
    id: "2",
    role: "assistant",
    content: "Antes de começarmos, preciso te lembrar que nossas conversas são complementares e não substituem orientação médica profissional. Tudo bem? 💚",
  },
  {
    id: "3",
    role: "assistant",
    content: "Me conta, meu amor: o que te traz aqui hoje? Qual desconforto físico ou emocional você gostaria de explorar?",
  },
];

const QUICK_REPLIES = [
  "Dor de cabeça frequente",
  "Insônia ou dificuldade para dormir",
  "Ansiedade e estresse",
  "Cansaço e falta de energia",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const Journey = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPillar, setCurrentPillar] = useState(0);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const streamChat = async (allMessages: Message[]) => {
    const apiMessages = allMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: apiMessages }),
    });

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      throw new Error(errData.error || "Erro ao conectar com a IA");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantSoFar = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantSoFar += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && last.id.startsWith("stream-")) {
                return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
              }
              return [...prev, { id: `stream-${Date.now()}`, role: "assistant", content: assistantSoFar }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  };

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: msg };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setShowQuickReplies(false);
    setIsLoading(true);

    try {
      await streamChat(updatedMessages);
      // Advance pillar every 3 user messages
      const userMsgCount = updatedMessages.filter((m) => m.role === "user").length;
      if (userMsgCount % 3 === 0) {
        setCurrentPillar((p) => Math.min(p + 1, PILLARS.length - 1));
      }
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Erro ao processar sua mensagem");
    } finally {
      setIsLoading(false);
    }
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
          <div className="flex items-start gap-2 rounded-xl bg-terracotta-light/50 p-3 text-xs text-terracotta-dark">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>Este é um serviço complementar. Não substitui orientação médica profissional.</span>
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
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        h3: ({ children }) => <h3 className="font-bold text-base mt-3 mb-1">{children}</h3>,
                        ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                        li: ({ children }) => <li>{children}</li>,
                        hr: () => <hr className="my-3 border-border" />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-card text-card-foreground shadow-card rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}

          {showQuickReplies && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 pt-2">
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
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="mx-auto flex max-w-2xl items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Descreva como você está se sentindo..."
            className="flex-1 rounded-full border border-input bg-card px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full"
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Journey;
