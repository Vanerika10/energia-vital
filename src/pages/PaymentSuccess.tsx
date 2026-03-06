import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const PaymentSuccess = () => {
  const { checkAccess } = useAuth();

  useEffect(() => {
    checkAccess();
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-65px)] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-sm"
      >
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent mb-6">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Pagamento Confirmado! 🌿</h1>
        <p className="text-muted-foreground mb-8">
          Seu acesso ao Essência Vital está ativo. Vamos começar sua jornada de bem-estar?
        </p>
        <Button asChild className="rounded-full" size="lg">
          <Link to="/jornada">
            Começar Jornada
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
