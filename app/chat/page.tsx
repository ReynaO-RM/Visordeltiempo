"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Stack,
  Paper,
  Button,
  Typography,
  Divider,
  Tabs,
  Tab,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import HeaderAuth from "../sections/home/components/header-auth";

// ====== Tipos ======
type Faq = {
  id: string;
  question: string;
  answer: string;
  category:
    | "Lugares"
    | "Horarios/Costos"
    | "Cómo llegar"
    | "Experiencia"
    | "Reseñas/Calificaciones"
    | "Accesibilidad"
    | "Tips locales";
  tags: string[]; // para búsqueda (lugares, conceptos)
  followUps?: string[]; // sugerencias de seguimiento (texto humano)
  linkHref?: string; // opcional a /visita/[slug]
};

type Msg = {
  sender: "user" | "bot";
  text: string;
  linkHref?: string;
  followUps?: string[];
  loading?: boolean;
};

// ====== Data ======
const FAQS: Faq[] = [
  // Lugares (top 5)
  {
    id: "lug-tula",
    question: "¿Qué son los Atlantes de Tula y por qué son famosos?",
    category: "Lugares",
    tags: ["tula", "atlantes", "tolteca", "arqueología"],
    linkHref: "/visita/tula-atlantes",
    answer:
      "Los Atlantes de Tula son cuatro esculturas monolíticas de ~4.5 m talladas en basalto, que representaban guerreros toltecas. Estaban sobre la Pirámide B y sostenían la techumbre del templo. Son ícono de la antigua Tollan-Xicocotitlan.",
    followUps: [
      "Horarios y costos para Atlantes de Tula",
      "¿Cómo llegar a Tula de Allende desde CDMX?",
      "¿Se permiten fotos y video en los sitios?",
    ],
  },
  {
    id: "lug-reloj",
    question: "¿Qué tiene de especial el Reloj Monumental de Pachuca?",
    category: "Lugares",
    tags: ["reloj", "pachuca", "centro", "carillón"],
    linkHref: "/visita/reloj-monumental",
    answer:
      "Es un ícono porfiriano con carillón y relieves cívicos. Sus cuatro caras permiten verlo desde distintos puntos del centro. Por la noche luce iluminado y la plaza es ideal para fotos y cafés cercanos.",
    followUps: [
      "Horarios del Reloj",
      "Horarios del Reloj Monumental y visita guiada",
    ],
  },
  {
    id: "lug-real",
    question: "¿Qué ver en el Antiguo Distrito Minero de Real del Monte?",
    category: "Lugares",
    tags: ["real del monte", "mina", "pastes", "museo"],
    linkHref: "/visita/distrito-minero",
    answer:
      "Calles empedradas, casonas con influencia inglesa, pastes tradicionales y minas turísticas como la Mina de Acosta. Hay miradores espectaculares y museos de sitio.",
    followUps: [
      "Horarios de minas turísticas en Real del Monte",
      "Clima en Real del Monte",
      "¿Dónde comer pastes?",
    ],
  },
  {
    id: "lug-exconvento",
    question: "¿Qué hay en el Templo y Exconvento de San Francisco?",
    category: "Lugares",
    tags: ["exconvento", "museo fotografía", "novohispano"],
    linkHref: "/visita/exconvento-san-francisco",
    answer:
      "Conjunto del siglo XVI con estilos plateresco/barroco. Alberga el Museo Nacional de la Fotografía y el archivo histórico. Excelente para amantes del arte y arquitectura.",
    followUps: [
      "Horarios del museo",
      "¿Se permite flash?",
      "¿Hay tienda o librería?",
    ],
  },
  {
    id: "lug-estadio",
    question: "¿Cómo es la experiencia en el Estadio Hidalgo?",
    category: "Lugares",
    tags: ["estadio", "pachuca", "tuzos", "fútbol"],
    linkHref: "/visita/estadio-hidalgo",
    answer:
      "Ambiente familiar y gran visibilidad desde las gradas. Es la casa de los Tuzos (inaugurado en 1993). En días sin partido puede haber tours y tienda oficial.",
    followUps: [
      "Calendario de partidos",
      "Cómo llegar en auto",
      "¿Hay tours guiados?",
    ],
  },

  // Horarios / Costos
  {
    id: "hor-tula",
    question: "Horarios y costos para Atlantes de Tula",
    category: "Horarios/Costos",
    tags: ["tula", "atlantes", "horario", "precio", "zona arqueológica"],
    linkHref: "/visita/tula-atlantes",
    answer:
      "Abierto de 9:00 a 17:00 aprox. (último acceso recomendado 16:00). Entrada general ~$95 MXN; estudiantes/profesores con credencial pueden tener descuentos oficiales. Verifica cambios en feriados.",
  },
  {
    id: "hor-reloj",
    question: "Horarios del Reloj Monumental y visita guiada",
    category: "Horarios/Costos",
    tags: ["reloj", "horario", "mirador", "tour"],
    linkHref: "/visita/reloj-monumental",
    answer:
      "La plaza es pública 24/7. Las visitas guiadas/ingreso al interior del reloj (si disponibles) suelen operar de 10:00–18:00; consulta en el módulo local por días y cupos.",
  },
  {
    id: "hor-mina",
    question: "Horarios de minas turísticas en Real del Monte",
    category: "Horarios/Costos",
    tags: ["real del monte", "mina", "horario", "precio", "acosta"],
    linkHref: "/visita/distrito-minero",
    answer:
      "Generalmente 9:00–17:00. La Mina de Acosta ofrece recorridos con guía cada cierto tiempo. Costos orientativos $80–$150 MXN. Lleva chamarra ligera.",
  },

  // Cómo llegar
  {
    id: "arr-tula",
    question: "¿Cómo llegar a Tula de Allende desde CDMX?",
    category: "Cómo llegar",
    tags: ["tula", "cómo llegar", "camión", "auto", "cdmx"],
    answer:
      "En auto: ~1.5–2 h por la México–Querétaro y desvío a Tula. En bus: desde Observatorio o Norte a Tula/Tlahuelilpan; al llegar, taxi/local a la zona arqueológica.",
  },
  {
    id: "arr-pachuca",
    question: "¿Cómo llegar al centro de Pachuca y al Reloj?",
    category: "Cómo llegar",
    tags: ["pachuca", "reloj", "cómo llegar", "terminal", "uber"],
    answer:
      "En auto: México–Pachuca (MEX85D) ~1.5 h. En bus: Central del Norte → Pachuca CAPU. Desde la terminal, taxi/uber al centro (~10–15 min).",
  },

  // Experiencia
  {
    id: "exp-fotos",
    question: "¿Se permiten fotos y video en los sitios?",
    category: "Experiencia",
    tags: ["fotos", "video", "drone", "museo", "flash"],
    answer:
      "Fotos personales sin flash casi siempre ok. En museos, flash y tripiés suelen estar restringidos. Drones requieren permiso y no están permitidos en la mayoría de zonas arqueológicas.",
  },
  {
    id: "exp-mejor-epoca",
    question: "¿Cuál es la mejor época para visitar?",
    category: "Experiencia",
    tags: ["clima", "temporada", "mejor época", "lluvia"],
    answer:
      "Primavera y otoño ofrecen clima templado. Real del Monte es fresco casi todo el año; lleva suéter. Si no te gustan multitudes, evita puentes y vacaciones largas.",
  },

  // Reseñas / Calificaciones
  {
    id: "rev-puedo",
    question: "¿Puedo dejar una reseña sin cuenta?",
    category: "Reseñas/Calificaciones",
    tags: ["reseña", "opinión", "calificar", "cuenta", "login"],
    answer:
      "Para calificar u opinar necesitas iniciar sesión. Las reseñas anónimas no están habilitadas para evitar spam y cuidar la calidad.",
  },
  {
    id: "rev-como",
    question: "¿Cómo califico un lugar y dejo un comentario?",
    category: "Reseñas/Calificaciones",
    tags: ["reseña", "opinión", "ui", "tutorial"],
    answer:
      "En la página del lugar verás la sección “Calificar y opinar”. Inicia sesión, elige tu rating (1–5) y escribe tu comentario. Al enviar, se actualiza la lista de opiniones.",
  },

  // Accesibilidad
  {
    id: "acc-general",
    question:
      "¿Qué tan accesibles son los lugares para personas con movilidad reducida?",
    category: "Accesibilidad",
    tags: ["accesibilidad", "rampas", "silla de ruedas"],
    answer:
      "Centros urbanos (Reloj, Exconvento) tienen mejores rampas y superficies planas. Zonas arqueológicas y minas pueden tener pendientes, caminos irregulares o escaleras; revisa recorridos cortos y asistencia.",
  },

  // Tips locales
  {
    id: "tips-comida",
    question: "¿Qué comer cerca de cada lugar?",
    category: "Tips locales",
    tags: ["comida", "pastes", "café", "antojitos"],
    answer:
      "Cerca del Reloj: cafés y antojitos en el centro. Real del Monte: pastes tradicionales (carnes, papa, frijol), panes y ates. En Tula: antojitos y mercados típicos; hidrátate bien si hace calor.",
  },
  {
    id: "tips-seguridad",
    question: "Consejos de seguridad y qué llevar",
    category: "Tips locales",
    tags: ["seguridad", "qué llevar", "ropa", "soleado"],
    answer:
      "Calzado cómodo, gorra y bloqueador (especialmente en Tula). En clima fresco, suéter para Real del Monte. Lleva efectivo para entradas pequeñas y propinas. Mantén atención a objetos personales.",
  },

  // ---- LUGARES extra ----
  {
    id: "lug-huasca",
    question: "¿Qué puedo hacer en Huasca de Ocampo?",
    category: "Lugares",
    tags: ["huasca", "bosque", "prismas", "turismo", "pueblo mágico"],
    answer:
      "Huasca de Ocampo es uno de los Pueblos Mágicos más encantadores de Hidalgo. Puedes visitar los Prismas Basálticos, la Hacienda de Santa María Regla, hacer senderismo en bosques, o disfrutar cabañas con chimenea.",
  },
  {
    id: "lug-basalticos",
    question: "¿Qué son los Prismas Basálticos?",
    category: "Lugares",
    tags: ["prismas", "basálticos", "huasca", "cascada", "naturaleza"],
    answer:
      "Formaciones naturales de columnas de basalto creadas por el enfriamiento del magma hace millones de años. Se ubican en Huasca de Ocampo, con cascadas y miradores fotogénicos.",
  },

  // ---- HORARIOS / COSTOS extra ----
  {
    id: "hor-exconvento",
    question: "Horarios y costo del Exconvento de San Francisco",
    category: "Horarios/Costos",
    tags: ["exconvento", "pachuca", "horarios", "museo fotografía", "entrada"],
    answer:
      "Abierto de martes a domingo de 10:00 a 18:00 h. Entrada general $60 MXN aprox. Domingos gratuito para residentes con identificación. El museo suele cerrar los lunes.",
  },
  {
    id: "hor-estadio",
    question: "¿Cuánto cuesta visitar el Estadio Hidalgo?",
    category: "Horarios/Costos",
    tags: ["estadio", "hidalgo", "tuzos", "precio", "tour"],
    answer:
      "Tours guiados rondan $100 MXN (vestidores, campo, museo). En días de partido, precios varían por rival y zona: ~$150–$600 MXN.",
  },

  // ---- CÓMO LLEGAR extra ----
  {
    id: "arr-real",
    question: "¿Cómo llegar a Real del Monte desde Pachuca?",
    category: "Cómo llegar",
    tags: ["real del monte", "pachuca", "camión", "transporte", "cómo llegar"],
    answer:
      "Desde Pachuca: transporte colectivo del centro (~25 min). En auto: carretera estatal 105 hacia Mineral del Monte.",
  },
  {
    id: "arr-huasca",
    question: "¿Cómo llegar a Huasca desde CDMX o Pachuca?",
    category: "Cómo llegar",
    tags: ["huasca", "prismas", "cómo llegar", "cdmx", "pachuca"],
    answer:
      "Desde CDMX: México–Pachuca y luego a Huasca (~2.5 h). Desde Pachuca: 35–40 min por la carretera estatal 105 siguiendo señalización a Huasca de Ocampo.",
  },

  // ---- EXPERIENCIA extra ----
  {
    id: "exp-comida-local",
    question: "¿Qué platillos típicos debo probar en Hidalgo?",
    category: "Experiencia",
    tags: ["comida", "gastronomía", "pastes", "barbacoa", "mixiote"],
    answer:
      "Imprescindibles: pastes (Real del Monte), barbacoa (Actopan/Tulancingo), mixiotes, escamoles y ximbo. Para postre, ates y pan casero.",
  },
  {
    id: "exp-fotos-mejores",
    question: "¿Dónde tomar las mejores fotos panorámicas?",
    category: "Experiencia",
    tags: ["fotografía", "miradores", "panorámica", "selfie"],
    answer:
      "Mirador de Prismas Basálticos, cerro en Real del Monte y Exconvento de San Francisco. También el Reloj por la noche.",
  },

  // ---- TIPS / LOCALES extra ----
  {
    id: "tips-clima",
    question: "¿Cómo es el clima en la región y qué ropa llevar?",
    category: "Tips locales",
    tags: ["clima", "ropa", "temporada", "viaje"],
    answer:
      "Clima templado a fresco. En Pachuca/Real del Monte suele refrescar por la tarde (lleva suéter). En Tula/Huasca usa bloqueador y gorra.",
  },
  {
    id: "tips-festividades",
    question: "¿Qué festividades o ferias locales hay durante el año?",
    category: "Tips locales",
    tags: ["festividades", "feria", "cultura", "eventos"],
    answer:
      "Feria de San Francisco (octubre, Pachuca), Festival del Paste (octubre, Real del Monte) y Feria de la Barbacoa (julio, Actopan). Revisa fechas cada año.",
  },
];

