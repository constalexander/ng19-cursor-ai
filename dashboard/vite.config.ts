import { defineConfig } from '@angular-devkit/build-angular/vite';
import { defaultVitePlugin } from '@angular-devkit/build-angular/src/vite/plugin';

export default defineConfig({
  plugins: [defaultVitePlugin()],
  css: {
    devSourcemap: true,
  },
  server: {
    port: 4202,
  },
});
