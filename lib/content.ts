// ---------------------------------------------------------------------------
// Conteúdo do convite — edite aqui todo o texto e os dados do casamento.
// (Edit everything here: copy, venues, RSVP, links. No need to touch the
//  React components.)
// ---------------------------------------------------------------------------

export const wedding = {
  // Noivos
  bride: "Rute",
  groom: "Bernardo",
  initials: { left: "R", right: "B" },

  // Data
  date: "10.10.2026",
  dateLong: "10 de Outubro de 2026",
  dayOfWeek: "Sábado",

  // Mensagens da capa (envelope)
  cover: {
    overline: "VAMOS CASAR",
    hintFlip: "Toque para virar",
    hintOpen: "Clique para abrir",
  },

  // Cartão — frente (o convite formal)
  invite: {
    overline: "Com imenso carinho, convidamos",
    intro: "para celebrar o nosso casamento",
    // Hora / programa — substitua pelos valores reais quando os tiver.
    ceremony: {
      label: "Cerimónia",
      venue: "Basílica de Santa Quitéria de Meca",
      time: "16h00", // placeholder — editar
    },
    reception: {
      label: "Copo-de-água",
      venue: "Quinta da Grilla",
      time: "a seguir à cerimónia", // placeholder — editar
    },
    closing: "Será uma honra ter-vos connosco neste dia tão especial.",
  },

  // Cartão — verso (Mais detalhes)
  details: {
    title: "Mais detalhes",
    rsvp: {
      label: "RSVP",
      text: "A vossa presença pode ser confirmada diretamente aos noivos através dos números abaixo, ou aqui no site.",
      contacts: [
        { name: "Rute", phone: "914 816 885" },
        { name: "Bernardo", phone: "934 647 066" },
      ],
    },
    site: {
      label: "Localização",
      text: "Consulte o mapa do percurso, da Quinta da Grilla até à Basílica de Santa Quitéria de Meca.",
    },
  },

  // Mapa
  map: {
    title: "Mapa do percurso",
    caption: "Quinta da Grilla → Basílica de Santa Quitéria de Meca",
    // Coloque a imagem do mapa estilizado em /public e atualize este caminho.
    image: "/map-placeholder.svg",
    googleMapsLabel: "Abrir no Google Maps",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bas%C3%ADlica+de+Santa+Quit%C3%A9ria+de+Meca%2C+Alenquer",
  },

  // Botões / controlos
  controls: {
    flipCard: "Virar cartão",
    seeMap: "Ver mapa",
    close: "Fechar",
    back: "Voltar",
  },
} as const;

export type Wedding = typeof wedding;
