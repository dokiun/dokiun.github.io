import { defineConfig } from 'vite';

export default defineConfig({
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
