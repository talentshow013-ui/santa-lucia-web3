export const fmtCOP = (n: number) => '$' + Math.round(n).toLocaleString('es-CO')
export const fmtCOPshort = (n: number) => {
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(n % 1e9 === 0 ? 0 : 1) + ' mil M'
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(0) + ' M'
  return fmtCOP(n)
}

export interface Proyecto {
  id: string; nombre: string; ciudad: string; ciudadId: string; estado: string
  precioDesde: number; habitaciones: number; banos: number; areaDesde: number
  cliente: string; descripcion: string; img: string; galeria: string[]; subsidio: boolean; url: string
}

const GEN = ['/img/about.webp', '/img/faq.webp', '/img/banner.webp']

export const PROYECTOS: Proyecto[] = [
  {
    id: 'altos-de-la-colina', nombre: 'Altos de la Colina', ciudad: 'Neiva', ciudadId: 'neiva', estado: 'En venta',
    precioDesde: 185000000, habitaciones: 3, banos: 2, areaDesde: 62, cliente: 'Vivienda',
    descripcion: 'Apartamentos con vista privilegiada en un sector residencial en crecimiento de Neiva. Espacios funcionales, luz natural y zonas comunes para la familia.',
    img: '/img/proyecto-altos.webp', galeria: ['/img/proyecto-altos.webp', ...GEN], subsidio: true,
    url: 'https://www.constructorasantalucia.com/project/altos-de-la-colina/',
  },
  {
    id: 'dos-maderos', nombre: 'Dos Maderos', ciudad: 'Neiva', ciudadId: 'neiva', estado: 'En venta',
    precioDesde: 210000000, habitaciones: 3, banos: 2, areaDesde: 70, cliente: 'Vivienda',
    descripcion: 'Diseño contemporáneo y calidez para familias que buscan ubicación, comodidad y valorización en Neiva.',
    img: '/img/proyecto-dosmaderos.jpg', galeria: ['/img/proyecto-dosmaderos.jpg', ...GEN], subsidio: true,
    url: 'https://www.constructorasantalucia.com/project/dos-maderos/',
  },
  {
    id: 'edificio-prados', nombre: 'Edificio Prados', ciudad: 'Neiva', ciudadId: 'neiva', estado: 'Preventa',
    precioDesde: 168000000, habitaciones: 2, banos: 2, areaDesde: 54, cliente: 'Preventa',
    descripcion: 'Vivienda nueva en preventa con excelentes condiciones de pago. Aplica para subsidios y financiación con entidades aliadas.',
    img: '/img/proyecto-prados.jpg', galeria: ['/img/proyecto-prados.jpg', ...GEN], subsidio: true,
    url: 'https://www.constructorasantalucia.com/project/edificio-prados/',
  },
  {
    id: 'street-52', nombre: 'Street 52', ciudad: 'Bogotá', ciudadId: 'bogota', estado: 'En venta',
    precioDesde: 320000000, habitaciones: 2, banos: 2, areaDesde: 48, cliente: 'Inversión',
    descripcion: 'Proyecto urbano en Bogotá con diseño moderno y ubicación estratégica, ideal para inversión y para vivir cerca de todo.',
    img: '/img/proyecto-street52.png', galeria: ['/img/proyecto-street52.png', ...GEN], subsidio: false,
    url: 'https://www.constructorasantalucia.com/project/street-5/',
  },
]

export const MARQUEE_IMGS = [
  '/img/proyecto-altos.webp', '/img/about.webp', '/img/proyecto-dosmaderos.jpg', '/img/faq.webp',
  '/img/proyecto-prados.jpg', '/img/banner.webp', '/img/proyecto-street52.png', '/img/hero.webp',
]

export const SERVICIOS = [
  { n: '01', nombre: 'Arquitectura', desc: 'Diseñamos espacios funcionales y estéticos que aprovechan luz, ventilación y metros útiles, cumpliendo la normativa y el contexto de cada proyecto.' },
  { n: '02', nombre: 'Diseño', desc: 'Integramos tendencias actuales con criterios de sostenibilidad y viabilidad técnica para resolver un amplio espectro de proyectos.' },
  { n: '03', nombre: 'Construcción especializada', desc: 'Equipo profesional y procesos controlados: cronogramas, costos, calidad y seguridad en obra para resultados consistentes.' },
  { n: '04', nombre: 'Innovación', desc: 'Mejora continua y nuevas tecnologías constructivas para entregar obras eficientes, durables y con alto desempeño.' },
  { n: '05', nombre: 'Acompañamiento', desc: 'De la asesoría a la entrega: subsidios, financiación y postventa. Te acompañamos en cada paso hacia tu nuevo hogar.' },
]

