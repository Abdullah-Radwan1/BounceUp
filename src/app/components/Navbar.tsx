"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleLanguage = () => {
    const newLang = locale === "en" ? "ar" : "en";
    window.location.href = window.location.pathname.replace(
      `/${locale}`,
      `/${newLang}`,
    );
  };

  const navLinks = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.process"), href: "#process" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="shrink-0 flex items-center">
            <a
              href="#"
              className="text-2xl font-bold text-primary flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
                B
              </div>
              BounceUp
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:cursor-pointer hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium uppercase">
                {locale === "en" ? "AR" : "EN"}
              </span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground/80 hover:cursor-pointer hover:bg-primary hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="flex md:hidden items-center space-x-4 rtl:space-x-reverse">
            <button onClick={toggleLanguage} className="p-2 text-foreground/80">
              <span className="text-sm font-medium uppercase">
                {locale === "en" ? "AR" : "EN"}
              </span>
            </button>
            <button onClick={toggleTheme} className="p-2 text-foreground/80">
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-foreground/80 hover:text-foreground"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-background border-b border-border"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-card hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="block px-3 py-2 mt-4 text-center rounded-md text-base font-medium bg-primary text-white hover:bg-secondary hover:text-gray-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.cta")}
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
