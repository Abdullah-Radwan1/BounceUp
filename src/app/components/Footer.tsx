import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
            B
          </div>
          <span className="text-2xl font-bold text-primary">BounceUp</span>
        </div>
        <p className="text-foreground/70 mb-8">{t("footer.tagline")}</p>
        <div className="flex justify-center gap-8 mb-8">
          <a
            href="#home"
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            {t("nav.home")}
          </a>
          <a
            href="#services"
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            {t("nav.services")}
          </a>
          <a
            href="#process"
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            {t("nav.process")}
          </a>
          <a
            href="#contact"
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            {t("nav.contact")}
          </a>
        </div>
        <p className="text-sm text-foreground/50">{t("footer.rights")}</p>
      </div>
    </footer>
  );
}