// Categorías para Tabs
const CATEGORIES: Array<{ key: Faq["category"]; label: string }> = [
  { key: "Lugares", label: "Lugares" },
  { key: "Horarios/Costos", label: "Horarios/Costos" },
  { key: "Cómo llegar", label: "Cómo llegar" },
  { key: "Experiencia", label: "Experiencia" },
  { key: "Reseñas/Calificaciones", label: "Reseñas/Calificaciones" },
  { key: "Accesibilidad", label: "Accesibilidad" },
  { key: "Tips locales", label: "Tips locales" },
];

// ====== Helpers de matching seguro ======
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

// Índice por texto exacto de pregunta
const QUESTION_INDEX: Record<string, Faq> = FAQS.reduce((acc, f) => {
  acc[normalize(f.question)] = f;
  return acc;
}, {} as Record<string, Faq>);

// Aliases para follow-ups “humanos” → id de FAQ
const FOLLOWUP_ALIASES: Record<string, string> = {
  [normalize("Horarios del Reloj")]: "hor-reloj",
  [normalize("Horario de minas")]: "hor-mina",
  [normalize("Horarios de minas turísticas en Real del Monte")]: "hor-mina",
  [normalize("Horarios del museo")]: "hor-exconvento",
  [normalize("¿Se permite flash?")]: "exp-fotos",
  [normalize("¿Hay tienda o librería?")]: "lug-exconvento",
  [normalize("Clima en Real del Monte")]: "tips-clima",
  [normalize("¿Dónde comer pastes?")]: "tips-comida",
  [normalize("Calendario de partidos")]: "hor-estadio",
  [normalize("Cómo llegar en auto")]: "arr-pachuca",
  [normalize("¿Hay tours guiados?")]: "hor-estadio",
};

