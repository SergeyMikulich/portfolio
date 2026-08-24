import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleWorkMetadataRequest } from './server/work-meta.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'work-metadata-api',
      configureServer(server) {
        server.middlewares.use('/api/work-metadata', async (req, res, next) => {
          if (req.url === '/api/work-metadata') {
            await handleWorkMetadataRequest(req, res);
            return;
          }

          next();
        });
      },
    },
  ],
});
