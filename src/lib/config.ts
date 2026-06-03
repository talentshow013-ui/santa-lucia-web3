export const CONTACT = {
  empresa: 'Constructora Santa Lucía S.A.S.',
  slogan: 'Calidad, innovación y experiencia en cada proyecto',
  whatsapp: '573185008335',
  whatsappMsg: 'Hola, quiero información sobre sus proyectos',
  phone: '+57 318 500 8335',
  phoneDial: 'tel:+573185008335',
  email: 'direccioncomercial@constructorasantalucia.com',
  ciudades: 'Neiva, Huila · Bogotá',
  horarioSemana: 'Lun a Vie: 7:30am–12:00m / 1:30pm–6:00pm',
  horarioSabado: 'Sábados: 9:30am–12:00m / 2:30pm–5:30pm',
  facebook: 'https://www.facebook.com/SantaLuciaConstructora/',
  instagram: 'https://www.instagram.com/constructorasantalucia/',
  sitio: 'https://www.constructorasantalucia.com/',
  politicaDatos: 'https://www.constructorasantalucia.com/wp-content/uploads/2025/10/GE-DO-013-Politica-de-Tratamiento-de-Datos.pdf',
}

export const waLink = (msg?: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg || CONTACT.whatsappMsg)}`

/* HERO: ruta de un video del equipo (IA imagen->video o clip real). Vacío = foto animada. */
export const HERO_VIDEO = ''

/* INTEGRACIÓN BACKEND — conectar después.
   LEADS_ENDPOINT: POST del formulario.  Si null, cae a WhatsApp. */
export const INTEGRATION = {
  LEADS_ENDPOINT: null as string | null,
}

export async function enviarLead(data: Record<string, string>) {
  if (INTEGRATION.LEADS_ENDPOINT) {
    const r = await fetch(INTEGRATION.LEADS_ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    })
    if (!r.ok) throw new Error('No se pudo enviar')
    return r.json().catch(() => ({}))
  }
  const msg = `Nuevo contacto web:\nNombre: ${data.nombre || ''}\nTel: ${data.telefono || ''}\nEmail: ${data.email || ''}\nInterés: ${data.interes || ''}\nMensaje: ${data.mensaje || ''}`
  window.open(waLink(msg), '_blank')
  return { ok: true, fallback: true }
}
