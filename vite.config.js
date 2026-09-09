import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

const modelsDirectory = path.resolve(process.cwd(), 'public/models');

function getModelCatalog() {
  const files = fs.readdirSync(modelsDirectory);
  const mtls = new Set(
    files
      .filter((file) => file.toLowerCase().endsWith('.mtl'))
      .map((file) => path.basename(file, path.extname(file)).toLowerCase())
  );

  return files
    .filter((file) => file.toLowerCase().endsWith('.obj'))
    .map((objFile) => {
      const baseName = path.basename(objFile, path.extname(objFile));
      const mtlFile = `${baseName}.mtl`;

      if (!mtls.has(baseName.toLowerCase())) return null;

      return {
        id: baseName,
        label: baseName.replace(/[_-]+/g, ' '),
        obj: objFile,
        mtl: mtlFile
      };
    })
    .filter(Boolean)
    .sort((first, second) => first.label.localeCompare(second.label, 'es'));
}

function modelCatalogPlugin() {
  const manifestPath = path.join(modelsDirectory, 'models.json');

  return {
    name: 'model-catalog',
    buildStart() {
      fs.writeFileSync(manifestPath, JSON.stringify(getModelCatalog(), null, 2));
    },
    configureServer(server) {
      server.middlewares.use('/models/models.json', (_request, response) => {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(getModelCatalog()));
      });
    }
  };
}

export default defineConfig({
  plugins: [modelCatalogPlugin()],
  // Optimizaciones para modelos 3D
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar three.js en su propio chunk
          'three': ['three'],
          'three-loaders': [
            'three/examples/jsm/loaders/MTLLoader',
            'three/examples/jsm/loaders/OBJLoader'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Aumentar límite de tamaño de chunk
  },
  
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    open: true,
    // Configurar headers para modelos 3D
    middlewareMode: false,
    fs: {
      strict: false
    }
  },
  
  // Optimizaciones de assets
  assetsInclude: ['**/*.obj', '**/*.mtl', '**/*.stl'],
  
  // Configuración de dependencias
  optimizeDeps: {
    include: [
      'three',
      'three/examples/jsm/loaders/MTLLoader',
      'three/examples/jsm/loaders/OBJLoader'
    ]
  }
});
