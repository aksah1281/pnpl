import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sprinkles = ["🍍","🍕","🔥","💥","✨","😤","😋","🧀","🥓","🌋","🌈","🌀"];

function useConfetti(duration = 1200) {
  const [bits, setBits] = useState([]);
  const blast = () => {
    const now = Date.now();
    const b = Array.from({ length: 28 }, (_, i) => ({
      id: now + i,
      x: (Math.random() * 80) - 40,
      y: (Math.random() * 40) - 20,
      r: (Math.random() * 360),
      e: sprinkles[Math.floor(Math.random() * sprinkles.length)],
    }));
    setBits(b);
    setTimeout(() => setBits([]), duration);
  };
  return { bits, blast };
}

const GradientBG = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-pink-500 to-rose-500" />
    <div
      className="absolute inset-0 mix-blend-overlay opacity-40"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.25) 0, transparent 35%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.2) 0, transparent 30%), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.18) 0, transparent 25%)",
      }}
    />
  </div>
);

const FloatingBits = ({ bits }) => (
  <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
    <AnimatePresence>
      {bits.map((b) => (
        <motion.div
          key={b.id}
          initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
          animate={{ opacity: 1, x: b.x * 5, y: -120 + b.y * 3, rotate: b.r }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 text-2xl"
        >
          {b.e}
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

function Navbar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid place-items-center w-10 h-10 rounded-2xl bg-black/30 border border-white/15 shadow-lg shadow-black/20 text-xl">
            🍕
          </div>
          <div>
            <p className="text-white font-extrabold leading-none">Pineapple on Pizza</p>
            <p className="text-white/60 text-xs">$PNPL · Solana meme coalition</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white text-black font-semibold shadow-lg hover:shadow-xl active:scale-[.99] transition"
          >
            🚀 Get $PNPL
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { bits, blast } = useConfetti();
  const [side, setSide] = useState("pineapple");

  return (
    <div className="relative overflow-hidden">
      <FloatingBits bits={bits} />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-2 rounded-2xl px-3 py-1 text-sm bg-white/10 border border-white/15 backdrop-blur-sm">✨ New on Solana</span>
              <span className="inline-flex items-center gap-2 rounded-2xl px-3 py-1 text-sm bg-white/10 border border-white/15 backdrop-blur-sm">🔥 Spicy debate energy</span>
              <span className="inline-flex items-center gap-2 rounded-2xl px-3 py-1 text-sm bg-white/10 border border-white/15 backdrop-blur-sm">🪙 Ticker: $PNPL</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Pineapple on Pizza
              <span className="block text-white/80 text-xl sm:text-2xl font-semibold mt-3">
                The most controversial topping in human history — now on-chain.
              </span>
            </h1>

            <p className="mt-6 text-white/80 max-w-xl">
              Love it or ban it, you can’t ignore it. 🍍+🍕 lives on the blockchain as $PNPL — a sweet & salty community experiment. No promises, just vibes and memes.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={blast}
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white text-black font-semibold shadow-lg hover:shadow-xl active:scale-[.99] transition"
              >
                🚀 Get $PNPL
              </button>
              <button
                onClick={() => setSide("pineapple") || blast()}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl border ${
                  side === "pineapple"
                    ? "bg-white text-black"
                    : "border-white/30 text-white/90 hover:bg-white/10"
                }`}
              >
                👍 Team Pineapple
              </button>
              <button
                onClick={() => setSide("nopine") || blast()}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl border ${
                  side === "nopine"
                    ? "bg-white text-black"
                    : "border-white/30 text-white/90 hover:bg-white/10"
                }`}
              >
                👎 Team Pizza-Only
              </button>
            </div>

            <p className="mt-3 text-white/70 text-sm">
              Click your side to trigger 🍍 confetti. This is a topping war, respectfully.
            </p>

            {/* Address Section */}
            <div className="mt-8 p-4 rounded-2xl bg-black/30 border border-white/15">
              <p className="text-white/70 text-sm mb-2">Contract Address</p>
              <div className="flex items-center justify-between gap-3">
                <code className="text-white/90 font-mono text-sm truncate">So1aNaP1neApp13Addre55Examp1e...</code>
                <button
                  onClick={() => navigator.clipboard.writeText("So1aNaP1neApp13Addre55Examp1e...")}
                  className="px-3 py-1 rounded-xl bg-white text-black text-sm font-semibold"
                >📋 Copy</button>
              </div>
            </div>

            {/* Telegram Link */}
            <div className="mt-4">
              <a
                href="https://t.me/pineappleonpizza"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-500 text-white font-semibold shadow hover:bg-blue-600"
              >
                💬 Join us on Telegram
              </a>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square rounded-3xl bg-black/30 border border-white/15 shadow-2xl overflow-hidden grid place-items-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                className="relative w-3/4 aspect-square rounded-full"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-amber-300 to-orange-300 shadow-inner" />
                <div className="absolute inset-6 rounded-full bg-red-500/30 blur-[2px]" />
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-200/80 rounded-full"
                    style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%` }}
                  />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-2xl"
                    style={{ left: `${15 + Math.random() * 70}%`, top: `${15 + Math.random() * 70}%` }}
                  >
                    🍍
                  </div>
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-2xl"
                    style={{ left: `${15 + Math.random() * 70}%`, top: `${15 + Math.random() * 70}%` }}
                  >
                    🧀
                  </div>
                ))}
              </motion.div>
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-2xl px-3 py-1 text-sm bg-white text-black font-semibold">#PineappleArmy</span>
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-xl bg-white text-black font-semibold shadow active:scale-[.98]">𝕏 Post a meme</button>
                  <button className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-xl bg-white text-black font-semibold shadow active:scale-[.98]">📸 Story this</button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl p-6 bg-black/30 border border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-10 h-10 rounded-2xl bg-black/30 border border-white/15 shadow-lg shadow-black/20 text-xl">🍕</div>
              <div>
                <p className="text-white font-extrabold leading-none">Pineapple on Pizza</p>
                <p className="text-white/60 text-xs">$PNPL · Sweet & salty meme experiment</p>
              </div>
            </div>
            <div className="text-white/60 text-sm">© {new Date().getFullYear()} — Not financial advice. For fun only.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function PineappleOnPizzaHome() {
  return (
    <div className="min-h-screen text-white">
      <GradientBG />
      <Navbar />
      <Hero />
    </div>
  );
}
