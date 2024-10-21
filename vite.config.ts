import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import open from 'open';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: false, // Disable Vite's built-in auto-open
    port: 3000, // Specify the port you want to use
  },
  plugins: [
    react(),
    {
      name: 'open-browser',
      configureServer(server) {
        server.httpServer.on('listening', () => {
          const address = server.httpServer.address();
          if (typeof address === 'string' || address === null) {
            return;
          }
          const url = `http://localhost:${address.port}`;
          open(url, { app: { name: 'firefox' } });
        });
      },
    },
  ],
});
