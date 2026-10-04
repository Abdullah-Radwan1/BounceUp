import { getTranslations } from "next-intl/server";
import { AnimatedDiv } from "../AnimatedDiv";
import Image from "next/image";

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

export default async function EcosystemComponent() {
  const t = await getTranslations();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16">
        <AnimatedDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-8">{t("ecosystem.title")}</h2>
          <div className="flex flex-wrap gap-3">
            {(t.raw("ecosystem.items") as unknown as string[]).map(
              (item, idx) => (
                <span
                  key={idx}
                  className="px-4 bg-primary-dark text-white py-2 border border-border rounded-full text-sm font-medium"
                >
                  {item}
                </span>
              ),
            )}
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">{t("comingSoon.title")}</h2>
            <div className="flex flex-wrap gap-3">
              {(t.raw("comingSoon.items") as unknown as string[]).map(
                (item, idx) => (
                  <span
                    key={idx}
                    className="px-4 bg-secondary py-2 border border-border border-dashed rounded-full text-sm font-medium"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </AnimatedDiv>

        <AnimatedDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="bg-card rounded-3xl justify-center flex items-center"
        >
          <Image src="/Bounce.jpg" width={350} height={350} alt="Bounce_logo" />
        </AnimatedDiv>
      </div>
    </section>
  );
}
