import { useState } from 'react'
import { Phone, Mail, Clock, MapPin, ShieldCheck, Send, CheckCircle2, Instagram, Facebook } from 'lucide-react'
import { FadeIn } from './primitives'
import { CONTACT, enviarLead, waLink } from '../lib/config'

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', interes: '', mensaje: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const set = (k: string) => (e: any) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    try { await enviarLead(form); setSent(true) } catch { alert('No se pudo enviar. Intenta por WhatsApp.') } finally { setLoading(false) }
  }

  return (
    <section id="contacto" className="scene-light px-5 sm:px-8 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto rounded-[40px] sm:rounded-[56px] grad-vibrant p-[3px] shadow-[0_50px_120px_-40px_rgba(247,12,67,.5)]">
        <div className="rounded-[37px] sm:rounded-[53px] bg-white px-6 sm:px-12 py-12 sm:py-16">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <FadeIn>
              <span className="chip">Tu nuevo hogar te espera</span>
              <h2 className="font-display font-black leading-[0.95] tracking-mega mt-4 mb-5" style={{ fontSize: 'clamp(2.2rem,7vw,5rem)' }}>
                Hablemos
              </h2>
              <p className="text-slate-500 text-base sm:text-lg mb-8">Déjanos tus datos y un asesor te contacta en menos de 24 horas. O escríbenos directo por WhatsApp.</p>
              <div className="grid gap-4">
                <a href={CONTACT.phoneDial} className="flex items-center gap-4 group"><span className="w-11 h-11 rounded-xl grid place-items-center shrink-0" style={{ background: 'rgba(22,104,227,.1)' }}><Phone size={20} className="text-brand-blue" /></span><span><b className="font-display block">{CONTACT.phone}</b><span className="text-slate-400 text-sm">Llámanos o escríbenos</span></span></a>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4"><span className="w-11 h-11 rounded-xl grid place-items-center shrink-0" style={{ background: 'rgba(22,104,227,.1)' }}><Mail size={20} className="text-brand-blue" /></span><span><b className="font-display block break-all text-sm sm:text-base">{CONTACT.email}</b><span className="text-slate-400 text-sm">Escríbenos un correo</span></span></a>
                <div className="flex items-center gap-4"><span className="w-11 h-11 rounded-xl grid place-items-center shrink-0" style={{ background: 'rgba(22,104,227,.1)' }}><Clock size={20} className="text-brand-blue" /></span><span><b className="font-display block">{CONTACT.horarioSemana}</b><span className="text-slate-400 text-sm">{CONTACT.horarioSabado}</span></span></div>
                <div className="flex items-center gap-4"><span className="w-11 h-11 rounded-xl grid place-items-center shrink-0" style={{ background: 'rgba(22,104,227,.1)' }}><MapPin size={20} className="text-brand-blue" /></span><span><b className="font-display block">{CONTACT.ciudades}</b><span className="text-slate-400 text-sm">Cobertura en Colombia</span></span></div>
              </div>
              <div className="mt-7 flex gap-3">
                <a href={CONTACT.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="w-11 h-11 rounded-full border border-slate-200 grid place-items-center hover:bg-night hover:text-white transition-colors"><Facebook size={18} /></a>
                <a href={CONTACT.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="w-11 h-11 rounded-full border border-slate-200 grid place-items-center hover:bg-night hover:text-white transition-colors"><Instagram size={18} /></a>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              {sent ? (
                <div className="bg-cream rounded-3xl p-10 text-center">
                  <CheckCircle2 size={64} className="text-brand-blue mx-auto" />
                  <h3 className="font-display font-bold text-2xl mt-4 mb-2">¡Mensaje enviado!</h3>
                  <p className="text-slate-500">Un asesor de Santa Lucía te contactará muy pronto.</p>
                  <button onClick={() => { setSent(false); setForm({ nombre: '', email: '', telefono: '', interes: '', mensaje: '' }) }} className="btn-outline-ink px-6 py-3 text-sm mt-6">Enviar otro</button>
                </div>
              ) : (
                <form onSubmit={submit} className="bg-cream rounded-3xl p-6 sm:p-8">
                  <div className="grid gap-4">
                    <div><label className="block text-slate-500 font-semibold text-xs mb-2">Nombre completo</label><input className="field" required value={form.nombre} onChange={set('nombre')} placeholder="Tu nombre" /></div>
                    <div><label className="block text-slate-500 font-semibold text-xs mb-2">Correo electrónico</label><input type="email" className="field" required value={form.email} onChange={set('email')} placeholder="correo@ejemplo.com" /></div>
                    <div><label className="block text-slate-500 font-semibold text-xs mb-2">Teléfono / WhatsApp</label><input type="tel" className="field" required value={form.telefono} onChange={set('telefono')} placeholder="300 000 0000" /></div>
                    <div><label className="block text-slate-500 font-semibold text-xs mb-2">¿Qué te interesa?</label>
                      <select className="field cursor-pointer" value={form.interes} onChange={set('interes')}>
                        <option value="">Selecciona</option><option>Comprar vivienda</option><option>Invertir</option><option>Subsidios</option><option>Agendar visita</option>
                      </select>
                    </div>
                    <div><label className="block text-slate-500 font-semibold text-xs mb-2">Mensaje</label><textarea className="field" rows={3} value={form.mensaje} onChange={set('mensaje')} placeholder="Cuéntanos qué buscas..." /></div>
                    <button type="submit" disabled={loading} className="btn-grad px-8 py-4 text-sm w-full justify-center disabled:opacity-60">
                      {loading ? 'Enviando…' : <>Quiero que me contacten <Send size={17} /></>}
                    </button>
                    <p className="text-slate-400 text-xs leading-relaxed flex gap-2"><ShieldCheck size={26} className="text-brand-blue shrink-0" /> Tus datos se tratan conforme a la <b className="text-slate-600">Ley 1581 de 2012</b> y nuestra <a href={CONTACT.politicaDatos} target="_blank" rel="noopener" className="text-brand-blue underline">Política de Datos</a>. Solo para gestionar tu solicitud.</p>
                  </div>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </div>

      <footer className="max-w-6xl mx-auto mt-16 pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-sm">
        <img src="/img/logo.webp" alt="Constructora Santa Lucía" className="h-9 w-auto" />
        <span>© {new Date().getFullYear()} {CONTACT.empresa} · {CONTACT.ciudades}</span>
        <a href={waLink()} target="_blank" rel="noopener" className="text-brand-blue font-semibold">WhatsApp</a>
      </footer>
    </section>
  )
}
