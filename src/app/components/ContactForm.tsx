"use client";

import { useActionState, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { sendEmail, type SendEmailState } from "../actions/sendEmail";
import {
  contactSchema,
  CONTACT_FIELDS,
  type ContactField,
} from "@/app/lib/validation";

type FormState = SendEmailState & {
  values?: Partial<Record<ContactField, string>>;
};

const initialState: FormState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};

/* ---------- Small presentational helpers ---------- */

const inputClass = (hasError: boolean) =>
  [
    "w-full px-4 py-3 rounded-xl bg-card border text-sm transition-all",
    "placeholder:text-gray-400 focus:outline-none focus:ring-2",
    "disabled:opacity-60 disabled:cursor-not-allowed",
    hasError
      ? "border-red-500 focus:ring-red-500/40"
      : "border-gray-400/60 hover:border-gray-400 focus:border-primary focus:ring-primary/40",
  ].join(" ");

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required && (
          <span className="text-red-500 ms-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-sm text-red-500"
        >
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function Banner({
  variant,
  children,
}: {
  variant: "success" | "error";
  children: ReactNode;
}) {
  const styles =
    variant === "success"
      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
      : "bg-red-500/10 border-red-500/30 text-red-400";

  const icon =
    variant === "success"
      ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";

  return (
    <div
      role={variant === "success" ? "status" : "alert"}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium animate-fade-in ${styles}`}
    >
      <svg
        className="w-5 h-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      {children}
    </div>
  );
}

/* ---------- Form ---------- */

export default function ContactForm({
  serviceKeys,
}: {
  serviceKeys: string[];
}) {
  const t = useTranslations();

  // Fields the user has edited since the last submit (their errors are hidden)
  const [edited, setEdited] = useState<Set<ContactField>>(new Set());

  const submitAction = async (
    _prev: FormState,
    formData: FormData,
  ): Promise<FormState> => {
    setEdited(new Set());

    const values = Object.fromEntries(
      CONTACT_FIELDS.map((f) => [f, String(formData.get(f) ?? "")]),
    ) as Record<ContactField, string>;

    // Client-side validation (same schema the server uses)
    const parsed = contactSchema.safeParse({
      ...values,
      company: values.company || undefined,
    });

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0]);
        if (!errors[field]) errors[field] = issue.message;
      }
      return { status: "error", message: "", errors, values };
    }

    // Server action re-validates; never trust the client
    const result = await sendEmail(_prev, formData);

    return {
      ...result,
      // keep what the user typed on failure, clear the form on success
      values: result.status === "success" ? {} : values,
    };
  };

  const [state, formAction, pending] = useActionState(
    submitAction,
    initialState,
  );

  const getError = (field: ContactField): string | undefined => {
    if (edited.has(field)) return undefined;
    const raw = (
      state.errors as Record<string, string | string[] | undefined>
    )?.[field];
    const key = Array.isArray(raw) ? raw[0] : raw;
    return key ? t(`contact.form.errors.${key}`) : undefined;
  };

  const fieldProps = (field: ContactField) => {
    const error = getError(field);
    return {
      id: field,
      name: field,
      disabled: pending,
      defaultValue: state.values?.[field] ?? "",
      "aria-invalid": !!error,
      "aria-describedby": error ? `${field}-error` : undefined,
      onChange: () =>
        setEdited((prev) =>
          prev.has(field) ? prev : new Set(prev).add(field),
        ),
      className: inputClass(!!error),
    };
  };

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.status === "success" && (
        <Banner variant="success">{t("contact.form.success")}</Banner>
      )}

      {state.status === "error" && state.message && (
        <Banner variant="error">{state.message}</Banner>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field
          id="name"
          label={t("contact.form.name")}
          required
          error={getError("name")}
        >
          <input {...fieldProps("name")} type="text" autoComplete="name" />
        </Field>

        <Field
          id="email"
          label={t("contact.form.email")}
          required
          error={getError("email")}
        >
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
          />
        </Field>
      </div>

      <Field
        id="company"
        label={t("contact.form.company")}
        error={getError("company")}
      >
        <input
          {...fieldProps("company")}
          type="text"
          autoComplete="organization"
        />
      </Field>

      <Field
        id="service"
        label={t("contact.form.service")}
        required
        error={getError("service")}
      >
        <select
          {...fieldProps("service")}
          className={`${inputClass(!!getError("service"))} appearance-none`}
        >
          <option value="">--</option>
          {serviceKeys.map((key) => (
            <option key={key} value={t(`services.items.${key}.title`)}>
              {t(`services.items.${key}.title`)}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="message"
        label={t("contact.form.message")}
        required
        error={getError("message")}
      >
        <textarea
          {...fieldProps("message")}
          rows={5}
          maxLength={5000}
          className={`${inputClass(!!getError("message"))} resize-none`}
        />
      </Field>

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="w-full py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 transition-colors hover:bg-secondary hover:text-gray-900 hover:shadow-secondary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {pending ? (
          <>
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {t("contact.form.sending")}
          </>
        ) : (
          t("contact.form.submit")
        )}
      </button>
    </form>
  );
}
