"use client";

import { useState } from "react";
import { contactCopy } from "@/content/contact";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string; mailto?: string | null };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      biz: String(data.get("biz") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      acc: String(data.get("acc") ?? "xero"),
      notes: String(data.get("notes") ?? "").trim(),
    };

    if (!payload.name || !payload.biz || !payload.phone) {
      setStatus({ kind: "error", message: contactCopy.requiredError });
      return;
    }

    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        message?: string;
        mailto?: string | null;
      };
      if (res.ok && json.ok) {
        form.reset();
        setStatus({ kind: "success", message: json.message ?? contactCopy.success });
        return;
      }
      setStatus({
        kind: "error",
        message:
          json.message ??
          "The form could not be delivered from this site. Use the email link to send the request directly.",
        mailto: json.mailto,
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Try again, or email us if this keeps happening.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          id="contact-name"
          name="name"
          label={contactCopy.fields.name.label}
          placeholder={contactCopy.fields.name.placeholder}
          required
        />
        <Field
          id="contact-biz"
          name="biz"
          label={contactCopy.fields.biz.label}
          placeholder={contactCopy.fields.biz.placeholder}
          required
        />
        <Field
          id="contact-phone"
          name="phone"
          label={contactCopy.fields.phone.label}
          placeholder={contactCopy.fields.phone.placeholder}
          type="tel"
          required
        />
        <div>
          <label htmlFor="contact-acc" className="type-label mb-2 block">
            {contactCopy.fields.acc.label}
          </label>
          <select id="contact-acc" name="acc" defaultValue="xero" className="field-control">
            {contactCopy.accountingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="contact-notes" className="type-label mb-2 block">
          {contactCopy.fields.notes.label}
        </label>
        <textarea
          id="contact-notes"
          name="notes"
          rows={4}
          placeholder={contactCopy.fields.notes.placeholder}
          className="field-control"
        />
      </div>
      <div className="flex flex-col items-stretch justify-between gap-4 pt-2 sm:flex-row sm:items-center">
        <p className="type-meta">{contactCopy.aside}</p>
        <button type="submit" disabled={status.kind === "loading"} className="btn-primary w-full sm:w-auto">
          {status.kind === "loading" ? contactCopy.sending : contactCopy.submit}
        </button>
      </div>
      {status.kind === "success" ? (
        <div className="border border-brand-border bg-brand-surface p-4 text-sm text-brand-ink" role="status">
          {status.message}
        </div>
      ) : null}
      {status.kind === "error" ? (
        <div className="border border-red-400/40 bg-red-950/30 p-4 text-sm text-red-200" role="alert">
          <p>{status.message}</p>
          {status.mailto ? (
            <p className="mt-2">
              <a href={status.mailto} className="font-medium text-brand-cobalt underline">
                Open email draft instead
              </a>
            </p>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="type-label mb-2 block">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="field-control"
      />
    </div>
  );
}
