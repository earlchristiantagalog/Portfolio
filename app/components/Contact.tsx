"use client";

import { useState } from "react";
import { usePortfolio } from "./PortfolioContext";
import { submitContactForm } from "@/app/lib/portfolio-service";
import { CopyButton } from "./ui/CopyButton";

type Status = "idle" | "sending" | "success" | "error" | "closed";

export default function Contact() {
  const { data } = usePortfolio();
  const { contact, social } = data;

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formState.name.trim()) next.name = "Name is required";
    if (!formState.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      next.email = "Enter a valid email address";
    }
    if (!formState.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    const result = await submitContactForm({
      name: formState.name,
      email: formState.email,
      message: formState.message,
    });

    if (result === "sent") {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      window.setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus(result);
    }
  };

  const sending = status === "sending";

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-10 lg:pt-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-8 border-b border-card-border/60 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="label text-primary">Transmission / 03</span>
              <span className="h-px w-8 bg-primary/50" aria-hidden="true" />
              <span className="label">Contact channel</span>
            </div>

            <h1 className="page-title mt-6 text-foreground">
              {contact.heading}
              <span className="text-primary">.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {contact.subtitle}
            </p>
          </div>

          <div className="hud flex w-full max-w-xs items-center gap-4 p-4">
            <span className="clip-corner-sm flex h-11 w-11 shrink-0 items-center justify-center border border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
              <span className="status-ring" aria-hidden="true" />
            </span>
            <div>
              <p className="label-sm text-muted-foreground">Channel status</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {contact.acceptingMessages ? "Messages are open" : "Messages are closed"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Composer */}
          <div className="hud clip-corner relative overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-card-border px-5 py-3">
              <span className="label text-primary">Message composer</span>
              <span className="label-sm text-muted-foreground">
                ENC · TLS 1.3
              </span>
            </div>

            {contact.acceptingMessages ? <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="label-sm mb-2 block">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formState.name}
                    onChange={(event) =>
                      setFormState({ ...formState, name: event.target.value })
                    }
                    placeholder="John Doe"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`field ${errors.name ? "field-error" : ""}`}
                  />
                  {errors.name && (
                    <p id="name-error" className="label-sm mt-2 text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="label-sm mb-2 block">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formState.email}
                    onChange={(event) =>
                      setFormState({ ...formState, email: event.target.value })
                    }
                    placeholder="john@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`field ${errors.email ? "field-error" : ""}`}
                  />
                  {errors.email && (
                    <p id="email-error" className="label-sm mt-2 text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="label-sm mb-2 block">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formState.message}
                  onChange={(event) =>
                    setFormState({ ...formState, message: event.target.value })
                  }
                  placeholder="Tell me about your project or just say hi..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`field resize-none ${errors.message ? "field-error" : ""}`}
                />
                {errors.message && (
                  <p id="message-error" className="label-sm mt-2 text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={sending}
                  className="btn btn-primary clip-corner w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {sending ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border border-current border-t-transparent" aria-hidden="true" />
                      Transmitting
                    </>
                  ) : (
                    <>
                      Send message
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>

                <span className="label-sm text-muted-foreground">
                  Fields marked <span className="text-red-500">*</span> required
                </span>
              </div>

              {status === "success" && (
                <div
                  role="status"
                  className="animate-fade-up flex items-start gap-3 border border-emerald-500/30 bg-emerald-500/10 px-4 py-3"
                >
                  <span className="status-ring mt-1 text-emerald-500" aria-hidden="true" />
                  <div>
                    <p className="label-sm text-emerald-600 dark:text-emerald-400">
                      Message queued
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Transmission received. I&apos;ll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div
                  role="alert"
                  className="animate-fade-up flex items-start gap-3 border border-red-500/30 bg-red-500/10 px-4 py-3"
                >
                  <span className="mt-0.5 text-red-500" aria-hidden="true">!</span>
                  <div>
                    <p className="label-sm text-red-600 dark:text-red-400">
                      Transmission failed
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      The message could not be sent. Email me directly at{" "}
                      <a href={`mailto:${social.email}`} className="text-primary underline underline-offset-2">
                        {social.email}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}
              {status === "closed" && (
                <p role="alert" className="text-sm text-muted-foreground">
                  Messages have just closed. Please check back later.
                </p>
              )}
            </form> : (
              <div role="status" className="px-6 py-16 text-center">
                <p className="label text-primary">Messages closed</p>
                <h2 className="mt-4 text-2xl font-semibold text-foreground">The message form is taking a break.</h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Thanks for stopping by. Please check back later to send a message.
                </p>
              </div>
            )}
          </div>

          {/* Channels */}
          <div className="space-y-4">
            <div className="hud clip-corner overflow-hidden">
              <div className="flex items-center justify-between gap-3 border-b border-card-border px-5 py-3">
                <span className="label text-primary">Channels</span>
                <span className="label-sm text-muted-foreground">03 open</span>
              </div>

              <ul className="divide-y divide-card-border/60">
                <li className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="label text-muted-foreground">Email</span>
                    <CopyButton value={social.email} />
                  </div>
                  <a
                    href={`mailto:${social.email}`}
                    className="mono mt-3 block break-all text-sm text-foreground transition-colors hover:text-primary"
                  >
                    {social.email}
                  </a>
                </li>

                <li className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="label text-muted-foreground">GitHub</span>
                    <a
                      href={social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-sm inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                    >
                      Open
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
                      </svg>
                    </a>
                  </div>
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono mt-3 block break-all text-sm text-foreground transition-colors hover:text-primary"
                  >
                    {social.github.replace(/^https?:\/\//, "")}
                  </a>
                </li>

                <li className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="label text-muted-foreground">LinkedIn</span>
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-sm inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                    >
                      Open
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
                      </svg>
                    </a>
                  </div>
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono mt-3 block break-all text-sm text-foreground transition-colors hover:text-primary"
                  >
                    {social.linkedin.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              </ul>
            </div>

            <div className="hud p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="label text-primary">Availability</span>
                <span className="label-sm flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <span className="status-ring" aria-hidden="true" />
                  {data.hero.availability ? "Available" : "Unavailable"}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {data.content.contactAvailability}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
