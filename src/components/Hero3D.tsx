import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, MessageCircle } from 'lucide-react'
import { HERO } from '../data'
import { waLink } from '../lib/config'

const BAND = 'CONSTRUCTORA SANTA LUCÍA · '

export default function Hero3D() {
  const [familyOk, setFamilyOk] = useState(true)

  return (
    <header className="hero3d" id="inicio">
      <div className="hue" aria-hidden="true" />

      {/* banda de texto corriendo */}
      <div className="wordband top" aria-hidden="true">{BAND.repeat(6)}</div>
      <div className="wordband bottom fill" aria-hidden="true">{BAND.repeat(6)}</div>

      {/* bloque de titular */}
      <motion.div
        className="absolute left-0 right-0 top-[14vh] sm:top-[16vh] z-[6] px-6 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-white/5 backdrop-blur text-white/80 text-[11px] sm:text-xs tracking-[0.3em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" /> 30 años de experiencia
        </span>
        <h1 className="font-display font-black text-white leading-[0.95] tracking-mega mt-5" style={{ fontSize: 'clamp(1.9rem,5.2vw,4.4rem)' }}>
          Construimos el lugar<br />
          <span className="grad-text">donde tu familia será feliz</span>
        </h1>
        <p className="text-white/65 max-w-xl mx-auto mt-4 text-sm sm:text-base">
          Arquitectura, diseño e innovación en Neiva y Bogotá. Explora nuestros proyectos en una experiencia inmersiva.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
          <a href="#proyectos" className="btn-grad px-7 py-3.5 text-sm">Ver proyectos</a>
          <a href={waLink()} target="_blank" rel="noopener" className="btn-glass px-7 py-3.5 text-sm">
            <MessageCircle size={17} /> Hablar con un asesor
          </a>
        </div>
      </motion.div>

      {/* escena 3D */}
      <div className="scene3d" role="img" aria-label="Cubo rotando con los proyectos de Constructora Santa Lucía">
        <div className="floor" aria-hidden="true" />
        <div className="cube3d">
          {HERO.faces.map((f, i) => (
            <div key={i} className={`cface ${['front', 'right', 'back', 'left'][i]}`}>
              <img src={f.img} alt={`Proyecto ${f.nombre} en ${f.ciudad}`} loading="eager" />
              <span className="clabel">{f.nombre}<small>{f.ciudad}</small></span>
            </div>
          ))}
          <div className="cface top" aria-hidden="true" />
          <div className="cface bottom" aria-hidden="true" />
        </div>
      </div>

      {/* familia en primer plano */}
      {familyOk ? (
        <img
          className="family"
          src={HERO.familyImg}
          alt="Familia feliz frente a su nuevo hogar"
          onError={() => setFamilyOk(false)}
        />
      ) : (
        <div className="family-fallback" aria-hidden="true">
          <div className="mx-auto mb-2 h-px w-40 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          Aquí va la familia · sube <b className="text-white/80">/img/familia.png</b> (PNG sin fondo)
        </div>
      )}

      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {/* cue de scroll */}
      <motion.a
        href="#trayectoria"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[6] flex flex-col items-center gap-2 text-white/55 hover:text-white transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        aria-label="Bajar"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown size={18} />
      </motion.a>
    </header>
  )
}
