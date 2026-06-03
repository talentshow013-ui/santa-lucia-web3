import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { SERVICIOS } from '../data'
import { WordsReveal } from './primitives'

export default function Servicios() {
  const [active, setActive] = useState(0)

  return (
    <section id="servicios" className="scene-dark relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden">
      <div className="ticker absolute top-10 left-0 opacity-[0.06] pointer-events-none select-none" aria-hidden="true">
        {Array.from({ length: 2 }).map((_, k) => (
          <span key={k} className="font-display font-black text-white whitespace-nowrap pr-10" style={{ fontSize: 'clamp(4rem,12vw,11rem)' }}>
            ARQUITECTURA · DISEÑO · INNOVACIÓN ·&nbsp;
          </span>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="max-w-3xl mb-12">
          <span className="chip !text-white/70 !border-white/20 !bg-white/5">Lo que hacemos</span>
          <h2 className="font-display font-black text-white leading-[0.98] tracking-mega mt-5" style={{ fontSize: 'clamp(2.2rem,6vw,5rem)' }}>
            <WordsReveal text="Seis pilares en cada obra" />
          </h2>
        </div>

        <div className="border-t border-white/12">
          {SERVICIOS.map((s, i) => {
            const open = active === i
            return (
              <div key={s.n} className="border-b border-white/12">
                <button
                  onClick={() => setActive(open ? -1 : i)}
                  className="w-full flex items-center gap-5 sm:gap-8 py-6 sm:py-8 text-left cursor-pointer group"
                >
                  <span className={`font-display text-2xl sm:text-3xl transition-colors ${open ? 'grad-text' : 'text-white/30 group-hover:text-white/60'}`}>{s.n}</span>
                  <span className={`flex-1 font-display text-2xl sm:text-4xl tracking-mega transition-colors ${open ? 'text-white' : 'text-white/55 group-hover:text-white'}`}>{s.nombre}</span>
                  <span className={`w-10 h-10 rounded-full grid place-items-center border transition-all ${open ? 'border-brand-red rotate-45' : 'border-white/25 group-hover:border-white/60'}`}>
                    <Plus size={18} className="text-white" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden"
                    >
                      <p className="text-white/60 text-base sm:text-lg max-w-3xl pb-8 pl-12 sm:pl-20">{s.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
          {/* sexto pilar: calidad humana */}
          <div className="border-b border-white/12">
            <button onClick={() => setActive(open => open === 99 ? -1 : 99)} className="w-full flex items-center gap-5 sm:gap-8 py-6 sm:py-8 text-left cursor-pointer group">
              <span className={`font-display text-2xl sm:text-3xl transition-colors ${active === 99 ? 'grad-text' : 'text-white/30 group-hover:text-white/60'}`}>06</span>
              <span className={`flex-1 font-display text-2xl sm:text-4xl tracking-mega transition-colors ${active === 99 ? 'text-white' : 'text-white/55 group-hover:text-white'}`}>Calidad humana</span>
              <span className={`w-10 h-10 rounded-full grid place-items-center border transition-all ${active === 99 ? 'border-brand-red rotate-45' : 'border-white/25 group-hover:border-white/60'}`}><Plus size={18} className="text-white" /></span>
            </button>
            <AnimatePresence initial={false}>
              {active === 99 && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                  <p className="text-white/60 text-base sm:text-lg max-w-3xl pb-8 pl-12 sm:pl-20">Detrás de cada proyecto hay personas. Atendemos con cercanía, transparencia y respeto en todo el proceso, antes y después de la entrega.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
