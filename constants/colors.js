const coffeeTheme = {
  primary: '#6F4E37',      // Coffee brown
  background: '#EFE6DD',   // Light beige
  card: '#D7CCC8',         // Soft tan
  text: '#3E2723',         // Dark roast
  muted: '#A1887F',        // Muted coffee
  accent: '#BCAAA4',       // Creamy accent
};

const darkTheme = {
  primary: '#BB86FC',      // Soft purple
  background: '#121212',   // True black
  card: '#1E1E1E',         // Dark gray
  text: '#FFFFFF',         // White
  muted: '#888888',        // Muted gray
  accent: '#03DAC6',       // Teal accent
};

const lightTheme = {
  primary: '#6200EE',      // Deep purple
  background: '#FFFFFF',   // Pure white
  card: '#F5F5F5',         // Light gray
  text: '#000000',         // Black
  muted: '#666666',        // Mid gray
  accent: '#03A9F4',       // Sky blue
};

const oceanTheme = {
  primary: '#0288D1',      // Deep ocean blue
  background: '#E0F7FA',   // Aqua background
  card: '#B2EBF2',         // Light turquoise
  text: '#004D40',         // Deep sea green
  muted: '#4DD0E1',        // Soft aqua
  accent: '#00BCD4',       // Bright teal
};

export const themes = {
  coffee: coffeeTheme,
  dark: darkTheme,
  light: lightTheme,
  ocean: oceanTheme,
};

export const COLORS = themes.light;
