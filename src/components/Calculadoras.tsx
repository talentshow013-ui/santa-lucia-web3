import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Landmark, Gift, TrendingUp, Wallet } from 'lucide-react'
import { fmtCOP, fmtCOPshort } from '../data'
import { FadeIn } from './primitives'

const TABS = [
  { id: 'credito', label: 'Crédito', icon: Landmark },
  { id: 'subsidio', label: 'Subsidio', icon: Gift },
  { id: 'roi', label: 'Inversión', icon: TrendingUp },
  { id: 'capacidad', label: 'Capacidad', icon: Wallet },
] as const

export default function Calculadoras() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('credito')

  // crédito
  const [valor, setValor] = useState(200_000_000)
  const [inicial, setInicial] = useState(20)
  const [plazo, setPlazo] = useState(20)
  const credito = useMemo(() => {
    const fin = valor * (1 - inicial / 100)
    const i = 0.012, n = plazo * 12
    return { mensual: (fin * i) / (1 - Math.pow(1 + i, -n)), fin }
  }, [valor, inicial, plazo])

  // subsidio
  const [ingresos, setIngresos] = useState(2_600_000)
  const subsidio = useMemo(() => {
    const smmlv = 1_300_000
    const r = ingresos / smmlv
    if (r <= 2) return { monto: 30 * smmlv, txt: 'Mi Casa Ya (hasta 2 SMMLV)' }
    if (r <= 4) return { monto: 20 * smmlv, txt: 'Mi Casa Ya (2–4 SMMLV)' }
    return { monto: 0, txt: 'Por ingresos, revisa subsidio de caja de compensación' }
  }, [ingresos])

  // roi
  const [inv, setInv] = useState(200_000_000)
  const [valoriz, setValoriz] = useState(8)
  const [arriendo, setArriendo] = useState(1_100_000)
  const roi = useMemo(() => {
    const anual = arriendo * 12 + inv * (valoriz / 100)
    return { anual, pct: (anual / inv) * 100 }
  }, [inv, valoriz, arriendo])

  // capacidad
  const [ing2, setIng2] = useState(3_500_000)
  const capacidad = useMemo(() => {
    const cuotaMax = ing2 * 0.3
    const i = 0.012, n = 20 * 12
    const fin = (cuotaMax * (1 - Math.pow(1 + i, -n))) / i
    return { cuotaMax, viviendaAprox: fin / 0.8 }
  }, [ing2])

  return (
    <section id="calculadoras" className="scene-light relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
          <span className="chip">Planea sin salir de aquí</span>
          <h2 className="font-display font-black leading-[0.95] tracking-mega mt-4" style={{ fontSize: 'clamp(2.2rem,6vw,5rem)' }}>
            Simuladores <span className="grad-text">financieros</span>
          </h2>
          <p className="text-slate-500 mt-4">Crédito, subsidio, rentabilidad y capacidad de compra. Cifras referenciales para orientarte.</p>
        </FadeIn>

        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${tab === t.id ? 'text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-blue/40'}`}
              style={tab === t.id ? { background: 'var(--grad)' } : {}}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-4xl border border-slate-200 p-6 sm:p-10 shadow-[0_40px_100px_-50px_rgba(22,104,227,.4)]">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                {tab === 'credito' && <>
                  <Range label={`Valor de la vivienda: ${fmtCOPshort(valor)}`} min={100_000_000} max={600_000_000} step={5_000_000} value={valor} onChange={setValor} />
                  <Range label={`Cuota inicial: ${inicial}%`} min={10} max={50} value={inicial} onChange={setInicial} />
                  <Range label={`Plazo: ${plazo} años`} min={5} max={30} value={plazo} onChange={setPlazo} />
                </>}
                {tab === 'subsidio' && <>
                  <Range label={`Ingresos del hogar: ${fmtCOPshort(ingresos)}`} min={1_000_000} max={8_000_000} step={100_000} value={ingresos} onChange={setIngresos} />
                  <p className="text-slate-500 text-sm mt-4">Estimación según rangos de SMMLV. El subsidio real depende de tu perfil y disponibilidad del programa.</p>
                </>}
                {tab === 'roi' && <>
                  <Range label={`Inversión: ${fmtCOPshort(inv)}`} min={100_000_000} max={600_000_000} step={5_000_000} value={inv} onChange={setInv} />
                  <Range label={`Valorización anual: ${valoriz}%`} min={3} max={15} value={valoriz} onChange={setValoriz} />
                  <Range label={`Arriendo mensual: ${fmtCOPshort(arriendo)}`} min={500_000} max={4_000_000} step={50_000} value={arriendo} onChange={setArriendo} />
                </>}
                {tab === 'capacidad' && <>
                  <Range label={`Ingresos mensuales: ${fmtCOPshort(ing2)}`} min={1_200_000} max={12_000_000} step={100_000} value={ing2} onChange={setIng2} />
                  <p className="text-slate-500 text-sm mt-4">Regla del 30%: tu cuota no debería superar el 30% de tus ingresos.</p>
                </>}
              </div>

              <div className="rounded-3xl p-7 sm:p-9 text-white" style={{ background: 'var(--grad)' }}>
                {tab === 'credito' && <Result big={fmtCOP(credito.mensual)} sub="cuota mensual aprox." extra={`Financias ${fmtCOPshort(credito.fin)}`} />}
                {tab === 'subsidio' && <Result big={subsidio.monto ? fmtCOPshort(subsidio.monto) : 'Consulta'} sub="subsidio estimado" extra={subsidio.txt} />}
                {tab === 'roi' && <Result big={`${roi.pct.toFixed(1)}%`} sub="retorno anual estimado" extra={`≈ ${fmtCOPshort(roi.anual)} / año`} />}
                {tab === 'capacidad' && <Result big={fmtCOPshort(capacidad.viviendaAprox)} sub="vivienda a tu alcance" extra={`Cuota máx. ${fmtCOP(capacidad.cuotaMax)}`} />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Range({ label, min, max, step = 1, value, onChange }: { label: string; min: number; max: number; step?: number; value: number; onChange: (v: number) => void }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} className="slider-b w-full" />
    </div>
  )
}

function Result({ big, sub, extra }: { big: string; sub: string; extra: string }) {
  return (
    <div>
      <span className="text-white/80 text-sm">{sub}</span>
      <div className="font-display font-bold leading-none my-2" style={{ fontSize: 'clamp(2.2rem,5vw,3.6rem)' }}>{big}</div>
      <span className="text-white/75 text-sm">{extra}</span>
    </div>
  )
}
