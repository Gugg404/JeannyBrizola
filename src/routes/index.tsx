import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Instagram, Mail, MessageCircle, X, Menu } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import hero from "@/assets/hero.jpeg";
import photographer from "@/assets/photographer.png";
import ensaio1 from "@/assets/ensaio-1.png";
import ensaio2 from "@/assets/ensaio-2.jpeg";
import ensaio3 from "@/assets/ensaio-3.jpeg";
import ensaio4 from "@/assets/ensaio-4.jpeg";
import ensaio5 from "@/assets/ensaio-5.jpeg";
import ensaio6 from "@/assets/ensaio-6.jpeg";
import ensaio7 from "@/assets/ensaio-7.jpeg";
import ensaio8 from "@/assets/ensaio-8.jpeg";
import ensaio9 from "@/assets/ensaio-9.jpeg";
import ensaio10 from "@/assets/ensaio-10.jpeg";
import ensaio11 from "@/assets/ensaio-11.jpeg";
import ensaio12 from "@/assets/ensaio-12.jpeg";
import ensaio13 from "@/assets/ensaio-13.jpeg";
import ensaio14 from "@/assets/ensaio-14.jpeg";
import ensaio15 from "@/assets/ensaio-15.jpeg";

import casamento1 from "@/assets/casamento-1.jpeg";
import casamento2 from "@/assets/casamento-2.jpeg";
import evento1 from "@/assets/evento-1.jpeg";
import evento2 from "@/assets/evento-2.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP_NUMBER = "555189945733";
const INSTAGRAM_URL = "https://www.instagram.com/annyon.film/";
const EMAIL = "jeannybrizola128@gmail.com";

type Category = "Geral" | "Ensaios" | "Mini Wedding" | "Eventos";

const allImages = [
  { src: ensaio1, category: "Ensaios", alt: "", featured: true },
  { src: ensaio2, category: "Ensaios", alt: "", featured: true },
  { src: ensaio3, category: "Ensaios", alt: "", featured: false },
  { src: ensaio4, category: "Ensaios", alt: "", featured: false },
  { src: ensaio5, category: "Ensaios", alt: "", featured: false },
  { src: ensaio6, category: "Ensaios", alt: "", featured: false },
  { src: ensaio7, category: "Ensaios", alt: "", featured: false },
  { src: ensaio8, category: "Ensaios", alt: "", featured: false },
  { src: ensaio9, category: "Ensaios", alt: "", featured: false },
  { src: ensaio10, category: "Ensaios", alt: "", featured: false },
  { src: ensaio11, category: "Ensaios", alt: "", featured: false },
  { src: ensaio12, category: "Ensaios", alt: "", featured: false },
  { src: ensaio13, category: "Ensaios", alt: "", featured: false },
  { src: ensaio14, category: "Ensaios", alt: "", featured: false },
  { src: ensaio15, category: "Ensaios", alt: "", featured: false },

  { src: casamento1, category: "Mini Wedding", alt: "", featured: true },
  { src: casamento2, category: "Mini Wedding", alt: "", featured: true },

  { src: evento1, category: "Eventos", alt: "", featured: true },
  { src: evento2, category: "Eventos", alt: "", featured: true },
];

const contactSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  mensagem: z.string().trim().min(10, "Mensagem muito curta").max(1000),
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  useReveal();
  const [filter, setFilter] = useState<Category>("Geral");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered =
    filter === "Geral"
      ? allImages.filter((img) => img.featured)
      : allImages.filter((img) => img.category === filter);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? null : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, filtered.length]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      nome: String(fd.get("nome") ?? ""),
      email: String(fd.get("email") ?? ""),
      mensagem: String(fd.get("mensagem") ?? ""),
    };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Verifique os dados");
      return;
    }
    const text = `Olá! Sou ${parsed.data.nome} (${parsed.data.email}). ${parsed.data.mensagem}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    toast.success("Mensagem pronta para envio!");
    e.currentTarget.reset();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" />

      {/* NAV */}
      <header className="fixed top-0 z-40 w-full bg-background/70 backdrop-blur-md border-b border-border/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className="font-serif text-xl tracking-wide">
            Jeanny Brizola
          </a>
          <nav className="hidden gap-10 text-sm tracking-wide text-muted-foreground md:flex">
            <a href="#home" className="transition hover:text-foreground">
              Home
            </a>
            <a href="#sobre" className="transition hover:text-foreground">
              Sobre
            </a>
            <a href="#portfolio" className="transition hover:text-foreground">
              Portfólio
            </a>
            <a href="#contato" className="transition hover:text-foreground">
              Contato
            </a>
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background">
            <nav className="flex flex-col gap-1 px-6 py-4 text-sm">
              {["Home", "Sobre", "Portfólio", "Contato"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace("ó", "o")}`}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-muted-foreground"
                >
                  {l}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative h-screen w-full overflow-hidden">
        <img
          src={hero}
          alt="Casal em abraço ao pôr do sol"
          className="hero-zoom absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="reveal mb-6 text-xs uppercase tracking-[0.4em] text-white/70">
            Fotografia Autoral
          </p>
          <h1 className="reveal font-serif text-5xl leading-tight md:text-7xl lg:text-8xl">
            Capturando momentos
            <br />
            <span className="italic">únicos</span>
          </h1>
          <p className="reveal mt-6 max-w-md text-sm text-white/80 md:text-base">
            Histórias que merecem ser eternizadas com sensibilidade, luz e olhar autêntico.
          </p>
          <a
            href="#portfolio"
            className="reveal mt-10 inline-block border border-white/80 px-10 py-4 text-xs uppercase tracking-[0.3em] transition hover:bg-white hover:text-black"
          >
            Ver Portfólio
          </a>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="reveal order-2 md:order-1">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Sobre a Fotógrafa
            </p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              O QUE MEUS OLHOS BUSCAM
            </h2>
            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Meu trabalho é guiado pela atenção aos detalhes, pela valorização das conexões reais
                e pela busca de uma estética que une o atemporal e o contemporâneo. Com atuação em
                Novo Hamburgo, atendo também em outras regiões (RS), levando um olhar autoral que
                valoriza conexões reais. Busco construir cada ensaio a partir das inspirações e
                referências de cada cliente, entendendo o que faz sentido para a sua história
              </p>
              <p>
                Atendo ensaios, casamentos e eventos com um olhar autoral, sensível e atento aos
                detalhes que fazem cada momento único.
              </p>
            </div>
          </div>
          <div className="reveal order-1 md:order-2">
            <img
              src={photographer}
              alt="Retrato da fotógrafa Sofia Marquês"
              loading="lazy"
              width={1024}
              height={1280}
              className="w-full object-cover grayscale transition duration-700 hover:grayscale-0"
            />
          </div>
        </div>
      </section>

      {/* PORTFÓLIO */}
      <section id="portfolio" className="bg-secondary/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-12 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Portfólio
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">Trabalhos selecionados</h2>
          </div>

          <div className="reveal mb-12 flex flex-wrap justify-center gap-2 md:gap-3">
            {(["Geral", "Ensaios", "Mini Wedding", "Eventos"] as Category[]).map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`border px-5 py-2 text-xs uppercase tracking-[0.2em] transition ${
                  filter === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setLightbox(i)}
                className="reveal group relative aspect-[4/5] overflow-hidden bg-muted"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
                <span className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.3em] text-white opacity-0 transition group-hover:opacity-100">
                  {img.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-2">
          <div className="reveal">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">Contato</p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Vamos criar algo memorável juntos
            </h2>
            <p className="mt-6 text-muted-foreground">
              Conte-me sobre o seu projeto. Responderei em breve com prazer.
            </p>
            <div className="mt-10 space-y-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 border-b border-border py-4 text-sm transition hover:text-muted-foreground"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 border-b border-border py-4 text-sm transition hover:text-muted-foreground"
              >
                <Instagram className="h-4 w-4" /> @annyon.film
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-4 border-b border-border py-4 text-sm transition hover:text-muted-foreground"
              >
                <Mail className="h-4 w-4" /> {EMAIL}
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="reveal space-y-6">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Nome
              </label>
              <input
                name="nome"
                required
                maxLength={100}
                className="w-full border-b border-border bg-transparent py-3 text-sm outline-none transition focus:border-foreground"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                E-mail
              </label>
              <input
                name="email"
                type="email"
                required
                maxLength={255}
                className="w-full border-b border-border bg-transparent py-3 text-sm outline-none transition focus:border-foreground"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Mensagem
              </label>
              <textarea
                name="mensagem"
                required
                maxLength={1000}
                rows={5}
                className="w-full resize-none border-b border-border bg-transparent py-3 text-sm outline-none transition focus:border-foreground"
              />
            </div>
            <button
              type="submit"
              className="w-full border border-foreground bg-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] text-background transition hover:bg-transparent hover:text-foreground"
            >
              Enviar mensagem
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        © {new Date().getFullYear()} Jeanny Brizola{}
        <span className="normal-case tracking-normal ml-2">• Desenvolvido por Gugg404</span>
      </footer>
      {/* FLOATING WHATSAPP */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-6 top-6 text-white/80 transition hover:text-white"
            onClick={() => setLightbox(null)}
            aria-label="Fechar"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={filtered[lightbox].src}
            alt={filtered[lightbox].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
