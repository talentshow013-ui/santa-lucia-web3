import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, BedDouble, Bath, Maximize, MapPin } from 'lucide-react'
import { PROYECTOS, fmtCOPshort, type Proyecto } from '../data'
import { FadeIn } from './primitives'
import ProjectModal from './ProjectModal'

export default function Proyectos() {
  const [sel, setSel] = useState(0)
  const [open, setOpen] = useState<Proyecto | null>(null)
  const p = PROYECTOS[sel]

  return (
    <section id="proyectos" className="scene-light relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="chip">En venta y preventa</span>
            <h2 className="font-display font-black leading-[0.95] tracking-mega mt-4" style={{ fontSize: 'clamp(2.2rem,6vw,5rem)' }}>
              Proyectos <span className="grad-text">disponibles</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm text-sm sm:text-base">Selecciona un proyecto para verlo en detalle: galería, recorrido 3D, ubicación y simulador de crédito.</p>
        </FadeIn>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-10 items-stretch">
          {/* selector */}
          <div className="flex flex-col gap-2">
            {PROYECTOS.map((proj, i) => (
              <button
                key={proj.id}
                onClick={() => setSel(i)}
                className={`group text-left rounded-2xl p-5 border transition-all duration-300 cursor-pointer ${
                  i === sel ? 'border-transparent text-white shadow-xl' : 'border-slate-200 bg-white hover:border-brand-blue/40'
                }`}
                style={i === sel ? { background: 'var(--grad)' } : {}}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className={`text-xs tracking-[0.2em] uppercase ${i === sel ? 'text-white/70' : 'text-slate-400'}`}>{proj.ciudad} · {proj.estado}</span>
                    <h3 className="font-display text-xl sm:text-2xl mt-1">{proj.nombre}</h3>
                  </div>
                  <span className={`font-display text-2xl ${i === sel ? 'text-white/90' : 'text-slate-300 group-hover:text-brand-blue'}`}>0{i + 1}</span>
                </div>
                <div className={`text-sm mt-2 ${i === sel ? 'text-white/85' : 'text-slate-500'}`}>Desde {fmtCOPshort(proj.precioDesde)}</div>
              </button>
            ))}
          </div>

          {/* panel destacado */}
          <div className="relative rounded-4xl overflow-hidden bg-night min-h-[440px] sm:min-h-[560px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={p.img} alt={`Render del proyecto ${p.nombre}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-9">
              <AnimatePresence mode="wait">
                <motion.div key={p.id + '-t'} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  {p.subsidio && <span className="inline-block mb-3 px-3 py-1 rounded-full bg-brand-red text-white text-xs font-semibold">Aplica subsidio</span>}
                  <h3 className="font-display font-bold text-white text-3xl sm:text-5xl tracking-mega leading-none">{p.nombre}</h3>
                  <p className="text-white/70 mt-3 max-w-lg text-sm sm:text-base">{p.descripcion}</p>

                  <div className="flex flex-wrap gap-4 mt-5 text-white/85 text-sm">
                    <span className="inline-flex items-center gap-1.5"><MapPin size={16} className="text-brand-red" /> {p.ciudad}</span>
                    <span className="inline-flex items-center gap-1.5"><BedDouble size={16} className="text-brand-red" /> {p.habitaciones} hab</span>
                    <span className="inline-flex items-center gap-1.5"><Bath size={16} className="text-brand-red" /> {p.banos} baños</span>
                    <span className="inline-flex items-center gap-1.5"><Maximize size={16} className="text-brand-red" /> {p.areaDesde} m²</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-7">
                    <button onClick={() => setOpen(p)} className="btn-grad px-7 py-3.5 text-sm cursor-pointer">
                      Ver detalle completo <ArrowUpRight size={17} />
                    </button>
                    <div className="text-white">
                      <span className="text-white/55 text-xs block">Desde</span>
                      <span className="font-display text-2xl">{fmtCOPshort(p.precioDesde)}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <ProjectModal proyecto={open} onClose={() => setOpen(null)} />
    </section>
  )
}
