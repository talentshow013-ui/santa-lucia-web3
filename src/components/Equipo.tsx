import { motion } from 'framer-motion'
import { EQUIPO } from '../data'
import { FadeIn } from './primitives'

export default function Equipo() {
  return (
    <section id="equipo" className="scene-light py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="chip">Personas que acompañan</span>
            <h2 className="font-display font-black leading-[0.95] tracking-mega mt-4" style={{ fontSize: 'clamp(2.2rem,6vw,5rem)' }}>
              Equipo <span className="grad-text">comercial</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm text-sm sm:text-base">Un asesor real te acompaña desde la primera visita hasta la entrega de llaves.</p>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {EQUIPO.map((m, i) => (
            <motion.article key={m.nombre}
              className="group relative rounded-3xl overflow-hidden bg-night"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img src={m.foto} alt={`${m.nombre}, ${m.rol}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <h3 className="font-display text-white text-lg leading-tight">{m.nombre}</h3>
                <p className="grad-text text-sm font-semibold">{m.rol}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
