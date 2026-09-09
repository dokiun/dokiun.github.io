import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

// Cache para el modelo ya cargado
let cachedModel = null;
let cachedModelSize = null;
let isLoading = false;

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
        
        // Limpiar cualquier contenido previo del contenedor
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance" // Optimización GPU
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Límite de pixel ratio
        container.appendChild(renderer.domElement);
        
        // Mostrar loading spinner solo en el contenedor del modelo
        const loadingElement = createLoadingSpinner();
        container.appendChild(loadingElement);
        
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
        
        // Cargar MTL y OBJ con cache y progress
        loadModelWithCache(scene, camera, loadingElement);
        
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
        
        // Función para cargar modelo con cache y progress
        function loadModelWithCache(scene, camera, loadingElement) {
            if (cachedModel) {
                // Si ya tenemos el modelo cacheado, usarlo
                model = cachedModel.clone();
                scene.add(model);
                
                // IMPORTANTE: Usar el tamaño cacheado para reposicionar la cámara
                if (cachedModelSize) {
                    camera.position.set(cachedModelSize * 1.6, 0, 0);
                    camera.lookAt(0, 0, 0);
                } else {
                    // Fallback: calcular el tamaño de nuevo si no está cacheado
                    const box = new THREE.Box3().setFromObject(model);
                    const size = box.getSize(new THREE.Vector3()).length();
                    camera.position.set(size * 1.6, 0, 0);
                    camera.lookAt(0, 0, 0);
                    cachedModelSize = size; // Guardar para la próxima vez
                }
                
                hideLoading(loadingElement);
                return;
            }
            
            if (isLoading) {
                // Si ya está cargando, esperar
                return;
            }
            
            isLoading = true;
            updateLoadingProgress('Cargando materiales...', 10);
            
            const mtlLoader = new MTLLoader();
            mtlLoader.setPath('/models/');
            mtlLoader.load('Ensamble.mtl', 
                (materials) => {
                    materials.preload();
                    updateLoadingProgress('Materiales cargados, cargando modelo...', 30);
                    
                    const objLoader = new OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.setPath('/models/');
                    
                    objLoader.load('Ensamble.obj', 
                        (obj) => {
                            updateLoadingProgress('Procesando modelo...', 80);
                            
                            // Configurar modelo
                            const box = new THREE.Box3().setFromObject(obj);
                            const center = box.getCenter(new THREE.Vector3());
                            const size = box.getSize(new THREE.Vector3()).length();
                            
                            const scaleFactor = 2.05;
                            obj.scale.set(scaleFactor, scaleFactor, scaleFactor);
                            obj.position.sub(center.multiplyScalar(scaleFactor));
                            
                            // Cachear el modelo Y el tamaño
                            cachedModel = obj;
                            cachedModelSize = size;
                            model = obj.clone();
                            scene.add(model);
                            
                            // Configurar cámara
                            camera.position.set(size * 1.6, 0, 0);
                            camera.lookAt(0, 0, 0);
                            
                            updateLoadingProgress('¡Modelo cargado!', 100);
                            setTimeout(() => hideLoading(loadingElement), 500);
                            isLoading = false;
                        },
                        (progress) => {
                            if (progress.lengthComputable) {
                                const percentComplete = (progress.loaded / progress.total) * 50 + 30;
                                updateLoadingProgress(`Cargando modelo... ${Math.round(percentComplete)}%`, percentComplete);
                            }
                        },
                        (error) => {
                            console.error('❌ Error al cargar OBJ:', error);
                            updateLoadingProgress('Error al cargar el modelo', 0);
                            isLoading = false;
                        }
                    );
                },
                (progress) => {
                    if (progress.lengthComputable) {
                        const percentComplete = (progress.loaded / progress.total) * 20 + 10;
                        updateLoadingProgress(`Cargando materiales... ${Math.round(percentComplete)}%`, percentComplete);
                    }
                },
                (error) => {
                    console.error('❌ Error al cargar MTL:', error);
                    updateLoadingProgress('Error al cargar materiales', 0);
                    isLoading = false;
                }
            );
        }
    }
}

