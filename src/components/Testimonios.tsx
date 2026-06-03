import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react'
import { TESTIMONIOS } from '../data'
import { WordsReveal } from './primitives'

const DUR = 6000

export default function Testimonios() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = TESTIMONIOS.length
  const t = TESTIMONIOS[i]

  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => setI((p) => (p + 1) % n), DUR)
    return () => clearTimeout(id)
  }, [i, paused, n])

  const go = (d: number) => setI((p) => (p + d + n) % n)

  return (
    <section id="testimonios" className="scene-dark relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="imr-haze !opacity-30" style={{ top: '30%' }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="chip !text-white/70 !border-white/20 !bg-white/5">Lo que dicen las familias</span>
          <h2 className="font-display font-black text-white leading-[0.98] tracking-mega mt-5" style={{ fontSize: 'clamp(2.2rem,6vw,5rem)' }}>
            <WordsReveal text="Confianza que se construye" />
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16 items-center">
          {/* spotlight */}
          <div className="relative min-h-[320px] sm:min-h-[300px]">
            <Quote size={180} className="absolute -top-10 -left-4 text-white/[0.05]" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.blockquote key={i}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex gap-1 mb-6 text-brand-red">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={18} fill="currentColor" />)}
                </div>
                <p className="font-display text-white leading-[1.15] tracking-tight" style={{ fontSize: 'clamp(1.4rem,3.2vw,2.6rem)' }}>
                  "{t.texto}"
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full grid place-items-center text-white font-display text-lg shrink-0" style={{ background: 'var(--grad)' }}>{t.autor[0]}</div>
                  <div>
                    <div className="text-white font-semibold text-lg">{t.autor}</div>
                    <div className="grad-text text-sm font-semibold">{t.rol}</div>
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>

            {/* controles */}
            <div className="flex items-center gap-3 mt-10">
              <button onClick={() => go(-1)} className="w-11 h-11 rounded-full border border-white/20 grid place-items-center text-white hover:bg-white hover:text-night transition-colors cursor-pointer" aria-label="Anterior"><ArrowLeft size={18} /></button>
              <button onClick={() => go(1)} className="w-11 h-11 rounded-full border border-white/20 grid place-items-center text-white hover:bg-white hover:text-night transition-colors cursor-pointer" aria-label="Siguiente"><ArrowRight size={18} /></button>
              <span className="text-white/40 text-sm ml-2 font-display">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
            </div>
          </div>

          {/* selector */}
          <div className="flex flex-col gap-2.5">
            {TESTIMONIOS.map((tt, idx) => (
              <button key={idx} onClick={() => setI(idx)}
                className={`text-left rounded-2xl p-4 border transition-all duration-300 cursor-pointer relative overflow-hidden ${idx === i ? 'border-transparent' : 'border-white/10 hover:border-white/30'}`}
                style={idx === i ? { background: 'rgba(255,255,255,.06)' } : {}}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full grid place-items-center font-display text-sm shrink-0 ${idx === i ? 'text-white' : 'text-white/70 bg-white/10'}`} style={idx === i ? { background: 'var(--grad)' } : {}}>{tt.autor[0]}</div>
                  <div className="min-w-0">
                    <div className={`font-semibold truncate ${idx === i ? 'text-white' : 'text-white/60'}`}>{tt.autor}</div>
                    <div className="text-white/40 text-xs">{tt.rol}</div>
                  </div>
                </div>
                {idx === i && !paused && (
                  <motion.div className="absolute bottom-0 left-0 h-[3px]" style={{ background: 'var(--grad)' }}
                    initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: DUR / 1000, ease: 'linear' }} key={`p-${i}`} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
