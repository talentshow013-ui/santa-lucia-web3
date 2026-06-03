import { Quote, Star } from 'lucide-react'
import { TESTIMONIOS } from '../data'
import { WordsReveal } from './primitives'

export default function Testimonios() {
  return (
    <section id="testimonios" className="scene-dark py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12">
        <span className="chip !text-white/70 !border-white/20 !bg-white/5">Lo que dicen las familias</span>
        <h2 className="font-display font-black text-white leading-[0.98] tracking-mega mt-5" style={{ fontSize: 'clamp(2.2rem,6vw,5rem)' }}>
          <WordsReveal text="Confianza que se construye" />
        </h2>
      </div>

      <div className="flex gap-5 sm:gap-7 overflow-x-auto px-5 sm:px-8 pb-6 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
        {TESTIMONIOS.map((t, i) => (
          <article key={i}
            className="snap-start shrink-0 w-[85vw] sm:w-[460px] rounded-4xl p-8 sm:p-10 border border-white/10 bg-coal relative overflow-hidden">
            <Quote size={120} className="absolute -top-4 -right-2 text-white/[0.04]" />
            <div className="flex gap-1 mb-5 text-brand-red">
              {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={16} fill="currentColor" />)}
            </div>
            <p className="text-white/85 text-lg sm:text-2xl font-display leading-snug relative z-10">"{t.texto}"</p>
            <div className="mt-7 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full grid place-items-center text-white font-display" style={{ background: 'var(--grad)' }}>{t.autor[0]}</div>
              <div>
                <div className="text-white font-semibold">{t.autor}</div>
                <div className="text-white/50 text-sm">{t.rol}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="text-center text-white/35 text-xs mt-4">Desliza para ver más →</p>
    </section>
  )
}
