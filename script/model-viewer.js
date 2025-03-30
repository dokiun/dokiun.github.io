
import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

export function initModelViewer(container) {
    if (container) {
        
        let model;
        
        // Escena
        const scene = new THREE.Scene();
        
        // Cámara
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.set(0, 0, 0);
        
        // Renderer
        const container = document.getElementById('viewer3d');
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        
        // Luces
        scene.add(new THREE.AmbientLight(0xffffff, 0.8));
        const light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.set(10, 10, 10);
        scene.add(light);
        
        // Movimiento del mouse → rotación
        let targetRotationX = 0;
        let targetRotationY = 0;
        
        document.addEventListener('mousemove', (event) => {
          const x = event.clientX / window.innerWidth;
          const y = event.clientY / window.innerHeight;
        
          targetRotationY = THREE.MathUtils.clamp((x - 0.5) * Math.PI, -Math.PI / 4, Math.PI / 4);
        
          targetRotationX = (y - 0.5) * Math.PI * 0.15; // vertical más suave
        });
        
        // Cargar MTL y OBJ
        const mtlLoader = new MTLLoader();
        mtlLoader.setPath('/models/');
        mtlLoader.load('Ensamble.mtl', (materials) => {
          materials.preload();
        
          const objLoader = new OBJLoader();
          objLoader.setMaterials(materials);
          objLoader.setPath('/models/');
          objLoader.load('Ensamble.obj', (obj) => {
            model = obj;
        
            // Centrar modelo
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3()).length();
        
            // Escalar
            const scaleFactor = 2.05;
            model.scale.set(scaleFactor, scaleFactor, scaleFactor);
        
            model.position.sub(center.multiplyScalar(scaleFactor));
            scene.add(model);
        
            // Vista lateral (desde eje X)
            camera.position.set(size * 1.6, 0, 0);
            camera.lookAt(0, 0, 0);
          });
        }, undefined, (error) => {
          console.error('❌ Error al cargar MTL:', error);
        });
        
        // Animación
        function animate() {
          requestAnimationFrame(animate);
        
          if (model) {
            model.rotation.y += (targetRotationY - model.rotation.y) * 0.05;
            model.rotation.x += (targetRotationX - model.rotation.x) * 0.05;
          }
        
          renderer.render(scene, camera);
        }
        animate();
        
        // Ajuste de tamaño responsivo
        function resize() {
          const width = container.clientWidth;
          const height = container.clientHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
        window.addEventListener('resize', resize);
        resize();
    }
}
