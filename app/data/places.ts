export type Place = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  city?: string;
  coverUrl: string; // URL absoluta (Unsplash, etc.)
  description?: string;
  stats: {
    promedio: number;
    total: number;
  };
};

export type PlaceDetail = {
  id: string;
  slug: string;
  coverUrl: string;
  subtitle: string;
  description: string;
  title: string;
  city?: string;
  rating: number;
  reviewsCount: number;
  photos: string[]; // URLs absolutas
  href: string; // Enlace a la página del lugar
  about?: string;
  extras: {
    horarios: string;
    servicios: string;
    recomendaciones: string;
  };
  mapEmbed: string; // URL para embeber el mapa
  comments: Comment[];
  model?: string; // 3D model URL or identifier
};

export type Comment = {
  id: string;
  user: string;
  rating: number;
  text: string;
  date: string; // ISO date string
};

export const detailPlaces: Record<string, PlaceDetail> = {
  "tula-atlantes": {
    id: "tula-atlantes",
    slug: "tula-atlantes",
    title: "Tula de Allende (Atlantes de Tula)",
    subtitle: "Zona arqueológica tolteca",
    city: "Tula de Allende, Hgo.",
    rating: 4.8,
    reviewsCount: 1523,
    photos: [
      // 1 grande + 2 chicas
      "https://img.travesiasdigital.com/cdn-cgi/image/quality=90,format=auto,onerror=redirect/2020/08/atlantes-de-tula-foto-inah.jpg",
      "https://elsouvenir.com/wp-content/uploads/2015/02/Portada.Recorrido-por-Tula-y-visitando-a-los-atlantes.Foto_.La-Silla-Rota.jpg",
      "https://escapadas.mexicodesconocido.com.mx/wp-content/uploads/2022/08/Atlantes-taxco_escapadas.jpg",
    ],
    coverUrl:
      "https://img.travesiasdigital.com/cdn-cgi/image/width=1200,quality=90,format=auto,onerror=redirect/2020/08/atlantes-de-tula-foto-inah.jpg",
    href: "/places/tula-atlantes",
    description:
      "Los imponentes Atlantes de Tula son cuatro esculturas antropomorfas de más de 4.5 m de altura, labradas en basalto por la cultura tolteca para sostener el templo superior de la Pirámide B. Representan guerreros ataviados con casco de plumas, pectoral en forma de mariposa, atlatl, dardos, cuchillo de obsidiana y sandalias decoradas con serpientes, símbolo de su poder militar y religioso. :contentReference[oaicite:1]{index=1}",
    about:
      "Ubicada en la antigua ciudad de Tollan-Xicocotitlan, hoy Tula de Allende, la zona arqueológica fue centro del poder tolteca entre los siglos X y XII d.C. Su esplendor arquitectónico y artístico influyó posteriormente en culturas mesoamericanas como los mexicas. Las esculturas de los Atlantes ejemplifican esta maestría en talla de piedra y simbolizan la alianza entre guerreros, religión y estado. :contentReference[oaicite:2]{index=2}",
    extras: {
      horarios:
        "Lunes a domingo de 9:00 a 17:00 (aproximadamente). Recomendado llegar temprano para evitar aglomeraciones.",
      servicios:
        "Museo de sitio «Museo Jorge R. Acosta», visitas guiadas, tienda de artesanías y miradores.",
      recomendaciones:
        "Usa calzado cómodo para explorar las áreas con piedra, lleva agua, gorra y cámara. Respeta las zonas acordonadas y evita ascender sin guía por edificaciones restringidas.",
    },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7495.339228088356!2d-99.34989230642088!3d20.064276700000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d22d3ebb6b8739%3A0xd32ab9bea97bbe85!2sAtlantes%20de%20Tula!5e0!3m2!1ses-419!2smx!4v1761428527411!5m2!1ses-419!2smx",
    comments: [
      {
        id: "c1",
        user: "Lucía Ramos",
        rating: 5,
        text: "Una experiencia maravillosa. Ver los Atlantes en vivo me impresionó mucho, ¡el guía lo explicó súper bien!",
        date: "2025-08-12",
      },
      {
        id: "c2",
        user: "Diego Fernández",
        rating: 4.5,
        text: "Me gustó mucho la zona arqueológica, pero se estaba lloviendo y algunas áreas estaban cerradas. Aún así, vale totalmente la visita.",
        date: "2025-07-30",
      },
    ],
    model: "/models/atlante_de_tula.glb",
  },
  "reloj-monumental": {
    id: "reloj-monumental",
    slug: "reloj-monumental",
    title: "Reloj Monumental",
    subtitle: "Icono porfiriano de Pachuca",
    city: "Pachuca, Hgo.",
    rating: 4.7,
    reviewsCount: 2140,
    photos: [
      // 1 grande + 2 chicas (pon aquí tus URLs)
      "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/225000/225737-Monumental-Clock-Of-Pachuca.jpg",
      "https://www.caminoreal.com/storage/app/media/Blog/reloj-monumental-de-pachuca.jpg",
      "https://www.vamosaconocer.com/wp-content/uploads/2023/07/DSC_0060.jpg",
    ],
    coverUrl: "https://TU_IMAGEN_COVER.jpg",
    href: "/places/reloj-monumental",
    description:
      "Emblema de Pachuca ubicado en la Plaza Independencia. Su torre y carillón de estilo porfiriano con esculturas alegóricas conmemoran el espíritu cívico de la ciudad. Punto de reunión, fotos y eventos.",
    about:
      "El Reloj Monumental es el referente histórico y urbano de Pachuca. Levantado a inicios del siglo XX, combina una torre de cantera con ornamentación clásica y un mecanismo de reloj de gran precisión. Sus cuatro caras permiten ver la hora desde distintos puntos del centro y sus relieves y esculturas evocan los valores cívicos que marcaron la modernización de la ciudad. El entorno peatonal de la plaza ofrece cafés, comercios y un ambiente ideal para pasear y tomar fotografías, especialmente al atardecer cuando el reloj se ilumina.",
    extras: {
      horarios:
        "Espacio público abierto 24/7. El entorno comercial y cafeterías cercanas suelen operar de 9:00 a 21:00 (puede variar).",
      servicios:
        "Plaza peatonal, bancos para descanso, áreas fotográficas, comercios y cafeterías alrededor. Eventos cívicos y culturales ocasionales.",
      recomendaciones:
        "Visítalo al atardecer para mejores fotos. Lleva calzado cómodo; el centro es caminable. Si planeas fotografiar, considera lentes gran angular para capturar la torre completa.",
    },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3754.013640841182!2d-98.7336!3d20.1279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1a5d5c9f6c1a9%3A0x8a3a5a8a0b9b3c1!2sReloj%20Monumental%20de%20Pachuca!5e0!3m2!1ses-419!2smx!4v1700000000000",
    comments: [
      {
        id: "c1",
        user: "Alejandra P.",
        rating: 5,
        text: "Imperdible si visitas Pachuca. La plaza está muy bonita y por la noche el reloj luce increíble iluminado.",
        date: "2025-08-10",
      },
      {
        id: "c2",
        user: "Miguel H.",
        rating: 4.5,
        text: "Excelente para pasear y tomar fotos. Hay cafeterías alrededor y suele haber ambiente familiar los fines de semana.",
        date: "2025-07-28",
      },
    ],
    model: "/models/reloj_monumental_de_pachuca.glb",
  },
  "distrito-minero": {
    id: "distrito-minero",
    slug: "distrito-minero",
    title: "Antiguo Distrito Minero",
    subtitle: "Historia y arquitectura inglesa",
    city: "Real del Monte, Hgo.",
    rating: 4.6,
    reviewsCount: 987,
    photos: [
      // 1 grande + 2 chicas (reemplaza con tus URLs preferidas)
      "https://www.muvipa.com.mx/wp-content/uploads/2019/04/RAM_night3.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/2e/98/6a/el-oro-de-hidalgo-pueblo.jpg?w=1200&h=1200&s=1",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Parroquia_de_Nuestra_Se%C3%B1ora_de_la_Asunci%C3%B3n%2C_Real_del_Monte%2C_Hidalgo%2C_M%C3%A9xico%2C_2013-10-10%2C_DD_07.JPG/500px-Parroquia_de_Nuestra_Se%C3%B1ora_de_la_Asunci%C3%B3n%2C_Real_del_Monte%2C_Hidalgo%2C_M%C3%A9xico%2C_2013-10-10%2C_DD_07.JPG",
    ],
    coverUrl: "https://TU_IMAGEN_COVER.jpg",
    href: "/places/distrito-minero",
    description:
      "Un viaje al pasado minero de Hidalgo: calles empedradas, casonas coloniales e influencia inglesa que marcaron la identidad de Real del Monte. Cuna del paste y de una de las minas más importantes del país.",
    about:
      "El Antiguo Distrito Minero de Real del Monte fue el corazón de la minería en México durante los siglos XVIII y XIX. Aquí se introdujo por primera vez la tecnología de extracción moderna traída por ingenieros y trabajadores ingleses, dejando una profunda huella en la arquitectura, gastronomía y cultura local. Las minas de plata fueron fundamentales para la economía de la región, y hoy, el pueblo conserva su trazado histórico, casonas de cantera y calles empedradas. Es considerado un Pueblo Mágico por su gran valor patrimonial y cultural.",
    extras: {
      horarios:
        "La zona histórica es de acceso libre las 24 horas, pero museos y minas turísticas suelen abrir de 9:00 a 17:00.",
      servicios:
        "Visitas guiadas a minas, Museo de Sitio Mina de Acosta, tiendas de artesanías, panaderías tradicionales de paste y miradores panorámicos.",
      recomendaciones:
        "Lleva calzado cómodo para caminar en calles empedradas y chamarra ligera (clima fresco). No te vayas sin probar un paste y visitar los miradores al atardecer.",
    },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3760.015973244053!2d-98.666367!3d20.136455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1b79f8d81258f%3A0x3ff7d964f58ddc04!2sMineral%20del%20Monte%2C%20Hgo.!5e0!3m2!1ses-419!2smx!4v1700000000000",
    comments: [
      {
        id: "c1",
        user: "Fernanda Ruiz",
        rating: 5,
        text: "Hermoso lugar lleno de historia. Las calles empedradas y la arquitectura inglesa te transportan a otra época. Muy recomendable hacer el tour por la Mina de Acosta.",
        date: "2025-08-08",
      },
      {
        id: "c2",
        user: "Javier Torres",
        rating: 4.5,
        text: "El clima es muy agradable y hay muchos lugares para comer rico. La vista desde el mirador es espectacular.",
        date: "2025-07-26",
      },
    ],
    model: "/models/antigua_mina_de_camelia.glb",
  },
  "exconvento-san-francisco": {
    id: "exconvento-san-francisco",
    slug: "exconvento-san-francisco",
    title: "Templo y Exconvento de San Francisco",
    subtitle: "Museo de Fotografía e historia virreinal",
    city: "Pachuca, Hgo.",
    rating: 4.7,
    reviewsCount: 1203,
    photos: [
      // 1 grande + 2 chicas (reemplaza con tus URLs preferidas)
      "https://www.guiahidalgo.com.mx/media/k2/items/cache/ea82697ed9755e975f3c7d735db2070c_XL.webp",
      "https://escapadas.mexicodesconocido.com.mx/wp-content/uploads/2020/10/20140520_266_HGO_PACHUCA_PARROQUIA_DE_SAN_FRANCISCO_INTERIORES_DE_LA_PARROQUIA_RC.png",
      "https://programadestinosmexico.com/wp-content/uploads/2024/01/EX-CONVENTO-DE-SAN-FRANCISCO1.jpg",
    ],
    coverUrl: "https://TU_IMAGEN_COVER.jpg",
    href: "/places/exconvento-san-francisco",
    description:
      "Conjunto arquitectónico del siglo XVI que combina arte virreinal, historia religiosa y patrimonio cultural. Sede del Museo Nacional de la Fotografía, es uno de los recintos más emblemáticos de Pachuca.",
    about:
      "El Templo y Exconvento de San Francisco es una joya histórica del periodo novohispano. Fundado por los frailes franciscanos a mediados del siglo XVI, su construcción combina estilos plateresco y barroco con detalles de cantera y bóvedas artesonadas. Durante siglos fue centro religioso, educativo y de resguardo documental. Hoy alberga el Museo Nacional de la Fotografía, con una de las colecciones más completas del país, y el Archivo Histórico y Fotográfico de Hidalgo. Desde su atrio y jardines se aprecian vistas privilegiadas del centro histórico de Pachuca.",
    extras: {
      horarios:
        "Martes a domingo de 10:00 a 18:00. Cerrado los lunes y días festivos oficiales.",
      servicios:
        "Museo Nacional de la Fotografía, exposiciones temporales, visitas guiadas, librería y tienda de artesanías, jardines y zona de descanso.",
      recomendaciones:
        "Ideal para los amantes del arte, la historia y la fotografía. Lleva cámara, evita el flash en salas de exposición, y dedica al menos una hora para recorrerlo con calma. Muy recomendable visitarlo al atardecer para apreciar la iluminación del conjunto.",
    },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746.3021705520187!2d-98.7311963!3d20.1214375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d109e12fa8a95f%3A0x8931a45a9fbf8b9c!2sEx%20Convento%20de%20San%20Francisco%20de%20As%C3%ADs!5e0!3m2!1ses-419!2smx!4v1761429584013!5m2!1ses-419!2smx",
    comments: [
      {
        id: "c1",
        user: "Daniela Campos",
        rating: 5,
        text: "Un lugar imperdible para quienes disfrutan la fotografía y la historia. Las exposiciones están muy bien curadas y el edificio es impresionante.",
        date: "2025-08-11",
      },
      {
        id: "c2",
        user: "Rafael Montiel",
        rating: 4.5,
        text: "Muy bonito el exconvento, excelente conservación. Solo recomendaría más señalización dentro del museo.",
        date: "2025-07-29",
      },
    ],
    model: "/models/templo_y_exconvento_de_san_francisco.glb",
  },
  "estadio-hidalgo": {
    id: "estadio-hidalgo",
    slug: "estadio-hidalgo",
    title: "Estadio Hidalgo",
    subtitle: "Casa de los Tuzos del Pachuca",
    city: "Pachuca, Hgo.",
    rating: 4.5,
    reviewsCount: 1765,
    photos: [
      // 1 grande + 2 chicas (reemplaza con tus URLs preferidas)
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/a1/a3/7d/photo8jpg.jpg?w=1200&h=-1&s=1",
      "https://imagenes.eleconomista.com.mx/files/image_768_768/uploads/2022/10/20/66e490fa3f4c6.jpeg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e4/Estadio_Hidalgo_22-05-2022.jpg",
    ],
    coverUrl: "https://TU_IMAGEN_COVER.jpg",
    href: "/places/estadio-hidalgo",
    description:
      "Estadio icónico del fútbol mexicano y hogar del Club Pachuca. Reconocido por su ambiente familiar, su historia deportiva y su vista panorámica de la ciudad.",
    about:
      "El Estadio Hidalgo, inaugurado en 1993, es uno de los recintos futbolísticos más representativos de México. Es la casa del Club Pachuca, el equipo más antiguo del país, con una rica historia en torneos nacionales e internacionales. Tiene una capacidad aproximada de 30,000 espectadores y cuenta con modernas instalaciones, gradas techadas, palcos y zonas especiales para personas con discapacidad. Se encuentra al pie del cerro, lo que permite vistas espectaculares durante los partidos. Además de fútbol, alberga conciertos y eventos deportivos de gran formato.",
    extras: {
      horarios:
        "Días de partido: ingreso desde 2 horas antes del inicio. Visitas guiadas disponibles en horarios determinados entre semana.",
      servicios:
        "Venta de boletos, zonas de comida, estacionamiento, accesos para personas con discapacidad, tours guiados, tienda oficial de Pachuca.",
      recomendaciones:
        "Llega con anticipación para evitar filas, usa ropa cómoda, revisa el calendario oficial de partidos y evita llevar objetos no permitidos. Ideal asistir con amigos o familia para vivir el ambiente tuzo.",
    },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746.6923047530045!2d-98.7560536!3d20.1051453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1a0aa39f0f3b5%3A0x33751c12ba7b8d31!2sEstadio%20Hidalgo!5e0!3m2!1ses-419!2smx!4v1761429901833!5m2!1ses-419!2smx",
    comments: [
      {
        id: "c1",
        user: "Luis Herrera",
        rating: 5,
        text: "La experiencia de ver un partido aquí es espectacular. Muy buen ambiente, seguro y con gran vista desde cualquier asiento.",
        date: "2025-08-09",
      },
      {
        id: "c2",
        user: "Carolina Méndez",
        rating: 4.5,
        text: "Muy buenas instalaciones, pero conviene llegar con tiempo porque el estacionamiento se llena rápido. ¡Vamos Tuzos!",
        date: "2025-07-27",
      },
    ],
    model: "/models/estadio_hidalgo.glb",
  },
};