// Búsqueda flexible (respaldo) — siempre retorna algo
function resolveFaqByText(text: string, category?: Faq["category"]) {
  const qn = normalize(text);

  // 1) Coincidencia exacta
  const exact = QUESTION_INDEX[qn];
  if (exact && (!category || exact.category === category)) return exact;

  // 2) Alias
  const aliasId = FOLLOWUP_ALIASES[qn];
  if (aliasId) {
    const a = FAQS.find((f) => f.id === aliasId);
    if (a) return a;
  }

  // 3) Scoring (pregunta + tags)
  const pool = category ? FAQS.filter((f) => f.category === category) : FAQS;
  const scored = pool
    .map((f) => ({
      f,
      score:
        (normalize(f.question).includes(qn) ? 2 : 0) +
        (f.tags.some((t) => normalize(t).includes(qn)) ? 1 : 0),
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  // 4) Nunca “null”: si no hubo match, devuelve la primera del pool
  return scored[0]?.f ?? pool[0];
}

// Puntitos “escribiendo…”
function TypingDots() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        gap: 0.6,
        alignItems: "center",
        "@keyframes blink": {
          "0%, 80%, 100%": { opacity: 0.2, transform: "translateY(0px)" },
          "40%": { opacity: 1, transform: "translateY(-2px)" },
        },
        "& span": {
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: "text.secondary",
          display: "inline-block",
          animation: "blink 1.2s infinite ease-in-out",
        },
        "& span:nth-of-type(2)": { animationDelay: "0.15s" },
        "& span:nth-of-type(3)": { animationDelay: "0.3s" },
      }}
    >
      <span />
      <span />
      <span />
    </Box>
  );
}

