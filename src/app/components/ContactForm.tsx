"use client";

import { useTranslations } from 'next-intl';

export default function ContactForm({ serviceKeys }: { serviceKeys: string[] }) {
  const t = useTranslations();

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert(t("contact.form.success"));
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">
            {t("contact.form.name")}
          </label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">
            {t("contact.form.email")}
          </label>
          <input
            required
            type="email"
            className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">
          {t("contact.form.company")}
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">
          {t("contact.form.service")}
        </label>
        <select
          required
          className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none"
        >
          <option value="">--</option>
          {serviceKeys.map((key) => (
            <option key={key} value={key}>
              {t(`services.items.${key}.title`)}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">
          {t("contact.form.message")}
        </label>
        <textarea
          required
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-secondary hover:text-gray-900 transition-colors shadow-lg shadow-primary/20 hover:shadow-secondary/20"
      >
        {t("contact.form.submit")}
      </button>
    </form>
  );
}
