import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import { waLink } from '../lib/config'

const LINKS = [
  { href: '#trayectoria', label: 'Trayectoria' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#calculadoras', label: 'Calculadoras' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solid ? 'bg-night/85 backdrop-blur-xl border-b border-white/10 py-3' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3">
            <img src="/img/logo.webp" alt="Constructora Santa Lucía" className="h-9 sm:h-10 w-auto brightness-0 invert" />
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-white/75 hover:text-white text-sm tracking-wide transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brand-red group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={waLink()} target="_blank" rel="noopener" className="hidden sm:inline-flex btn-grad px-5 py-2.5 text-sm">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <button onClick={() => setOpen(true)} className="md:hidden text-white p-2" aria-label="Abrir menú">
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-night/97 backdrop-blur-xl flex flex-col"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="flex justify-between items-center px-5 py-5">
              <img src="/img/logo.webp" alt="Constructora Santa Lucía" className="h-9 w-auto brightness-0 invert" />
              <button onClick={() => setOpen(false)} className="text-white p-2" aria-label="Cerrar menú"><X size={28} /></button>
            </div>
            <nav className="flex-1 flex flex-col justify-center gap-2 px-8">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="font-display text-white text-4xl py-2 tracking-mega"
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * i }}
                >
                  {l.label}
                </motion.a>
              ))}
              <a href={waLink()} target="_blank" rel="noopener" onClick={() => setOpen(false)} className="btn-grad px-7 py-4 text-base mt-8 justify-center">
                <MessageCircle size={18} /> Hablar por WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
