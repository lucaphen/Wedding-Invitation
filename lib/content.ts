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
    hintOpen: "Clique aqui para abrir",
  },

  // Envelope fotográfico. `frontPhoto` é a frente (monograma); `photo` é o
  // verso selado. Se forem null, usa-se o envelope desenhado em SVG.
  // As percentagens definem a geometria da aba.
  envelope: {
    frontPhoto: "/envelope-front.jpg", // frente: linho marfim com o monograma
    photo: "/envelope-back.jpg", // verso selado
    aspect: 1205 / 880, // proporção real das fotografias
    flapTip: 70, // % da altura onde termina a ponta da aba (abaixo do selo)
    seal: { x: 49, y: 54, size: 20 }, // alvo de clique do selo (% da caixa)
  },

  // Cartão — frente (o convite formal)
  invite: {
    intro:
      "É com muita alegria que convidamos para a celebração do nosso casamento",
    // A cerimónia: o trecho a negrito fica em `highlight`.
    ceremony: {
      pre: "A cerimónia decorrerá na Basílica de Santa Quitéria de Meca, às ",
      highlight: "12h30",
      post: ", seguida de receção na Quinta da Grilla, em Alenquer",
    },
    // Confirmação (RSVP) com data-limite a negrito.
    rsvp: {
      pre: "Pedimos que confirmem a presença até ao dia ",
      highlight: "1 de agosto de 2026.",
    },
    note: "A ausência de confirmação até à data, será entendida como não comparecimento.",
  },

  // Cartão — verso (Mais detalhes)
  details: {
    title: "Mais detalhes",
    rsvp: {
      label: "RSVP",
      text: "A vossa presença pode ser confirmada diretamente aos noivos através dos números abaixo, ou no nosso site.",
      contacts: [
        { name: "Rute", phone: "914 816 885" },
        { name: "Bernardo", phone: "934 647 066" },
      ],
    },
    site: {
      label: "SITE",
      text: "No nosso site poderá confirmar a sua presença e consultar todos os detalhes do nosso grande dia. Basta aceder no seguinte link / Qr Code:",
      // URL corrigido (o cartão impresso tinha "https:/" com uma só barra).
      url: "https://sayi.do/ruteandbernardo10102026",
      // Código QR pré-gerado para o URL acima (creme sobre fundo transparente).
      qr: "/qr-rsvp.svg",
    },
  },

  // Mapa do percurso — imagem em /public/map.png.
  map: {
    title: "Mapa",
    caption: "Quinta da Grilla → Basílica de Santa Quitéria de Meca",
    image: "/map.png",
    venueA: "Quinta da Grilla",
    venueB: "Basílica de Santa Quitéria de Meca",
    roads: {
      humberto: "R. GEN. HUMBERTO DA SILVA DELGADO",
      cunca: "ESTRADA DA CUNCA",
      gavinha: "ALDEIA GAVINHA",
      n9: "N9",
      n115: "N115",
    },
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
