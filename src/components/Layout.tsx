import { NavLink, useLocation } from "react-router-dom";
import { Home, MessageCircle, LayoutGrid, User, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { to: "/", icon: Home, label: "Início" },
    { to: "/biblioteca", icon: BookOpen, label: "Óleos" },
    { to: "/programas", icon: LayoutGrid, label: "Programas" },
    { to: "/jornada", icon: MessageCircle, label: "Chat com Lu" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">{children}</main>

      <nav className="sticky bottom-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
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
            <NavLink
              to="/perfil"
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors"
            >
              {location.pathname === "/perfil" && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-xl bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <User className={`relative z-10 h-5 w-5 transition-colors ${location.pathname === "/perfil" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`relative z-10 text-[11px] font-medium transition-colors ${location.pathname === "/perfil" ? "text-primary" : "text-muted-foreground"}`}>Perfil</span>
            </NavLink>
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
