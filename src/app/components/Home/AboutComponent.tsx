import { getTranslations } from "next-intl/server";
import { AnimatedDiv } from "../AnimatedDiv";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default async function AboutComponent() {
  const t = await getTranslations();

  return (
    <section id="about" className="bg-card/50">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <AnimatedDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-primary">{t("about.tech")}</span>
            {t("about.title")}
            <span className="text-secondary">{t("about.business")}</span>
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            {t("about.description")}
          </p>
        </AnimatedDiv>
      </div>
    </section>
  );
}
