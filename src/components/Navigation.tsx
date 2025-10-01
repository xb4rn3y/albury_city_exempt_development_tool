import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/zone-check", label: "Assessment Tool" },
    { path: "/chatbot", label: "Planning Assistant" },
    { path: "/faq", label: "FAQ" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/logo.png" 
                alt="Albury City Logo" 
                className={`h-12 w-auto group-hover:scale-105 transition-all duration-200 ${theme === 'dark' ? 'brightness-0 invert' : ''}`}
              />
              <div>
                <div className="font-bold text-lg text-primary">Albury City</div>
                <div className="text-xs text-muted-foreground -mt-1">Exempt Development</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "council" : "ghost"}
                asChild
                size="sm"
              >
                <Link to={item.path}>{item.label}</Link>
              </Button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "council" : "ghost"}
                  asChild
                  className="w-full justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to={item.path}>{item.label}</Link>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
