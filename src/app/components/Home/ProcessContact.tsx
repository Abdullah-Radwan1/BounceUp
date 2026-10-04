import { getTranslations } from "next-intl/server";
import { AnimatedDiv } from "../AnimatedDiv";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default async function ProcessContact() {
  const t = await getTranslations();

  return (
    <section id="process" className="py-24 bg-card/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("process.title")}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </AnimatedDiv>

        <div className="max-w-5xl mx-auto relative">
          {/* Line connector */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2 hidden md:block z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {[1, 2, 3, 4].map((step) => (
              <AnimatedDiv
                key={step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-primary/30 relative">
                  {step}
                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t(`process.steps.${step}.title`)}
                </h3>
                <p className="text-foreground/70">
                  {t(`process.steps.${step}.description`)}
                </p>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { ProcessContact as ProcessComponent };
