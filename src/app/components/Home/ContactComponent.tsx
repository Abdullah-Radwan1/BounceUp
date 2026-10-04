import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { AnimatedDiv } from "../AnimatedDiv";
import ContactForm from "../ContactForm";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const serviceKeys = ["systems", "erp", "crm", "web", "custom", "automation"];

export default async function ContactComponent() {
  const t = await getTranslations();

  return (
    <section id="contact" className="py-24 bg-card/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-16 bg-background rounded-3xl p-8 lg:p-12 shadow-2xl border border-border">
          <AnimatedDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              {t("cta.description")}
            </p>

            <div className="space-y-4">
              <p className="font-semibold text-foreground">
                {t("contact.title")}
              </p>
              <div className="flex gap-4">
                <Link
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=61594671434445"
                  className="w-12 h-12 rounded-full bg-card flex items-center justify-center hover:bg-secondary hover:text-gray-900 transition-colors border border-border"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </Link>
                <Link
                  target="_blank"
                  href="https://www.instagram.com/bounce_up1/"
                  className="w-12 h-12 rounded-full bg-card flex items-center justify-center hover:bg-secondary hover:text-gray-900 transition-colors border border-border"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
                <Link
                  target="_blank"
                  href="https://www.tiktok.com/@bounceup1"
                  className="w-12 h-12 rounded-full bg-card flex items-center justify-center hover:bg-secondary hover:text-gray-900 transition-colors border border-border"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.5 3.96-1.72 5.56-1.23 1.59-3.08 2.61-5.06 2.92-1.99.31-4.08.06-5.87-.93-1.8-1-3.15-2.67-3.79-4.59-.65-1.93-.57-4.1.25-5.96.82-1.85 2.33-3.32 4.17-4.06 1.83-.73 3.92-.76 5.75-.08V12c-1.39-.33-2.91-.2-4.19.43-1.28.63-2.29 1.75-2.67 3.12-.39 1.38-.13 2.9.7 4.04.83 1.13 2.21 1.83 3.66 1.87 1.44.04 2.87-.58 3.86-1.61.99-1.03 1.46-2.45 1.43-3.9V.02h-3.3z" />
                  </svg>
                </Link>
              </div>
            </div>
          </AnimatedDiv>

          <AnimatedDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <ContactForm serviceKeys={serviceKeys} />
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
}
