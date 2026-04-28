"use client";

import { useState, useEffect, useRef } from "react";

type Status = "idle" | "loading" | "success" | "error";

interface Fields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY: Fields = { name: "", email: "", subject: "", message: "" };

const inputBase =
  "w-full bg-transparent border-b border-[#1C1C1C] py-3 text-[14px] text-cream placeholder-[rgba(236,231,223,0.2)] focus:outline-none focus:border-gold transition-colors duration-300 resize-none";

const labelBase =
  "block text-[9px] tracking-[0.3em] text-[rgba(236,231,223,0.4)] uppercase mb-2";

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  /* Intersection-observer-driven reveal for the form */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const set = (k: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFields(EMPTY);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="py-12 flex flex-col items-start gap-4">
        <div className="w-8 h-px bg-gold" />
        <p className="font-serif font-light text-cream text-2xl">
          Message received.
        </p>
        <p className="text-[13px] text-[rgba(236,231,223,0.45)] leading-loose">
          I'll be in touch shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-[10px] tracking-[0.3em] text-gold uppercase hover:text-cream transition-colors duration-300"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className={labelBase}>Name</label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={fields.name}
            onChange={set("name")}
            className={inputBase}
            disabled={status === "loading"}
          />
        </div>
        <div>
          <label className={labelBase}>Email</label>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={fields.email}
            onChange={set("email")}
            className={inputBase}
            disabled={status === "loading"}
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className={labelBase}>Subject</label>
        <input
          type="text"
          placeholder="e.g. Legal contract HU → EN"
          value={fields.subject}
          onChange={set("subject")}
          className={inputBase}
          disabled={status === "loading"}
        />
      </div>

      {/* Message */}
      <div>
        <label className={labelBase}>Message</label>
        <textarea
          required
          rows={6}
          placeholder="Tell me about your project..."
          value={fields.message}
          onChange={set("message")}
          className={inputBase}
          disabled={status === "loading"}
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="text-[12px] text-red-400/70 tracking-wide">{errorMsg}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative flex items-center gap-4 text-[11px] tracking-ultra text-cream uppercase transition-colors duration-300 hover:text-gold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span
          aria-hidden
          className="w-8 h-px bg-gold group-hover:w-14 transition-all duration-500"
        />
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
