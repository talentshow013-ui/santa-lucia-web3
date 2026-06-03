import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, MessageCircle } from 'lucide-react'
import { HERO } from '../data'
import { waLink } from '../lib/config'

const PHRASE = 'CONSTRUCTORA SANTA LUCÍA · '
const BAND = PHRASE.repeat(10)

export default function Hero3D() {
  const [familyOk, setFamilyOk] = useState(true)

  return (
    <header className="imr" id="inicio">
      <div className="imr-haze" aria-hidden="true" />

      {/* la sala 3D — estas adentro */}
      <div className="imr-room" aria-hidden="true">
        <div className="imr-surface ceiling">
          <div className="imr-frame" style={{ width: '74%', height: '64%' }} />
          <div className="imr-frame" style={{ width: '48%', height: '40%' }} />
          <div className="imr-frame" style={{ width: '24%', height: '18%' }} />
        </div>
        <div className="imr-surface floor" />
        <div className="imr-surface back"><div className="imr-band">{BAND}</div></div>
        <div className="imr-surface left"><div className="imr-band">{BAND}</div></div>
        <div className="imr-surface right"><div className="imr-band">{BAND}</div></div>
      </div>

      {/* familia en el centro */}
      {familyOk && (
        <img className="imr-figure" src={HERO.familyImg} alt="Familia feliz en su nuevo hogar"
          onError={() => setFamilyOk(false)} />
      )}

      <div className="imr-scrim" aria-hidden="true" />
      <div className="imr-grain" aria-hidden="true" />

      {/* titular */}
      <motion.div className="imr-content"
        initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }}>
        <span className="chip !text-white/80 !border-white/25 !bg-white/5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" /> 30 años · Neiva y Bogotá
        </span>
        <h1 className="font-display font-black text-white leading-[0.95] tracking-mega" style={{ fontSize: 'clamp(1.9rem,5vw,4rem)' }}>
          Construimos el lugar<br /><span className="grad-text">donde tu familia será feliz</span>
        </h1>
        <p className="text-white/65 max-w-xl mx-auto mt-4 text-sm sm:text-base">
          Una experiencia inmersiva por 30 años de arquitectura, diseño e innovación.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
          <a href="#proyectos" className="btn-grad px-7 py-3.5 text-sm">Ver proyectos</a>
          <a href={waLink()} target="_blank" rel="noopener" className="btn-glass px-7 py-3.5 text-sm">
            <MessageCircle size={17} /> Hablar con un asesor
          </a>
        </div>
      </motion.div>

      <motion.a href="#trayectoria"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-1.5 text-white/55 hover:text-white transition-colors"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} aria-label="Bajar">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown size={18} />
      </motion.a>
    </header>
  )
}