// ====== Componente ======
export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentCategory = CATEGORIES[tab]?.key;

  // FAQs sugeridas por categoría
  const filteredFaqs = useMemo(
    () => FAQS.filter((f) => f.category === currentCategory).slice(0, 12),
    [currentCategory]
  );

  // Lanza respuesta a partir de un Faq concreto (sugerencias)
  const askFromFaq = (faq: Faq) => {
    if (isLoading) return;
    setIsLoading(true);

    setMessages((prev) => [...prev, { sender: "user", text: faq.question }]);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "", loading: true },
    ]);

    setTimeout(() => {
      setMessages((prev) => {
        const next = [...prev];
        const idx = [...next].reverse().findIndex((m) => m.loading);
        const realIdx = idx === -1 ? -1 : next.length - 1 - idx;
        const botMsg: Msg = {
          sender: "bot",
          text: faq.answer,
          linkHref: faq.linkHref,
          followUps: faq.followUps,
          loading: false,
        };
        if (realIdx !== -1) next[realIdx] = botMsg;
        else next.push(botMsg);
        return next;
      });
      setIsLoading(false);
    }, 600);
  };

  // Lanza respuesta a partir de texto (follow-ups)
  const ask = (text: string) => {
    if (!text.trim() || isLoading) return;
    const faq = resolveFaqByText(text, currentCategory);
    askFromFaq(faq);
  };

  const clearChat = () => setMessages([]);

  return (
    <Box>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: "1px solid", borderColor: "divider" }}
      >
        <Toolbar>
          <Typography variant="h6" component={"a"} href="/" fontWeight={700}>
            Visor del Tiempo
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <HeaderAuth />
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          maxWidth: 960,
          mx: "auto",
          mt: 6,
          mb: 10,
          px: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" fontWeight={800}>
            Asistente de Lugares ✨
          </Typography>
          <IconButton onClick={clearChat} aria-label="reiniciar">
            <RestartAltRoundedIcon />
          </IconButton>
        </Stack>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Explora preguntas por categoría y haz clic para ver la respuesta.
        </Typography>

        {/* Categorías */}
        <Paper variant="outlined" sx={{ borderRadius: 3, mb: 2 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ px: 1 }}
          >
            {CATEGORIES.map((c) => (
              <Tab key={c.key} label={c.label} />
            ))}
          </Tabs>
        </Paper>

        <Divider sx={{ mb: 2 }} />

        {/* Sugerencias */}
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 3,
            p: 2,
            mb: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Sugerencias
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {filteredFaqs.map((f) => (
              <Button
                key={f.id}
                variant="outlined"
                size="small"
                onClick={() => askFromFaq(f)}
                disabled={isLoading}
                sx={{ borderRadius: 3, textTransform: "none" }}
              >
                {f.question}
              </Button>
            ))}
          </Stack>
        </Paper>

        {/* Conversación */}
        <Paper
          elevation={0}
          sx={{
            flexGrow: 1,
            p: 2,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            minHeight: 340,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {messages.length === 0 && (
            <Typography color="text.disabled" textAlign="center">
              👋 Elige una sugerencia para comenzar.
            </Typography>
          )}

          {messages.map((m, i) => (
            <Box
              key={i}
              sx={{
                alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
              }}
            >
              <Box
                sx={{
                  bgcolor: m.sender === "user" ? "primary.main" : "grey.100",
                  color:
                    m.sender === "user"
                      ? "primary.contrastText"
                      : "text.primary",
                  px: 2,
                  py: 1,
                  borderRadius: 3,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  minHeight: 36,
                }}
              >
                {m.loading ? (
                  <TypingDots />
                ) : (
                  <Typography variant="body2">{m.text}</Typography>
                )}
              </Box>

              {/* Bot: follow-ups y link a detalle si aplica */}
              {!m.loading &&
                m.sender === "bot" &&
                (m.followUps?.length || m.linkHref) && (
                  <Stack direction="row" spacing={1} flexWrap="wrap" mt={0.75}>
                    {m.linkHref && (
                      <Button
                        href={m.linkHref}
                        variant="text"
                        size="small"
                        sx={{ textTransform: "none" }}
                      >
                        Ver detalle del lugar
                      </Button>
                    )}
                    {m.followUps?.map((fu) => (
                      <Button
                        key={fu}
                        size="small"
                        variant="outlined"
                        onClick={() => ask(fu)}
                        disabled={isLoading}
                        sx={{ borderRadius: 2, textTransform: "none" }}
                      >
                        {fu}
                      </Button>
                    ))}
                  </Stack>
                )}
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}
