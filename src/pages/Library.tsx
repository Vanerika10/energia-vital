import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Droplets, Brain, Wind, Flower2, ChevronRight } from "lucide-react";

const categories = [
  { icon: Droplets, name: "Óleos Essenciais", count: 24 },
  { icon: Brain, name: "Causas Emocionais", count: 18 },
  { icon: Wind, name: "Técnicas de Respiração", count: 8 },
  { icon: Flower2, name: "Fitoterapia", count: 15 },
];

const articles = [
  {
    title: "Lavanda: A Rainha da Calma",
    category: "Óleos Essenciais",
    excerpt: "Descubra como a lavanda pode transformar sua rotina de sono e reduzir a ansiedade de forma natural.",
    readTime: "5 min",
  },
  {
    title: "Dor de Cabeça e Estresse",
    category: "Causas Emocionais",
    excerpt: "Entenda a conexão entre tensão emocional e dores de cabeça frequentes.",
    readTime: "7 min",
  },
  {
    title: "Protocolo de Eucalipto para Sinusite",
    category: "Óleos Essenciais",
    excerpt: "Um guia prático para usar eucalipto no alívio de congestão nasal e sinusite.",
    readTime: "4 min",
  },
  {
    title: "Respiração 4-7-8 para Insônia",
    category: "Técnicas de Respiração",
    excerpt: "Aprenda a técnica de respiração que pode ajudá-la a dormir em minutos.",
    readTime: "3 min",
  },
  {
    title: "Chás Calmantes para Ansiedade",
    category: "Fitoterapia",
    excerpt: "Os melhores chás fitoterápicos para acalmar a mente e relaxar o corpo.",
    readTime: "6 min",
  },
];

const Library = () => {
  const [search, setSearch] = useState("");

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-65px)] px-4 py-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-1">Biblioteca Essencial</h1>
          <p className="text-muted-foreground text-sm">
            Explore conhecimentos sobre aromaterapia e bem-estar natural.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por tópico, óleo ou sintoma..."
            className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
            Categorias
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-card hover:shadow-elevated transition-shadow text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                  <cat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.count} artigos</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Articles */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
            Artigos em Destaque
          </h3>
          <div className="space-y-3">
            {filtered.map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="rounded-xl bg-card p-4 shadow-card hover:shadow-elevated transition-shadow cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <span className="inline-block rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium text-accent-foreground mb-2">
                      {article.category}
                    </span>
                    <h4 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                    <span className="text-[10px] text-muted-foreground mt-2 inline-block">
                      {article.readTime} de leitura
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground mt-6 shrink-0 group-hover:text-primary transition-colors" />
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">
                Nenhum artigo encontrado para "{search}".
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Library;
