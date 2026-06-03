# Constructora Santa Lucía — WEB 3 (experiencia 3D cinematográfica)

Tercera propuesta, la más distinta: **hero 3D inmersivo** (cubo rotando) + estética **editorial de lujo** con transiciones tipo "cambio de pantalla" (dark/light alternados).
Carpeta: `CONSTRUCTORA SANTA LUCIA/web 3/`

- **GitHub:** https://github.com/talentshow013-ui/santa-lucia-web3
- **Vercel (live):** https://santa-lucia-web3.vercel.app

## Qué es
Sitio premium con un hero protagonista: un **cubo 3D que rota** mostrando los proyectos en sus caras, una **banda gigante "CONSTRUCTORA SANTA LUCÍA" que corre**, glow azul→rojo de marca, y una **familia en primer plano**. De ahí para abajo, secciones muy distintas a web 1 y web 2. Es **solo FRONTEND**.

## Stack
- **React 18 + TypeScript + Vite**
- **Tailwind CSS v3** (`tailwind.config.js` + `src/index.css`)
- **Framer Motion** (clip-reveal, parallax, word-reveal, count-up, crossfades)
- **lucide-react** (iconos)
- Fuentes: **Cinzel** (display, lujo) + Josefin Sans + Inter

## Paleta
- Hero/secciones oscuras: `night #0a0e1a` / `coal #0f1422`
- Secciones claras: `cream #F7F5F0`
- Marca: azul `#1668E3` + rojo `#f70c43` (gradiente `--grad`), acento gold `#c9a86a`
- Ritmo dark→light→dark→light = sensación de "cambio de pantalla"

## Secciones (orden en src/App.tsx)
1. **Hero 3D inmersivo** — una SALA en perspectiva (estás adentro): el texto "CONSTRUCTORA SANTA LUCÍA" corre por las paredes, neón azul→rojo en las uniones, marcos de luz en el techo y la familia en el centro. CSS en `index.css` (`.imr`, `.imr-room`, `.imr-surface`, `.imr-band`, keyframes `bandScroll`/`neonShift`/`text-glow`). La familia se sube en `/img/familia.png` (PNG sin fondo); si no existe, el centro queda limpio.
2. **Trayectoria** (oscura) — 30 años, contadores animados (LOGROS) + timeline de **proyectos entregados** (TRAYECTORIA, datos placeholder)
3. **Proyectos** (clara) — showcase con selector lateral + panel destacado con crossfade → abre **ProjectModal**
4. **Servicios** (oscura) — acordeón editorial con números gigantes (6 pilares) + ticker de fondo
5. **Calculadoras** (clara) — 4 simuladores con tabs (crédito, subsidio, inversión/ROI, capacidad)
6. **Equipo** (clara) — grid con grayscale→color al hover
7. **Testimonios** (oscura) — scroll horizontal con tipografía editorial grande
8. **Contacto** (clara) — formulario (Ley 1581) + footer con logo + WhatsApp flotante

## Hero 3D — cómo se configura (src/data.ts → HERO)
- `HERO.faces`: las 4 caras del cubo (imagen + nombre + ciudad de cada proyecto)
- `HERO.familyImg`: ruta del PNG de la familia (`/img/familia.png`). Si no existe, muestra un fallback elegante con la indicación de qué subir
- El CSS completo del cubo está en `src/index.css` (`.hero3d`, `.scene3d`, `.cube3d`, `.wordband`, `.hue`, keyframes `spinCube`/`bandLeft`/`bandRight`)

## ProjectModal (propio)
`src/components/ProjectModal.tsx`. Tabs: **Galería** (carrusel) · **Recorrido 3D** (placeholder, const `EMBED_3D`) · **Ubicación** (Google Maps embed) · **Simulador** de crédito. Sidebar con características, amenidades y CTAs (WhatsApp / Agendar).

## Datos y configuración
- `src/data.ts` — PROYECTOS, HERO, TRAYECTORIA + LOGROS (nuevos), SERVICIOS, EQUIPO, TESTIMONIOS, helpers
- `src/lib/config.ts` — CONTACT, `waLink()`, `enviarLead()`, `INTEGRATION.LEADS_ENDPOINT` (null → WhatsApp), `HERO_VIDEO`
- `src/components/ProjectModal.tsx` — `EMBED_3D` (tour 3D)

## Imágenes
`public/img/` — mismas fotos reales que web/web2. Carpetas por proyecto creadas en `public/img/proyectos/<proyecto>/` para las imágenes realistas que se van a generar.
Pendiente: `public/img/familia.png` (familia feliz, PNG sin fondo) para el hero.

## Cómo correr
```
cd "web 3"
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
```
O doble clic a **`INICIAR SITIO.bat`**.

## Herramientas usadas
- Skill `ui-ux-pro-max` (dirección: Exaggerated Minimalism + patrón inmersivo + Cinzel/Josefin)
- Hero 3D adaptado del componente "3D poem animation" (cubo + banda + figura + hue), reescrito y tematizado
- Framer Motion para todas las animaciones
- Playwright (verificación visual)

## Pendiente / siguiente
- **Imágenes realistas por proyecto** (galerías) → `public/img/proyectos/<proyecto>/`
- **`familia.png`** para el hero (PNG sin fondo)
- **Proyectos entregados reales** en `TRAYECTORIA` (hoy placeholder)
- **Tour 3D real** en `EMBED_3D`
- Es solo FRONTEND; backend/APIs los conecta el cliente
