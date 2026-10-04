import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import HeroVisual from "./HeroVisual";
import { AnimatedDiv } from "./AnimatedDiv";

export default async function Hero() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isRtl = locale === "ar";

  return (
    <section
      id="home"
      className="relative my-20 flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
        <AnimatedDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-start"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
            <span className="text-secondary"> {t("hero.star1")}</span>

            {t("hero.title")}
            <span className="text-primary"> {t("hero.star2")}</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto lg:mx-0">
            {t("hero.description")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary text-white font-medium hover:bg-secondary hover:text-gray-900 transition-all shadow-lg shadow-primary/25 hover:shadow-secondary/25 flex items-center justify-center gap-2"
            >
              {t("hero.primaryCta")}
              <ArrowRight className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto bg-secondary px-8 py-3.5 rounded-full text-foreground font-medium transition-all flex items-center justify-center"
            >
              {t("hero.secondaryCta")}
            </a>
          </div>
        </AnimatedDiv>

        <HeroVisual />
      </div>
    </section>
  );
}
