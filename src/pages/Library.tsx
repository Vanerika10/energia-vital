import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp, Droplets, Stethoscope, Heart, FlaskConical } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

type Category = "Todos" | "Oleos" | "Protocolos" | "Emocional" | "Receitas";

interface Article {
  id: string;
  title: string;
  category: Category;
  summary: string;
  content: { subtitle?: string; text: string }[];
  warning?: string;
  tags: string[];
}

const articles: Article[] = [
  // ─── OLEOS ESSENCIAIS ───────────────────────────────────────────────────────
  {
    id: "oe-lavanda",
    title: "Lavanda",
    category: "Oleos",
    summary: "Calmante universal. Ansiedade, insonia, tensao e dores de cabeca tensionais.",
    tags: ["ansiedade", "insonia", "tensao", "dor de cabeca", "calmante"],
    content: [
      { subtitle: "Para que serve", text: "Ansiedade, insonia, tensao muscular, dores de cabeca tensionais, picadas de inseto, queimaduras leves, regulacao emocional." },
      { subtitle: "Como usar", text: "Difusor a noite (4-6 gotas). Algumas gotas no travesseiro antes de dormir. Diluida em oleo vegetal para massagem nas temporas, pescoco e ombros. Pura na picada de inseto ou queimadura leve." },
      { subtitle: "Seguranca", text: "Um dos oleos mais seguros. Pode ser usada em criancas diluida. Sempre dilua em oleo vegetal para aplicacao na pele (1 gota para 5ml OV)." },
    ],
  },
  {
    id: "oe-hortela",
    title: "Hortela-Pimenta",
    category: "Oleos",
    summary: "Energia, foco, dor de cabeca e enxaqueca. Alivia tensao respiratoria.",
    tags: ["dor de cabeca", "enxaqueca", "foco", "energia", "sinusite", "gripe"],
    content: [
      { subtitle: "Para que serve", text: "Dores de cabeca e enxaquecas, fadiga mental, sinusite, gripe, cansaco, falta de foco." },
      { subtitle: "Como usar", text: "2 gotas nas temporas em movimentos circulares (ate 4x ao dia). Inalacao direta do frasco. Difusor durante o dia. Diluida para massagem no pescoco e nuca." },
      { subtitle: "Atencao", text: "NAO usar em criancas e adolescentes por via interna. Evitar regiao dos olhos. Nao aplicar pura em pele sensivel." },
    ],
    warning: "Nao usar em criancas menores de 12 anos.",
  },
  {
    id: "oe-copaiba",
    title: "Resina de Copaiba",
    category: "Oleos",
    summary: "Dor cronica, inflamacao e ansiedade. Pode ser usada via oral (ate 6 gotas ao dia).",
    tags: ["dor cronica", "inflamacao", "ansiedade", "queimadura", "dor de garganta"],
    content: [
      { subtitle: "Para que serve", text: "Dor cronica, inflamacoes, ansiedade, dor de garganta, queimaduras, feridas. Uma das resinas mais versateis da aromaterapia brasileira." },
      { subtitle: "Como usar", text: "Via oral: ate 6 gotas diarias (nao ultrapasse). Topico: aplicar sobre area inflamada ou dolorida. Combina muito bem com outros oleos como hortela, alecrim e lavanda." },
      { subtitle: "Via oral", text: "Pode ser usada diretamente ou diluida em agua ou mel. Comece com 2 gotas e observe a resposta do corpo." },
    ],
  },
  {
    id: "oe-olibano",
    title: "Olibano (Frankincense)",
    category: "Oleos",
    summary: "Anti-inflamatorio, ansiedade profunda e meditacao. Poderoso reconectivo.",
    tags: ["inflamacao", "ansiedade", "meditacao", "manchas na pele", "reconexao"],
    content: [
      { subtitle: "Para que serve", text: "Inflamacao cronica, ansiedade profunda, praticas meditativas, manchas na pele, reconexao com o presente." },
      { subtitle: "Como usar", text: "Difusor durante meditacao ou oracao. Diluido nos pulsos para ansiedade. Blend anti-manchas com rosa mosqueta e patchouli." },
      { subtitle: "Energia e emocoes", text: "O olibano e considerado o oleo da transcendencia — ajuda a desacelerar a mente e aprofundar o estado de presenca." },
    ],
  },
  {
    id: "oe-alecrim",
    title: "Alecrim",
    category: "Oleos",
    summary: "Concentracao, memoria e dor muscular. Estimulante natural para corpo e mente.",
    tags: ["concentracao", "memoria", "dor muscular", "catarro", "constipacao", "energia"],
    content: [
      { subtitle: "Para que serve", text: "Dor muscular, falta de concentracao, catarro, constipacao intestinal, cansaco cronico. Estimula o sistema nervoso de forma suave." },
      { subtitle: "Como usar", text: "Inalacao matinal (1-2 gotas nas maos, inale 3x). Diluido em oleo vegetal para massagem nos musculos doloridos. Difusor durante estudo ou trabalho." },
      { subtitle: "Momento ideal", text: "Manha e inicio da tarde. Evite usar a noite pois pode interferir no sono." },
    ],
    warning: "Evitar uso a noite. Nao usar em criancas com febre ou convulsoes.",
  },
  {
    id: "oe-eucalipto",
    title: "Eucalipto",
    category: "Oleos",
    summary: "Catarro, dores musculares e clareza mental. Abre as vias respiratorias.",
    tags: ["catarro", "gripe", "sinusite", "dor muscular", "clareza mental"],
    content: [
      { subtitle: "Para que serve", text: "Congestao nasal, catarro, gripe, sinusite, dores musculares, falta de clareza mental." },
      { subtitle: "Como usar", text: "Inalacao a vapor: 2-3 gotas em agua quente, inhale com toalha sobre a cabeca. Difusor durante o dia. Diluido para massagem no peito e costas." },
    ],
    warning: "Nao usar em criancas menores de 12 anos por via interna ou aplicacao direta no rosto.",
  },
  {
    id: "oe-bergamota",
    title: "Bergamota",
    category: "Oleos",
    summary: "Eleva o humor, reduz cortisol e equilibra emocoes. Oleo da leveza.",
    tags: ["humor", "ansiedade", "cortisol", "leveza", "alegria"],
    content: [
      { subtitle: "Para que serve", text: "Ansiedade, tristeza, estresse cronico, dias pesados, desequilibrio emocional. Eleva o humor rapidamente." },
      { subtitle: "Como usar", text: "Difusor (4-5 gotas). Inalacao direta em momentos de estresse. Diluida nos pulsos ou no pescoco." },
      { subtitle: "Atencao", text: "Fotossensibilizante: nao aplicar na pele exposta ao sol. Prefira usar a noite ou em areas cobertas." },
    ],
    warning: "Nao aplicar na pele antes de exposicao ao sol.",
  },
  {
    id: "oe-melaleuca",
    title: "Melaleuca (Tea Tree)",
    category: "Oleos",
    summary: "Antibacteriana natural. Gripe, sinusite e infeccoes. Fortalece a imunidade.",
    tags: ["gripe", "sinusite", "imunidade", "antibacteriano", "infeccao"],
    content: [
      { subtitle: "Para que serve", text: "Gripe, resfriado, sinusite, infeccoes bacterianas e fungicas, fortalecimento da imunidade." },
      { subtitle: "Como usar", text: "Com dedo indicador na gengiva (parte interna e externa) apos escovacao — misturada com hortela. Inalacoes. Difusor." },
    ],
    warning: "Nao usar em criancas e adolescentes por via interna (gengiva).",
  },
  {
    id: "oe-cedro",
    title: "Cedro Atlas",
    category: "Oleos",
    summary: "Dor articular, insonia e ansiedade. Oleo de enraizamento e estabilidade.",
    tags: ["dor articular", "insonia", "ansiedade", "enraizamento", "tensao"],
    content: [
      { subtitle: "Para que serve", text: "Dor articular e muscular, insonia, ansiedade, falta de enraizamento, sensacao de instabilidade emocional." },
      { subtitle: "Como usar", text: "Noite: difusor com lavanda. Topico: diluido para massagem em articulacoes doloridas (junto com lavanda e copaiba). Pulsos para ansiedade." },
    ],
  },

  // ─── PROTOCOLOS ─────────────────────────────────────────────────────────────
  {
    id: "prot-garganta",
    title: "Dor de Garganta",
    category: "Protocolos",
    summary: "Protocolo natural com copaiba e hortela para alivio da dor e inflamacao.",
    tags: ["dor de garganta", "inflamacao", "copaiba", "hortela"],
    content: [
      { subtitle: "Protocolo", text: "2 gotas de Resina de Copaiba + 1 gota de OE Hortela-Pimenta. Misturar na mao, passar no pescoco e na planta dos pes. Aquecer com meia nos pes e fraldinha na garganta antes de dormir." },
      { subtitle: "Para criancas", text: "Usar apenas na planta dos pes, diluido em oleo vegetal." },
    ],
    warning: "Em casos de febre alta ou dificuldade para engolir, procure orientacao medica.",
  },
  {
    id: "prot-gripe",
    title: "Gripe e Resfriado",
    category: "Protocolos",
    summary: "Protocolo com hortela e melaleuca para desobstrucao e fortalecimento imunologico.",
    tags: ["gripe", "resfriado", "hortela", "melaleuca", "imunidade"],
    content: [
      { subtitle: "Protocolo", text: "1 gota OE Hortela-Pimenta + 1 gota OE Melaleuca. Passar com dedo indicador na gengiva (parte interna e externa) apos escovacao. Tambem pode usar para inalacoes no banho ou difusor." },
    ],
    warning: "NAO usar em criancas e adolescentes.",
  },
  {
    id: "prot-catarro",
    title: "Catarro e Congestao",
    category: "Protocolos",
    summary: "Blend expectorante com eucalipto, alecrim e melaleuca para limpar as vias aereas.",
    tags: ["catarro", "congestao", "eucalipto", "alecrim", "melaleuca"],
    content: [
      { subtitle: "Protocolo adultos", text: "10ml Oleo Vegetal + 2 gotas OE Alecrim + 5 gotas OE Eucalipto + 2 gotas OE Melaleuca + 1 gota OE Tomilho. Massagear regiao peitoral e costas. Pode usar na planta dos pes." },
      { subtitle: "Para menores de 12 anos", text: "Apenas OE Lavanda e OE Hortela na planta dos pes, diluidos em oleo vegetal." },
    ],
  },
  {
    id: "prot-febre",
    title: "Febre",
    category: "Protocolos",
    summary: "3 protocolos para auxiliar no controle da febre de forma natural.",
    tags: ["febre", "lavanda", "hortela", "tomilho", "eucalipto"],
    content: [
      { subtitle: "Protocolo 1 (para todos)", text: "Lavanda ou Camomila Romana no difusor. OU 1 colher de sopa OV Coco + 3 gotas OE Hortela na planta dos pes." },
      { subtitle: "Protocolo 2 (adultos)", text: "3 gotas OE Tomilho + 2 gotas OE Lavanda + 2 gotas OE Eucalipto em compressa na testa (15 min)." },
      { subtitle: "Protocolo 3 (adultos)", text: "5 gotas OE Hortela-Pimenta + 2 gotas OE Manjericao + 2 gotas OE Limao — aplicar nas costas ou planta dos pes." },
    ],
    warning: "Protocolos 2 e 3 NAO usar em criancas. Febre acima de 39C ou persistente requer avaliacao medica.",
  },
  {
    id: "prot-cabeca",
    title: "Dor de Cabeca e Enxaqueca",
    category: "Protocolos",
    summary: "4 protocolos progressivos para alivio de cefaleias tensionais e enxaquecas.",
    tags: ["dor de cabeca", "enxaqueca", "lavanda", "hortela", "temporas"],
    content: [
      { subtitle: "Protocolo 1 (pode usar em criancas)", text: "OE Lavanda, Hortela-Pimenta ou Limao no difusor." },
      { subtitle: "Protocolo 2", text: "2 gotas OE Hortela nas temporas em movimentos circulares. Ate 4x ao dia." },
      { subtitle: "Protocolo 3 (adultos)", text: "Compressa com 3 gotas OE Lavanda + 3 gotas OE Hortela-Pimenta na testa (15 min)." },
      { subtitle: "Protocolo 4", text: "5ml OV + 2 gotas OE Lavanda + 3 gotas OE Hortela-Pimenta — aplicar no pescoco, testa e temporas." },
    ],
    warning: "Protocolo 3 NAO usar em criancas.",
  },
  {
    id: "prot-sinusite",
    title: "Sinusite",
    category: "Protocolos",
    summary: "Protocolos de inalacao e aplicacao para desobstrucao sinusal por 21 dias.",
    tags: ["sinusite", "hortela", "melaleuca", "eucalipto", "congestao"],
    content: [
      { subtitle: "Protocolo 1 (para todos)", text: "3 gotas OE Hortela-Pimenta — fechar as maos em concha sobre o nariz, 15 inspiracoes profundas, 3x ao dia." },
      { subtitle: "Protocolo 2 (adultos)", text: "2 gotas OE Hortela + 2 gotas OE Melaleuca na gengiva por 21 dias. Apos: 1 gota Extrato de Propolis por kg de peso por 7 dias." },
      { subtitle: "Protocolo 3 (adultos)", text: "Inalacao com 1 gota OE Hortela + 1 gota OE Melaleuca + 1 gota OE Eucalipto, 3x ao dia por 21 dias." },
    ],
    warning: "Protocolos 2 e 3 NAO usar em criancas.",
  },
  {
    id: "prot-estomago",
    title: "Dor de Estomago e Estufamento",
    category: "Protocolos",
    summary: "Massagem abdominal com tangerina e copaiba para alivio de gases e colicAs.",
    tags: ["estomago", "gases", "estufamento", "colica", "tangerina", "copaiba"],
    content: [
      { subtitle: "Protocolo 1 (adultos)", text: "Na palma da mao: 3 gotas OE Tangerina + 3 gotas OE Pimenta Preta + 6 gotas Resina Copaiba + 1 colher cha OV Coco. Massagear abdomen abaixo do umbigo no sentido horario. Deitar 15 min." },
      { subtitle: "Protocolo 2 (para todos)", text: "3 gotas OE Tangerina + 3 gotas OE Lavanda + 6 gotas Resina Copaiba + 1 colher cha OV Coco. Massagear abdomen sentido horario." },
    ],
    warning: "Protocolo 1 NAO usar em criancas.",
  },
  {
    id: "prot-intestino",
    title: "Constipacao / Prisao de Ventre",
    category: "Protocolos",
    summary: "Blend digestivo com alecrim e patchouli para regularizar o intestino.",
    tags: ["constipacao", "intestino", "prisao de ventre", "alecrim", "patchouli"],
    content: [
      { subtitle: "Protocolo", text: "10ml OV + 7 gotas OE Alecrim + 5 gotas OE Patchouli + 3 gotas OE Hortela-Pimenta. Massagear abdomen no sentido horario 3x ao dia ate o intestino funcionar corretamente." },
    ],
  },
  {
    id: "prot-dor-articular",
    title: "Dor Articular e Muscular",
    category: "Protocolos",
    summary: "Compressas alternadas quente/fria com oleos analgesicos e anti-inflamatorios.",
    tags: ["dor muscular", "dor articular", "erva baleeira", "alecrim", "lavanda", "copaiba"],
    content: [
      { subtitle: "Protocolo 1", text: "Dois recipientes (200ml cada): agua morna e agua fria. Em cada: 10ml OV + 5 gotas OE Erva Baleeira + 5 gotas OE Alecrim + 2 gotas OE Wintergreen. Compressas alternadas por 15 min cada." },
      { subtitle: "Protocolo 2", text: "Dois frascos de 500ml. Em cada: 2 gotas OE Lavanda + 3 gotas OE Alecrim + 1 gota OE Geranio. Compressas alternadas 15 min cada." },
      { subtitle: "Protocolo 3", text: "3 gotas OE Cedro Atlas + 3 gotas OE Lavanda + 6 gotas Resina Copaiba — massagens circulares no local afetado." },
    ],
  },
  {
    id: "prot-ansiedade",
    title: "Ansiedade e Panico",
    category: "Protocolos",
    summary: "Inalacao calmante com lavanda, geranio e laranja para crise de ansiedade.",
    tags: ["ansiedade", "panico", "lavanda", "geranio", "laranja", "crise"],
    content: [
      { subtitle: "Protocolo", text: "2 gotas OE Lavanda + 2 gotas OE Geranio + 1 gota OE Laranja Doce. Friccionar as maos, inalar profundamente 15 vezes. Pode fazer 4-5x ao dia." },
    ],
    warning: "Em casos de ansiedade e panico deve haver acompanhamento medico especifico.",
  },
  {
    id: "prot-queimadura",
    title: "Queimadura",
    category: "Protocolos",
    summary: "Aplicacao de copaiba e lavanda para alivio e cicatrizacao de queimaduras leves.",
    tags: ["queimadura", "copaiba", "lavanda", "cicatrizacao"],
    content: [
      { subtitle: "Protocolo", text: "Lavar com agua e sabao, secar. Aplicar 5 gotas Resina Copaiba sobre a queimadura. OU: 2 gotas OE Lavanda direto sobre o local." },
    ],
    warning: "Queimaduras severas (grandes areas, bolhas, profundas) requerem atendimento medico urgente.",
  },
  {
    id: "prot-manchas",
    title: "Manchas na Pele",
    category: "Protocolos",
    summary: "Sinergia com rosa mosqueta, argan e oleos essenciais para clarear manchas em 21 dias.",
    tags: ["manchas", "pele", "rosa mosqueta", "patchouli", "olibano", "palmarosa"],
    content: [
      { subtitle: "Sinergia", text: "1 conta-gotas OV Rosa Mosqueta + 1 conta-gotas OV Argan + 1 gota OE Palmarosa + 1 gota OE Patchouli + 1 gota OE Olibano. Passar nos locais com mancha 1x ao dia a noite, por 21 dias." },
    ],
    warning: "Nao expor a pele tratada ao sol. Use apenas a noite.",
  },

  // ─── RAIZ EMOCIONAL ──────────────────────────────────────────────────────────
  {
    id: "em-dor-muscular",
    title: "Dor Muscular — Raiz Emocional",
    category: "Emocional",
    summary: "A tensao muscular frequentemente carrega excesso de controle e sobrecarga de responsabilidades.",
    tags: ["dor muscular", "controle", "sobrecarga", "rigidez", "emocional"],
    content: [
      { subtitle: "Raiz emocional", text: "Excesso de controle, rigidez emocional, sobrecarga de responsabilidades, dificuldade em delegar. O corpo tensiona quando a mente nao consegue soltar." },
      { subtitle: "Alimentacao", text: "Magnésio (banana, abacate, castanhas, espinafre, cacau puro). Reduzir cafeina e acucar." },
      { subtitle: "Oleo essencial", text: "Alecrim, gengibre ou wintergreen diluidos em Resina Copaiba. Massagear o local com movimentos circulares antes de dormir." },
      { subtitle: "Pratica", text: "Antes de dormir, deitar no chao com bolinha de tenis sob o ponto de tensao, respirar 3 minutos. Pergunte-se: o que estou tentando controlar que nao esta em meu poder?" },
    ],
  },
  {
    id: "em-ansiedade",
    title: "Ansiedade — Raiz Emocional",
    category: "Emocional",
    summary: "A ansiedade tem raiz no medo do futuro e na dificuldade de confiar no presente.",
    tags: ["ansiedade", "medo", "futuro", "controle", "presente"],
    content: [
      { subtitle: "Raiz emocional", text: "Medo do futuro, necessidade de controle, desconexao com o presente, dificuldade em confiar. A mente vive no amanha, o corpo paga o preco hoje." },
      { subtitle: "Alimentacao", text: "Reduzir cafe, acucar, alcool. Aumentar cha de camomila, maracuja, melissa. Triptofano: banana, aveia, grao-de-bico." },
      { subtitle: "Oleo essencial", text: "Lavanda, bergamota ou ylang-ylang. 2 gotas no difusor ou inalar direto do frasco durante crise." },
      { subtitle: "Pratica", text: "Tecnica 5-4-3-2-1: nomeie 5 coisas que ve, 4 que toca, 3 que ouve, 2 que cheira, 1 que saboreia. Ancora o sistema nervoso no presente imediato." },
    ],
  },
  {
    id: "em-insonia",
    title: "Insonia — Raiz Emocional",
    category: "Emocional",
    summary: "A dificuldade de dormir esta ligada a hipervigilancia e ao medo de perder o controle.",
    tags: ["insonia", "sono", "hipervigilancia", "controle", "descanso"],
    content: [
      { subtitle: "Raiz emocional", text: "Hipervigilancia, dificuldade em desligar, medo de perder controle, preocupacao excessiva. O sistema nervoso permanece em alerta mesmo com o corpo cansado." },
      { subtitle: "Alimentacao", text: "Evitar cafeina apos 14h, jantar leve 2h antes. Cha de melissa, passiflora ou valeriana 30 min antes de deitar." },
      { subtitle: "Oleo essencial", text: "Lavanda, vetiver ou sandalo — pingar no travesseiro, difundir no quarto ou aplicar diluido nos pulsos e temporas." },
      { subtitle: "Pratica", text: "Ritual de desligamento 1h antes de dormir. Escreva 3 coisas que solta do dia. Sinaliza ao corpo que e seguro descansar." },
    ],
  },
  {
    id: "em-inflamacao",
    title: "Inflamacao — Raiz Emocional",
    category: "Emocional",
    summary: "Inflamacoes cronicas frequentemente carregam raiva reprimida e magoa nao processada.",
    tags: ["inflamacao", "raiva", "magoa", "ressentimento", "injustica"],
    content: [
      { subtitle: "Raiz emocional", text: "Raiva reprimida, magoa nao processada, sensacao de injustica, ressentimento acumulado. O corpo infla quando a emocao nao tem saida." },
      { subtitle: "Alimentacao", text: "Cortar acucar, gluten e laticinios por 15 dias. Adicionar curcuma com pimenta-do-reino, gengibre, linhaca, azeite extravirgem, frutas vermelhas." },
      { subtitle: "Oleo essencial", text: "Copaiba, curcuma ou frankincense (olibano). Aplicar sobre area inflamada. Copaiba pode ser usada via oral (ate 6 gotas diarias)." },
      { subtitle: "Pratica", text: "Escreva uma carta para quem magoou (nao precisa enviar). Expresse toda a raiva sem censura. Depois queime ou descarte — simbolo de liberacao." },
    ],
  },
  {
    id: "em-cansaco",
    title: "Cansaco Cronico — Raiz Emocional",
    category: "Emocional",
    summary: "O esgotamento cronico vem de dar demais e viver sem limites ou conexao com os proprios desejos.",
    tags: ["cansaco", "esgotamento", "limites", "piloto automatico", "desejos"],
    content: [
      { subtitle: "Raiz emocional", text: "Esgotamento por dar demais, falta de limites, viver no piloto automatico, desconexao com os proprios desejos. O corpo esgota quando o eu e sempre o ultimo da lista." },
      { subtitle: "Alimentacao", text: "Checar vitamina B12, ferro e vitamina D. Spirulina, acai, beterraba, oleaginosas, quinoa, abacate. Hidratar-se muito." },
      { subtitle: "Oleo essencial", text: "Hortela-pimenta, alecrim ou limao siciliano pela manha. Aplicar diluido na nuca e pulsos ao acordar." },
      { subtitle: "Pratica", text: "10 minutos por dia so para si, sem celular, sem tarefa. So existir. Sem producao, sem justificativa. Apenas ser." },
    ],
  },
  {
    id: "em-tensao",
    title: "Tensao Cronica — Raiz Emocional",
    category: "Emocional",
    summary: "A tensao persistente no corpo carrega hipervigilancia e dificuldade de confiar.",
    tags: ["tensao", "hipervigilancia", "controle", "confianca", "vulnerabilidade"],
    content: [
      { subtitle: "Raiz emocional", text: "Hipervigilancia, medo de ser vulneravel, necessidade constante de controle, dificuldade em confiar. O corpo fica em guarda permanente." },
      { subtitle: "Alimentacao", text: "Magnesio (amendoas, sementes de abobora, abacate, banana, folhas verdes). Reduzir estimulantes." },
      { subtitle: "Oleo essencial", text: "Lavanda, camomila romana ou cedro. Massagear pescoco, ombros e mandibula com oleo diluido." },
      { subtitle: "Pratica", text: "Escaneamento corporal: deitar, percorrer mentalmente cada parte do corpo, respirar para as areas tensas. Pergunte: o que estou segurando que posso soltar agora?" },
    ],
  },

  // ─── RECEITAS E BLENDS ───────────────────────────────────────────────────────
  {
    id: "rec-ansiedade",
    title: "Blend para Ansiedade",
    category: "Receitas",
    summary: "Sinergia calmante para difusor ou aplicacao nos pulsos em momentos de crise.",
    tags: ["ansiedade", "lavanda", "olibano", "bergamota", "blend", "crise"],
    content: [
      { subtitle: "Formula", text: "3 gotas de lavanda + 2 gotas de olibano + 1 gota de bergamota." },
      { subtitle: "Como usar", text: "Use no difusor ou dilua em 10ml de oleo carreador para aplicar nos pulsos." },
      { subtitle: "Quando usar", text: "Em momentos de ansiedade aguda, antes de situacoes estressantes, antes de dormir." },
    ],
  },
  {
    id: "rec-dor",
    title: "Blend para Dor Muscular",
    category: "Receitas",
    summary: "Blend analgesico e anti-inflamatorio para massagem em areas de dor.",
    tags: ["dor muscular", "copaiba", "pimenta preta", "cedro atlas", "blend"],
    content: [
      { subtitle: "Formula", text: "4 gotas de copaiba + 3 gotas de pimenta preta + 2 gotas de cedro atlas." },
      { subtitle: "Como usar", text: "Dilua em 20ml de oleo carreador (coco, amendoas) e massageie a area dolorida com movimentos circulares." },
      { subtitle: "Frequencia", text: "2-3x ao dia ate o alivio. Antes de dormir e especialmente eficaz." },
    ],
  },
  {
    id: "rec-sono",
    title: "Blend para Sono Profundo",
    category: "Receitas",
    summary: "Sinergia para difusor que sinaliza ao corpo que e hora de descansar.",
    tags: ["sono", "insonia", "lavanda", "cedro", "camomila", "blend"],
    content: [
      { subtitle: "Formula", text: "4 gotas de lavanda + 2 gotas de cedro + 1 gota de camomila." },
      { subtitle: "Como usar", text: "Difunda 30 minutos antes de dormir ou aplique diluido na planta dos pes." },
      { subtitle: "Potencialize", text: "Combine com ritual de descompressao: sem telas 20 min antes, alongamento suave, escreva 3 gratidoes." },
    ],
  },
  {
    id: "rec-energia",
    title: "Blend para Energia Matinal",
    category: "Receitas",
    summary: "Sinergia estimulante para comecar o dia com foco e disposicao natural.",
    tags: ["energia", "foco", "limao", "alecrim", "hortela", "manha", "blend"],
    content: [
      { subtitle: "Formula", text: "3 gotas de limao + 2 gotas de alecrim + 1 gota de hortela-pimenta." },
      { subtitle: "Como usar", text: "Inale diretamente do frasco (palma das maos) ou difunda durante o ritual matinal." },
      { subtitle: "Dica", text: "Combine com hidratacao (agua com limao) e 3 minutos de respiracao consciente para ativacao completa." },
    ],
  },
  {
    id: "rec-diluicao",
    title: "Regra de Diluicao Segura",
    category: "Receitas",
    summary: "Como diluir oleos essenciais corretamente para uso seguro na pele.",
    tags: ["diluicao", "seguranca", "oleo vegetal", "pele", "basico"],
    content: [
      { subtitle: "Regra basica", text: "Sempre dilua oleos essenciais em oleo vegetal antes de aplicar na pele. A proporcao basica e: 1 gota de OE para cada 5ml de oleo vegetal (aproximadamente 1% de concentracao)." },
      { subtitle: "Oleos vegetais indicados", text: "Oleo de coco fracionado (neutro, rapida absorcao), oleo de amendoas (nutritivo), oleo de argan (anti-idade), rosa mosqueta (regenerador)." },
      { subtitle: "Excecoes", text: "Lavanda e copaiba podem ser usadas puras em situacoes especificas (queimadura, picada). Mas para uso diario e habitual, dilua sempre." },
      { subtitle: "Teste de alergia", text: "Antes de usar um oleo novo, aplique 1 gota diluida no interior do braco e aguarde 24h antes de usar em areas maiores." },
    ],
  },
];