export const EQUIPO = [
  { nombre: 'Gloria Tamayo', rol: 'Directora Comercial', foto: '/img/team-gloria.webp' },
  { nombre: 'Jaime Tamayo', rol: 'Ejecutivo Comercial', foto: '/img/team-jaime.webp' },
  { nombre: 'Catalina Rodríguez', rol: 'Ejecutiva Comercial', foto: '/img/team-catalina.webp' },
  { nombre: 'Brigitte Ceballos', rol: 'Asistente de Ventas', foto: '/img/team-brigitte.webp' },
]

export const TESTIMONIOS = [
  { texto: 'Gracias a Constructora Santa Lucía encontramos el hogar perfecto. El acompañamiento fue impecable, desde la asesoría hasta la entrega.', autor: 'Familia Gómez', rol: 'Compradores' },
  { texto: 'Su compromiso con la calidad y los tiempos de entrega me dieron total confianza. Rentabilidad, cumplimiento y respaldo.', autor: 'Inversionista Local', rol: 'Inversión' },
  { texto: 'Atención personalizada y transparencia en cada etapa. Santa Lucía no solo construye viviendas, construye tranquilidad.', autor: 'Familia Rodríguez', rol: 'Compradores' },
  { texto: 'Desde el primer contacto sentimos confianza. Entregaron un proyecto que superó nuestras expectativas, con excelente diseño.', autor: 'Familia Herrera', rol: 'Compradores' },
]

/* HERO 3D — caras del cubo (fotos de proyectos) e imagen de la familia.
   familyImg: PNG con fondo transparente de una familia feliz mirando.
   Si está vacío o no existe, el hero muestra un fallback elegante. */
export const HERO = {
  familyImg: '/img/familia.png',
  faces: [
    { img: '/img/proyecto-altos.webp', nombre: 'Altos de la Colina', ciudad: 'Neiva' },
    { img: '/img/proyecto-dosmaderos.jpg', nombre: 'Dos Maderos', ciudad: 'Neiva' },
    { img: '/img/proyecto-prados.jpg', nombre: 'Edificio Prados', ciudad: 'Neiva' },
    { img: '/img/proyecto-street52.png', nombre: 'Street 52', ciudad: 'Bogotá' },
  ],
}

/* TRAYECTORIA — proyectos YA entregados (30 años de respaldo).
   PLACEHOLDER: reemplaza con los reales (nombre, año, ciudad, tipo, unidades, img). */
export interface Entregado {
  nombre: string; anio: string; ciudad: string; tipo: string; unidades: string; img?: string
}
export const TRAYECTORIA: Entregado[] = [
  { nombre: 'Conjunto Reservado A', anio: '2021', ciudad: 'Neiva', tipo: 'Apartamentos', unidades: '+80 unidades', img: '/img/about.webp' },
  { nombre: 'Conjunto Reservado B', anio: '2018', ciudad: 'Neiva', tipo: 'Casas', unidades: '+40 casas', img: '/img/banner.webp' },
  { nombre: 'Torre Comercial C', anio: '2015', ciudad: 'Neiva', tipo: 'Locales + oficinas', unidades: '+30 locales', img: '/img/faq.webp' },
  { nombre: 'Urbanización D', anio: '2011', ciudad: 'Neiva', tipo: 'Vivienda VIS', unidades: '+120 familias', img: '/img/hero.webp' },
]

export const LOGROS = [
  { n: 30, suf: '+', label: 'Años de experiencia' },
  { n: 2000, suf: '+', label: 'Familias con hogar propio' },
  { n: 25, suf: '+', label: 'Proyectos entregados' },
  { n: 2, suf: '', label: 'Ciudades: Neiva y Bogotá' },
]
