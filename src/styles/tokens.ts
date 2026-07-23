export const tokens = {
  colors: {
    background: {
      primary: "#1a1a1f", // ~5-7% gray dark
      secondary: "#25252b",
      elevated: "#2f2f36",
    },
    text: {
      primary: "#f0f0f5",
      secondary: "#b0b0b8",
      muted: "#8a8a92",
    },
    accent: "#2dd4bf",
    border: "#3a3a42",
    success: "#4ade80",
    error: "#f87171",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
  },
  fontSize: {
    sm: "14px",
    md: "16px",
    lg: "20px",
    xl: "24px",
  },
} as const;