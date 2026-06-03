import { motion } from 'framer-motion'
import { LOGROS, TRAYECTORIA } from '../data'
import { CountUp, FadeIn, WordsReveal, Parallax } from './primitives'

export default function Trayectoria() {
  return (
    <section id="trayectoria" className="scene-dark relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden">
      <div className="hue absolute -top-40 left-1/4 w-1/2 h-80 opacity-30 blur-[120px]" style={{ background: 'var(--grad)' }} aria-hidden="true" />
      <div className="max-w-7xl mx-auto relative">
        <div className="max-w-4xl">
          <span className="chip !text-white/70 !border-white/20 !bg-white/5">Nuestra historia</span>
          <h2 className="font-display font-black text-white leading-[0.98] tracking-mega mt-5" style={{ fontSize: 'clamp(2.2rem,6vw,5rem)' }}>
            <WordsReveal text="Tres décadas dejando huella en cada ciudad" />
          </h2>
          <p className="text-white/60 text-base sm:text-lg mt-6 max-w-2xl">
            No empezamos ayer. Cada proyecto entregado es una familia que confió, una promesa cumplida y un barrio que creció con nosotros.
          </p>
        </div>

        {/* contadores */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-14 bg-white/10 rounded-3xl overflow-hidden border border-white/10">
          {LOGROS.map((l) => (
            <FadeIn key={l.label} className="bg-night p-7 sm:p-9">
              <div className="font-display font-black grad-text leading-none" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)' }}>
                <CountUp to={l.n} suffix={l.suf} />
              </div>
              <p className="text-white/55 text-sm mt-2">{l.label}</p>
            </FadeIn>
          ))}
        </div>

        {/* timeline de entregados */}
        <div className="mt-20">
          <div className="flex items-end justify-between mb-8">
            <h3 className="font-display text-white text-2xl sm:text-3xl">Proyectos entregados</h3>
            <span className="text-white/40 text-xs tracking-[0.2em] uppercase hidden sm:block">Línea de tiempo</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRAYECTORIA.map((p, i) => (
              <Parallax key={p.nombre} amount={i % 2 ? 24 : 40}>
                <motion.article
                  className="group relative rounded-3xl overflow-hidden border border-white/10 bg-coal"
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={p.img} alt={`${p.nombre}, ${p.tipo} entregado en ${p.ciudad} (${p.anio})`}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-white text-xs font-semibold border border-white/20">{p.anio}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h4 className="font-display text-white text-lg leading-tight">{p.nombre}</h4>
                    <p className="text-white/60 text-sm mt-1">{p.ciudad} · {p.tipo}</p>
                    <p className="grad-text font-semibold text-sm mt-1">{p.unidades}</p>
                  </div>
                </motion.article>
              </Parallax>
            ))}
          </div>
          <p className="text-white/35 text-xs mt-6">Datos de ejemplo · reemplázalos con los proyectos reales entregados.</p>
        </div>
      </div>
    </section>
  )
}
