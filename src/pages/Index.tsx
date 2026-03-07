 import { motion } from "framer-motion";
  import { Link } from "react-router-dom";
  import { Leaf, Heart, Sparkles, ArrowRight } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import heroImage from "@/assets/hero-botanical.jpg";

  const features = [
    {
      icon: Leaf,
      title: "Aromaterapia Personalizada",
      description: "Protocolos únicos baseados no seu perfil emocional e físico.",
    },
    {
      icon: Heart,
      title: "Raiz Emocional",
      description: "Descubra as causas emocionais por trás dos seus desconfortos.",
    },
    {
      icon: Sparkles,
      title: "Acompanhamento Proativo",
      description: "Check-ins semanais e ajustes contínuos no seu plano de bem-estar.",
    },
  ];

  const Index = () => {
    return (
      <div className="flex flex-col">
        {/* Hero */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Óleos essenciais e plantas naturais"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl px-6 py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-sm
  font-medium text-accent-foreground mb-6">
                <Leaf className="h-3.5 w-3.5" />
                Sua Plataforma de Bem-Estar
              </span>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-4">
                <span className="text-gradient-hero">Essência</span>{" "}
                <span className="text-white italic">Vital</span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg mx-auto mb-8">
                Uma jornada de autoconhecimento e bem-estar natural, guiada por
                inteligência artificial com o acolhimento de quem cuida de verdade.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="rounded-full text-base px-8 shadow-soft">
                  <Link to="/jornada">
                    Começar Minha Jornada
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full text-base px-8"
                >
                  <Link to="/biblioteca">Explorar Biblioteca</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Como posso te ajudar?
              </h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                Cada jornada é única, assim como você. Descubra o que a Essência
                Vital pode fazer por você.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="group rounded-2xl bg-card p-7 shadow-card hover:shadow-elevated
  transition-shadow duration-300"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl
  bg-accent">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl rounded-3xl bg-gradient-hero p-10 md:p-14 text-center
  text-primary-foreground"
          >
            <h2 className="text-3xl font-bold mb-3">
              Pronta para se reconectar?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-md mx-auto">
              Sua jornada de bem-estar começa com uma conversa. Vamos juntas?
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full text-base px-8"
            >
              <Link to="/jornada">
                Iniciar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
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
