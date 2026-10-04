"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { sendEmail, type SendEmailState } from "../actions/sendEmail";

const initialState: SendEmailState = { status: "idle", message: "" };

export default function ContactForm({ serviceKeys }: { serviceKeys: string[] }) {
  const t = useTranslations();
  const [state, formAction, pending] = useActionState(sendEmail, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {/* Success banner */}
      {state.status === "success" && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium animate-fade-in">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t("contact.form.success")}
        </div>
      )}

      {/* Error banner */}
      {state.status === "error" && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium animate-fade-in">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">{t("contact.form.name")}</label>
          <input
            required
            name="name"
            type="text"
            disabled={pending}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-60"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">{t("contact.form.email")}</label>
          <input
            required
            name="email"
            type="email"
            disabled={pending}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-60"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">{t("contact.form.company")}</label>
        <input
          name="company"
          type="text"
          disabled={pending}
          className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-60"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">{t("contact.form.service")}</label>
        <select
          required
          name="service"
          disabled={pending}
          className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none disabled:opacity-60"
        >
          <option value="">--</option>
          {serviceKeys.map((key) => (
            <option key={key} value={t(`services.items.${key}.title`)}>
              {t(`services.items.${key}.title`)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">{t("contact.form.message")}</label>
        <textarea
          required
          name="message"
          rows={4}
          disabled={pending}
          className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none disabled:opacity-60"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-secondary hover:text-gray-900 transition-colors shadow-lg shadow-primary/20 hover:shadow-secondary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {pending ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending...
          </>
        ) : (
          t("contact.form.submit")
        )}
      </button>
    </form>
  );
}
