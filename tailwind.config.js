@import url('https://api.fontshare.com/v2/css?f[]=chillax@500,600,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;600&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #000000;
  color: #E6E6E6;
  font-family: 'Poppins', sans-serif;
  overflow: hidden; /* Impede rolagem da página inteira no mobile */
  -webkit-tap-highlight-color: transparent;
}

/* Scrollbar Invisível mas funcional */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.glass-panel {
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}