// Función para crear loading spinner
function createLoadingSpinner() {
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'model-loading';
    loadingContainer.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <div class="loading-text">Cargando modelo...</div>
            <div class="loading-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <div class="progress-text">Preparando...</div>
            </div>
        </div>
    `;
    
    return loadingContainer;
}

// Función para actualizar el progreso de carga
function updateLoadingProgress(text, percentage) {
    const progressText = document.querySelector('.progress-text');
    const progressFill = document.querySelector('.progress-fill');
    
    if (progressText) progressText.textContent = text;
    if (progressFill) progressFill.style.width = `${percentage}%`;
}

// Función para ocultar loading
function hideLoading(loadingElement) {
    loadingElement.classList.add('hide');
    setTimeout(() => {
        if (loadingElement.parentNode) {
            loadingElement.parentNode.removeChild(loadingElement);
        }
    }, 500);
}

// Función universal para cargar diferentes tipos de modelos
export function loadModel(modelPath, format = 'auto', onProgress = null) {
    return new Promise((resolve, reject) => {
        // Detectar formato automáticamente si no se especifica
        if (format === 'auto') {
            const extension = modelPath.split('.').pop().toLowerCase();
            format = extension;
        }
        
        let loader;
        
        switch (format) {
            case 'gltf':
            case 'glb':
                loader = new GLTFLoader();
                loader.load(
                    modelPath,
                    (gltf) => resolve(gltf.scene),
                    onProgress,
                    reject
                );
                break;
                
            case 'fbx':
                loader = new FBXLoader();
                loader.load(
                    modelPath,
                    resolve,
                    onProgress,
                    reject
                );
                break;
                
            case 'stl':
                loader = new STLLoader();
                loader.load(
                    modelPath,
                    (geometry) => {
                        const material = new THREE.MeshStandardMaterial({ 
                            color: 0x888888,
                            roughness: 0.5,
                            metalness: 0.1
                        });
                        const mesh = new THREE.Mesh(geometry, material);
                        resolve(mesh);
                    },
                    onProgress,
                    reject
                );
                break;
                
            case 'obj':
                // Para OBJ, necesitamos verificar si hay MTL
                const basePath = modelPath.substring(0, modelPath.lastIndexOf('.'));
                const mtlPath = basePath + '.mtl';
                
                const mtlLoader = new MTLLoader();
                mtlLoader.setPath(modelPath.substring(0, modelPath.lastIndexOf('/') + 1));
                
                // Intentar cargar MTL primero
                mtlLoader.load(
                    mtlPath.split('/').pop(),
                    (materials) => {
                        materials.preload();
                        const objLoader = new OBJLoader();
                        objLoader.setMaterials(materials);
                        objLoader.setPath(modelPath.substring(0, modelPath.lastIndexOf('/') + 1));
                        objLoader.load(
                            modelPath.split('/').pop(),
                            resolve,
                            onProgress,
                            reject
                        );
                    },
                    undefined,
                    () => {
                        // Si no hay MTL, cargar solo OBJ
                        const objLoader = new OBJLoader();
                        objLoader.load(modelPath, resolve, onProgress, reject);
                    }
                );
                break;
                
            default:
                reject(new Error(`Formato no soportado: ${format}`));
        }
    });
}

// Función mejorada para crear viewer con cualquier modelo
export function createModelViewer(containerId, modelPath, options = {}) {
    const defaultOptions = {
        format: 'auto',
        scale: 1,
        autoRotate: false,
        enableControls: true,
        lightIntensity: 1,
        backgroundColor: 0x000000,
        backgroundAlpha: 0
    };
    
    const config = { ...defaultOptions, ...options };
    
    return initModelViewer(containerId, modelPath, config);
}
