const headerHeight = "80px";

export const themeConfig = {
  colorPalette: {
    primary: {
      default: "#783940",
      light: "#f7e9e9",
    },
    secondary: {
      default: "#EA953D",
      light: "#EECD98",
    },
    contrasted: {
      default: "#505050",
      light: "#cccccc",
    },
    blended: {
      default: "#ffffff",
      dark: "#f9f9f9",
    },
    disabled: {
      default: "#e6e6e6",
    },
  },
  radius: {
    ROUND: "10px",
    VERY_ROUND: "100px",
    SLIGHTLY_ROUND: "5px",
  },
  alignment: {
    margin: {
      SMALL: "5px",
      REGULAR: "15px", // DEPRECATED, use spacing instead
      LARGE: "30px", // DEPRECATED, use spacing instead
      EXTRA_LARGE: "60px", // DEPRECATED, use spacing instead
    },
    padding: {
      REGULAR: "15px", // DEPRECATED, use spacing instead
      LARGE: "30px", // DEPRECATED, use spacing instead
      EXTRA_EXTRA_LARGE: "250px", // DEPRECATED, use spacing instead
    },
  },
  spacing: {
    REGULAR: "15px",
    LARGE: "30px",
    EXTRA_LARGE: "60px",
    EXTRA_EXTRA_LARGE: "250px",
  },
  page: {
    width: "1200px",
    minHeight: "0px",
    headerHeight,
    contentHeight: `calc(100vh - ${headerHeight})`,
  },
  shadow: {
    REGULAR: "0px 4px 22px rgba(0, 0, 0, 0.1)",
    MINIMAL: "0px 2px 7px rgba(0,0,0,0.07)",
  },
  form: {
    colors: {
      ERROR: "#ff0f0f",
      WARNING: "#ffac14",
      GREYED_OUT: "#6D757D",
    },
  },
  text: {
    weight: {
      THIN: "300",
      REGULAR: "400",
      BOLD: "600",
    },
    color: {
      COLORED: "#ad1111",
      PRIMARY: "#111111",
      PRIMARY_LIGHT: "#a0a0a0",
      INVERTED: "white",
      DISABLED: "#939090",
    },
    size: {
      CARD_HEADER: "1.8rem",
      CARD_HIGHLIGHTED: "1.2rem",
      GENERIC_SMALL: "0.7rem",
    },
    lineHeight: {
      REGULAR: "1rem",
      LARGE: "2rem",
    },
  },
  card: {
    BACKGROUND_OPACITY_SUFIX: "d5",
  },
} as const;

export type Theme = typeof themeConfig;
