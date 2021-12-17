// vite.config.js
const { resolve } = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig ({
  base: 'http://felixbryld.dk/kea/examtest/test1/',
  // base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        html1: resolve(__dirname, 'html/aabningstider.html'),
        html2: resolve(__dirname, 'html/galleri.html'),
        html3: resolve(__dirname, 'html/booking.html'),
        html4: resolve(__dirname, 'html/kontakt.html'),
        html5: resolve(__dirname, 'html/ommikkelsen.html'),
        html6: resolve(__dirname, 'html/prisliste.html'),
        html7: resolve(__dirname, 'html/tidsbestilling.html')
      }
    }
  }
})