import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero3D from './components/Hero3D'
import Trayectoria from './components/Trayectoria'
import Proyectos from './components/Proyectos'
import Servicios from './components/Servicios'
import Calculadoras from './components/Calculadoras'
import Equipo from './components/Equipo'
import Testimonios from './components/Testimonios'
import Contacto from './components/Contacto'
import { waLink } from './lib/config'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero3D />
        <Trayectoria />
        <Proyectos />
        <Servicios />
        <Calculadoras />
        <Equipo />
        <Testimonios />
        <Contacto />
      </main>

      <motion.a
        href={waLink()} target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp"
        className="fixed bottom-5 right-5 z-[70] w-14 h-14 rounded-full grid place-items-center text-white shadow-2xl"
        style={{ background: '#25D366' }}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
      >
        <MessageCircle size={26} />
      </motion.a>
    </>
  )
}
