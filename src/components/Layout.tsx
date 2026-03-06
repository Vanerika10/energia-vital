import { NavLink, useLocation } from "react-router-dom";
import { Home, MessageCircle, ClipboardList, BookOpen, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { to: "/", icon: Home, label: "Início" },
    { to: "/jornada", icon: MessageCircle, label: "Jornada" },
    { to: "/plano", icon: ClipboardList, label: "Meu Plano" },
    { to: "/biblioteca", icon: BookOpen, label: "Biblioteca" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">{children}</main>

      <nav className="sticky bottom-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-xl bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon
                  className={`relative z-10 h-5 w-5 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`relative z-10 text-[11px] font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
          {user ? (
            <button
              onClick={signOut}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors"
            >
              <LogOut className="h-5 w-5 text-muted-foreground" />
              <span className="text-[11px] font-medium text-muted-foreground">Sair</span>
            </button>
          ) : (
            <NavLink
              to="/auth"
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors"
            >
              {location.pathname === "/auth" && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-xl bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <User className={`relative z-10 h-5 w-5 transition-colors ${location.pathname === "/auth" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`relative z-10 text-[11px] font-medium transition-colors ${location.pathname === "/auth" ? "text-primary" : "text-muted-foreground"}`}>Entrar</span>
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
