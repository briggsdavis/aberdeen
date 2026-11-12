export const reservationHref = "/#reservations"
export const openTableReservationUrl = "https://www.opentable.com/r/the-aberdeen-savannah"

// OpenTable's iframe endpoint and sizing, as returned by the supplied widget loader.
export const openTableWidgetUrl = `https://www.opentable.com/widget/reservation/mural?${new URLSearchParams(
  {
    restaurantIds: "1561036",
    type: "standard",
    theme: "standard",
    colorThemeId: "8",
    isDarkMode: "false",
    isIframe: "true",
    domain: "com",
    lang: "en-US",
    isNewTab: "false",
    otSource: "Restaurant website",
    font: "brandonText",
    otLogo: "subtle",
    primaryColor: "2a3b92",
    primaryFontColor: "fff8f0",
    buttonColor: "2a3b92",
    buttonFontColor: "fff8f0",
    logoPid: "98670020",
    backgroundPid: "0",
    demo: "false",
    loadAllWidgets: "false",
  },
)}`
