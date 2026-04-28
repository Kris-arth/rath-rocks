import { ContactForm } from "./components/ContactForm";

const services = [
  {
    pair: "HU → EN",
    label: "Hungarian to English",
    description:
      "Capturing the layered expressiveness of Hungarian into precise, natural English — from legal documents to literary prose.",
  },
  {
    pair: "PL → EN",
    label: "Polish to English",
    description:
      "Polish rendered with full idiomatic accuracy, preserving the grammatical richness that sets it apart from Western European languages.",
  },
  {
    pair: "HU ↔ PL",
    label: "Hungarian & Polish",
    description:
      "Direct translation between two Slavic-adjacent languages — no pivot language, no lost nuance. Pure linguistic bridge-work.",
  },
];

export default function Home() {
  return (
    <main>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Radial glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(201,169,106,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="flex flex-col items-center">
          <h1
            className="hero-word font-serif font-light text-cream leading-none tracking-[0.06em]"
            style={{ fontSize: "clamp(96px, 18vw, 220px)" }}
          >
            RATH
          </h1>

          <div
            aria-hidden
            className="hero-line bg-gold mt-3 mb-5"
            style={{ height: "1px", display: "block" }}
          />

          <p className="hero-sub text-[11px] tracking-ultra text-gold uppercase">
            Hungarian&nbsp;·&nbsp;Polish&nbsp;·&nbsp;English
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-ultra text-cream-dim uppercase">
            Scroll
          </span>
          <svg
            width="1"
            height="40"
            viewBox="0 0 1 40"
            className="overflow-visible"
            aria-hidden
          >
            <line
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="40"
              stroke="rgba(201,169,106,0.35)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
          </svg>
        </div>
      </section>

      {/* ── Manifesto ───────────────────────────────────────── */}
      <section className="reveal py-28 px-6 flex justify-center">
        <p
          className="font-serif font-light text-cream text-center leading-snug max-w-2xl"
          style={{ fontSize: "clamp(22px, 3.5vw, 38px)" }}
        >
          Language is not exchanged word for word.
          <br />
          <em className="not-italic text-cream-dim">
            It is transplanted — root, soil, and all.
          </em>
        </p>
      </section>

      {/* ── Divider ─────────────────────────────────────────── */}
      <div className="flex justify-center">
        <div className="w-px h-16 bg-border-subtle" />
      </div>

      {/* ── Services ────────────────────────────────────────── */}
      <section className="reveal py-24 px-6 max-w-5xl mx-auto">
        <p className="text-[10px] tracking-ultra text-gold uppercase text-center mb-16">
          Languages
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border-subtle border border-border-subtle">
          {services.map((s) => (
            <article
              key={s.pair}
              className="bg-bg p-10 flex flex-col gap-5 group hover:bg-[#0a0a0a] transition-colors duration-500"
            >
              <span
                className="font-serif font-light text-gold"
                style={{ fontSize: "clamp(28px, 3vw, 36px)" }}
              >
                {s.pair}
              </span>
              <span className="text-[10px] tracking-super text-cream-dim uppercase">
                {s.label}
              </span>
              <p className="text-[13px] leading-loose text-cream-dim mt-auto">
                {s.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────────── */}
      <div className="flex justify-center">
        <div className="w-px h-16 bg-border-subtle" />
      </div>

      {/* ── About ───────────────────────────────────────────── */}
      <section className="reveal py-24 px-6 max-w-3xl mx-auto">
        <p className="text-[10px] tracking-ultra text-gold uppercase mb-12">
          About
        </p>
        <p className="text-[15px] leading-loose text-cream-dim">
          RATH is a specialised translation practice working exclusively across
          Hungarian, Polish, and English. Every project is handled directly —
          no outsourcing, no intermediaries. Whether you need a legal contract,
          a business pitch, academic work, or a personal document, each text
          receives the attention it deserves.
        </p>
        <p className="text-[15px] leading-loose text-cream-dim mt-5">
          Confidentiality is standard. Turnaround is discussed per project.
          Quality is non-negotiable.
        </p>
      </section>

      {/* ── Divider ─────────────────────────────────────────── */}
      <div className="flex justify-center">
        <div className="w-px h-16 bg-border-subtle" />
      </div>

      {/* ── Contact ─────────────────────────────────────────── */}
      <section id="contact" className="reveal py-24 px-6 max-w-xl mx-auto">
        <p className="text-[10px] tracking-ultra text-gold uppercase mb-3">
          Contact
        </p>
        <h2
          className="font-serif font-light text-cream mb-14"
          style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
        >
          Start a conversation.
        </h2>

        <ContactForm />
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-border-subtle mt-16 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-serif font-light text-cream-dim tracking-[0.1em] text-sm">
            RATH
          </span>
          <span className="text-[11px] tracking-super text-cream-dim uppercase">
            Hungarian&nbsp;·&nbsp;Polish&nbsp;·&nbsp;English
          </span>
          <span className="text-[11px] text-cream-dim" style={{ opacity: 0.4 }}>
            © {new Date().getFullYear()} rath.rock
          </span>
        </div>
      </footer>
    </main>
  );
}
