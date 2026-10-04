import { getTranslations } from "next-intl/server";
import { AnimatedDiv } from "../AnimatedDiv";
import {
  Building2,
  Layers,
  Users,
  Globe2,
  Code2,
  Workflow,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default async function ServicesComponent() {
  const t = await getTranslations();

  const serviceIcons = [
    <Building2 key="systems" className="w-10 h-10 text-primary" />,
    <Layers key="erp" className="w-10 h-10 text-primary" />,
    <Users key="crm" className="w-10 h-10 text-primary" />,
    <Globe2 key="web" className="w-10 h-10 text-primary" />,
    <Code2 key="custom" className="w-10 h-10 text-primary" />,
    <Workflow key="automation" className="w-10 h-10 text-primary" />,
  ];

  const serviceKeys = ["systems", "erp", "crm", "web", "custom", "automation"];

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4">
        <AnimatedDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("services.title")}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </AnimatedDiv>

        <AnimatedDiv
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {serviceKeys.map((key, index) => (
            <AnimatedDiv
              key={key}
              variants={fadeInUp}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="mb-6 p-4 bg-primary/10 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300">
                {serviceIcons[index]}
              </div>
              <h3 className="text-xl font-bold mb-4">
                {t(`services.items.${key}.title`)}
              </h3>
              <p className="text-foreground/70">
                {t(`services.items.${key}.description`)}
              </p>
            </AnimatedDiv>
          ))}
        </AnimatedDiv>
      </div>
    </section>
  );
}