const categoryConfig: Record<Category, { label: string; icon: React.ElementType; color: string }> = {
  Todos: { label: "Todos", icon: Search, color: "bg-muted text-foreground" },
  Oleos: { label: "Oleos Essenciais", icon: Droplets, color: "bg-green-100 text-green-700" },
  Protocolos: { label: "Protocolos", icon: Stethoscope, color: "bg-blue-100 text-blue-700" },
  Emocional: { label: "Raiz Emocional", icon: Heart, color: "bg-rose-100 text-rose-700" },
  Receitas: { label: "Receitas e Blends", icon: FlaskConical, color: "bg-amber-100 text-amber-700" },
};

const cardBorderColor: Record<Category, string> = {
  Todos: "",
  Oleos: "border-green-200 bg-green-50",
  Protocolos: "border-blue-200 bg-blue-50",
  Emocional: "border-rose-200 bg-rose-50",
  Receitas: "border-amber-200 bg-amber-50",
};

const Library = () => {
  const { track } = useTracking();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleExpand = (id: string) => {
    if (expanded !== id) track("library_view", { program: "biblioteca", item_id: id });
    setExpanded(expanded === id ? null : id);
  };

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === "Todos" || a.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.tags.some((t) => t.includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-5">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold mb-1">Biblioteca Essencial</h1>
          <p className="text-muted-foreground text-sm">
            Oleos essenciais, protocolos por sintoma, raiz emocional e receitas — tudo baseado nos guias da Lu.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por oleo, sintoma ou emocao..."
            className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </motion.div>

        {/* Category pills */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {(Object.keys(categoryConfig) as Category[]).map((cat) => {
            const cfg = categoryConfig[cat];
            const CatIcon = cfg.icon;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  isActive ? cfg.color + " border-transparent shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted/30"
                }`}
              >
                <CatIcon className="h-3.5 w-3.5" />
                {cfg.label}
              </button>
            );
          })}
        </motion.div>

        {/* Count */}
        <p className="text-xs text-muted-foreground">{filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}</p>

        {/* Articles */}
        <div className="space-y-3">
          {filtered.map((article, i) => {
            const isOpen = expanded === article.id;
            const cfg = categoryConfig[article.category];
            const CatIcon = cfg.icon;
            const borderClass = cardBorderColor[article.category];

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`border rounded-2xl overflow-hidden ${borderClass}`}
              >
                <button
                  onClick={() => handleExpand(article.id)}
                  className="w-full px-5 py-4 flex items-start justify-between gap-3 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${cfg.color}`}>
                        <CatIcon className="h-3 w-3" />
                        {cfg.label}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground leading-snug">{article.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{article.summary}</p>
                  </div>
                  <div className="shrink-0 mt-1">
                    {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-3">
                        <div className="border-t border-black/5 pt-3 space-y-3">
                          {article.content.map((block, bi) => (
                            <div key={bi}>
                              {block.subtitle && (
                                <p className="text-[11px] font-semibold text-foreground uppercase tracking-wide mb-1">{block.subtitle}</p>
                              )}
                              <p className="text-sm text-muted-foreground leading-relaxed">{block.text}</p>
                            </div>
                          ))}
                          {article.warning && (
                            <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                              <p className="text-xs text-red-700 leading-relaxed">
                                <span className="font-semibold">Atencao: </span>{article.warning}
                              </p>
                            </div>
                          )}
                        </div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {article.tags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => { setSearch(tag); setExpanded(null); }}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-white/60 border text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground">Nenhum resultado para "{search}".</p>
              <button onClick={() => { setSearch(""); setActiveCategory("Todos"); }} className="mt-2 text-xs text-primary underline">
                Limpar busca
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground pb-4">
          Aromaterapia e complementar e nao substitui orientacao medica profissional.
        </p>
      </div>
    </div>
  );
};

export default Library;
