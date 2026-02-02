const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    // Convert oklch/oklab colors to RGB for html2canvas compatibility
    "@csstools/postcss-oklab-function": { preserve: false },
  },
};

export default config;
