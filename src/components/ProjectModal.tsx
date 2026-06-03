import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Box, MapPin, Calculator, BedDouble, Bath, Maximize, Car, MessageCircle, CalendarCheck } from 'lucide-react'
import { fmtCOP, fmtCOPshort, type Proyecto } from '../data'
import { waLink } from '../lib/config'

/* Recorrido 3D: pega aquí (o por proyecto) la URL de Matterport/Kuula/360. Vacío = placeholder. */
const EMBED_3D = ''

const TABS = [
  { id: 'galeria', label: 'Galería', icon: ImageIcon },
  { id: 'tour', label: 'Recorrido 3D', icon: Box },
  { id: 'ubicacion', label: 'Ubicación', icon: MapPin },
  { id: 'credito', label: 'Simulador', icon: Calculator },
] as const

export default function ProjectModal({ proyecto, onClose }: { proyecto: Proyecto | null; onClose: () => void }) {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('galeria')
  const [g, setG] = useState(0)
  const [cuota, setCuota] = useState(20)
  const [anios, setAnios] = useState(20)

  useEffect(() => { setTab('galeria'); setG(0) }, [proyecto])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (proyecto) { document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden' }
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [proyecto, onClose])

  const sim = useMemo(() => {
    if (!proyecto) return { mensual: 0, financiado: 0, inicial: 0 }
    const inicial = proyecto.precioDesde * (cuota / 100)
    const financiado = proyecto.precioDesde - inicial
    const i = 0.012 // ~1.2% mensual aprox
    const n = anios * 12
    const mensual = (financiado * i) / (1 - Math.pow(1 + i, -n))
    return { mensual, financiado, inicial }
  }, [proyecto, cuota, anios])

  return (
    <AnimatePresence>
      {proyecto && (
        <motion.div
          className="fixed inset-0 z-[80] bg-night/80 backdrop-blur-md flex items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        >
          <motion.div
            className="bg-cream w-full sm:max-w-5xl h-full sm:h-auto sm:max-h-[92vh] sm:rounded-4xl overflow-hidden flex flex-col"
            initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-slate-200 shrink-0">
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-slate-400">{proyecto.ciudad} · {proyecto.estado}</span>
                <h3 className="font-display text-xl sm:text-2xl leading-tight">{proyecto.nombre}</h3>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 transition-colors cursor-pointer" aria-label="Cerrar"><X size={24} /></button>
            </div>

            <div className="grid lg:grid-cols-[1.5fr_1fr] flex-1 overflow-hidden">
              {/* contenido por tab */}
              <div className="overflow-y-auto p-5 sm:p-7">
                <div className="flex gap-1.5 flex-wrap mb-5">
                  {TABS.map((t) => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${tab === t.id ? 'text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-blue/40'}`}
                      style={tab === t.id ? { background: 'var(--grad)' } : {}}>
                      <t.icon size={15} /> {t.label}
                    </button>
                  ))}
                </div>

                {tab === 'galeria' && (
                  <div>
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-200">
                      <AnimatePresence mode="wait">
                        <motion.img key={g} src={proyecto.galeria[g]} alt={`${proyecto.nombre} imagen ${g + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
                      </AnimatePresence>
                      {proyecto.galeria.length > 1 && (
                        <>
                          <button onClick={() => setG((g - 1 + proyecto.galeria.length) % proyecto.galeria.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 grid place-items-center hover:bg-white cursor-pointer" aria-label="Anterior"><ChevronLeft size={20} /></button>
                          <button onClick={() => setG((g + 1) % proyecto.galeria.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 grid place-items-center hover:bg-white cursor-pointer" aria-label="Siguiente"><ChevronRight size={20} /></button>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                      {proyecto.galeria.map((src, i) => (
                        <button key={i} onClick={() => setG(i)} className={`shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 cursor-pointer ${i === g ? 'border-brand-blue' : 'border-transparent opacity-70'}`}>
                          <img src={src} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {tab === 'tour' && (
                  EMBED_3D ? (
                    <div className="rounded-3xl overflow-hidden aspect-[16/10] bg-night">
                      <iframe src={EMBED_3D} title="Recorrido 3D" className="w-full h-full" allowFullScreen />
                    </div>
                  ) : (
                    <div className="rounded-3xl aspect-[16/10] grad-soft border border-slate-200 grid place-items-center text-center p-8">
                      <div>
                        <Box size={48} className="mx-auto text-brand-blue" />
                        <h4 className="font-display text-xl mt-3">Recorrido 3D del apartamento</h4>
                        <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">Aquí va el tour virtual (Matterport / Kuula / 360). Pega la URL en <b>EMBED_3D</b> y queda navegable.</p>
                      </div>
                    </div>
                  )
                )}

                {tab === 'ubicacion' && (
                  <div className="rounded-3xl overflow-hidden aspect-[16/10] bg-slate-200">
                    <iframe
                      title={`Ubicación ${proyecto.nombre}`}
                      src={`https://www.google.com/maps?q=${encodeURIComponent(proyecto.ciudad + ', Colombia')}&output=embed`}
                      className="w-full h-full" loading="lazy" />
                  </div>
                )}

                {tab === 'credito' && (
                  <div className="bg-white rounded-3xl border border-slate-200 p-6">
                    <h4 className="font-display text-xl mb-4">Simula tu crédito</h4>
                    <label className="block text-sm text-slate-600 mb-1">Cuota inicial: <b>{cuota}%</b> ({fmtCOPshort(sim.inicial)})</label>
                    <input type="range" min={10} max={50} value={cuota} onChange={(e) => setCuota(+e.target.value)} className="slider-b w-full mb-5" />
                    <label className="block text-sm text-slate-600 mb-1">Plazo: <b>{anios} años</b></label>
                    <input type="range" min={5} max={30} value={anios} onChange={(e) => setAnios(+e.target.value)} className="slider-b w-full mb-6" />
                    <div className="rounded-2xl p-5 text-white" style={{ background: 'var(--grad)' }}>
                      <span className="text-white/80 text-sm">Cuota mensual aprox.</span>
                      <div className="font-display text-3xl sm:text-4xl">{fmtCOP(sim.mensual)}</div>
                      <span className="text-white/70 text-xs">Financias {fmtCOPshort(sim.financiado)} · simulación referencial</span>
                    </div>
                  </div>
                )}
              </div>

              {/* sidebar */}
              <aside className="bg-white border-t lg:border-t-0 lg:border-l border-slate-200 p-5 sm:p-7 overflow-y-auto">
                <span className="text-slate-400 text-sm">Desde</span>
                <div className="font-display text-3xl grad-text">{fmtCOPshort(proyecto.precioDesde)}</div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  {[
                    { icon: BedDouble, label: `${proyecto.habitaciones} habitaciones` },
                    { icon: Bath, label: `${proyecto.banos} baños` },
                    { icon: Maximize, label: `${proyecto.areaDesde} m²` },
                    { icon: Car, label: 'Parqueadero' },
                  ].map((c) => (
                    <div key={c.label} className="flex items-center gap-2 bg-cream rounded-xl px-3 py-2.5 text-sm text-slate-700">
                      <c.icon size={17} className="text-brand-blue shrink-0" /> {c.label}
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <h5 className="font-semibold text-sm mb-2">Amenidades</h5>
                  <div className="flex flex-wrap gap-2">
                    {['Zonas comunes', 'Salón social', 'Juegos infantiles', 'Seguridad 24/7', 'Zonas verdes'].map((a) => (
                      <span key={a} className="chip !text-slate-600">{a}</span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2.5 mt-7">
                  <a href={waLink(`Hola, me interesa el proyecto ${proyecto.nombre}`)} target="_blank" rel="noopener" className="btn-grad px-5 py-3.5 text-sm justify-center">
                    <MessageCircle size={17} /> Quiero información
                  </a>
                  <a href="#contacto" onClick={onClose} className="btn-outline-ink px-5 py-3.5 text-sm justify-center">
                    <CalendarCheck size={17} /> Agendar visita
                  </a>
                </div>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
