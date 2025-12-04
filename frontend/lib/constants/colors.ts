// lib/constants/chart-colors.ts
export const CHART_COLORS = {
  // Paleta principal para gráficos
  purple: '#807dfe',      // Morado claro
  blue: '#0033ff',        // Azul vibrante (SPE)
  lightBlue: '#9fbffc',   // Azul cielo
  darkBlue: '#01033e',    // Azul muy oscuro (SPE)
  mediumBlue: '#6b64d0',  // Azul medio
  navy: '#3e4492',        // Azul navy
  teal: '#2d5a6b',        // Verde azulado
} as const;

export const CHART_PALETTE = [
  CHART_COLORS.purple,
  CHART_COLORS.blue,
  CHART_COLORS.lightBlue,
  CHART_COLORS.darkBlue,
  CHART_COLORS.mediumBlue,
  CHART_COLORS.navy,
  CHART_COLORS.teal,
];