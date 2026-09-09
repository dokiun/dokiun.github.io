import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

// Cache independiente para cada modelo seleccionado
const modelCache = new Map();

export function initModelViewer(containerElement, modelConfig = {}) {
    if (!containerElement) return;

    const config = {
        obj: 'Ensamble.obj',
        mtl: 'Ensamble.mtl',
        ...modelConfig
    };
    const cacheKey = `${config.obj}|${config.mtl}`;
    let model;
    let animationFrame;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 0);

    while (containerElement.firstChild) {
        containerElement.removeChild(containerElement.firstChild);
    }

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerElement.appendChild(renderer.domElement);

    const loadingElement = createLoadingSpinner();
    containerElement.appendChild(loadingElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(10, 10, 10);
    scene.add(light);

    const handleMouseMove = (event) => {
        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;
        targetRotationY = THREE.MathUtils.clamp((x - 0.5) * Math.PI, -Math.PI / 4, Math.PI / 4);
        targetRotationX = (y - 0.5) * Math.PI * 0.15;
    };
    document.addEventListener('mousemove', handleMouseMove);

    loadModelWithCache(scene, camera, loadingElement, config, cacheKey, (loadedModel) => {
        model = loadedModel;
    });

    function animate() {
        animationFrame = requestAnimationFrame(animate);

        if (model) {
            model.rotation.y += (targetRotationY - model.rotation.y) * 0.05;
            model.rotation.x += (targetRotationX - model.rotation.x) * 0.05;
        }

        renderer.render(scene, camera);
    }
    animate();

    function resize() {
        const width = containerElement.clientWidth;
        const height = containerElement.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
    window.addEventListener('resize', resize);
    resize();

    return () => {
        cancelAnimationFrame(animationFrame);
        document.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', resize);
        renderer.dispose();
        containerElement.replaceChildren();
    };
}

function loadModelWithCache(scene, camera, loadingElement, config, cacheKey, onModelLoaded) {
    const cachedModel = modelCache.get(cacheKey);
    if (cachedModel) {
        const clonedModel = cachedModel.model.clone();
        onModelLoaded(clonedModel);
        const model = clonedModel;
        scene.add(model);
        camera.position.set(cachedModel.size * 1.6, 0, 0);
        camera.lookAt(0, 0, 0);
        hideLoading(loadingElement);
        return;
    }

    updateLoadingProgress('Cargando materiales...', 10);
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath('/models/');
    mtlLoader.load(config.mtl,
        (materials) => {
            materials.preload();
            updateLoadingProgress('Materiales cargados, cargando modelo...', 30);

            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('/models/');
            objLoader.load(config.obj,
                (obj) => {
                    updateLoadingProgress('Procesando modelo...', 80);
                    const box = new THREE.Box3().setFromObject(obj);
                    const center = box.getCenter(new THREE.Vector3());
                    const size = box.getSize(new THREE.Vector3()).length();
                    const scaleFactor = 2.05;
                    obj.scale.set(scaleFactor, scaleFactor, scaleFactor);
                    obj.position.sub(center.multiplyScalar(scaleFactor));

                    modelCache.set(cacheKey, { model: obj, size });
                    const clonedModel = obj.clone();
                    onModelLoaded(clonedModel);
                    const model = clonedModel;
                    scene.add(model);
                    camera.position.set(size * 1.6, 0, 0);
                    camera.lookAt(0, 0, 0);
                    updateLoadingProgress('¡Modelo cargado!', 100);
                    setTimeout(() => hideLoading(loadingElement), 500);
                },
                (progress) => {
                    if (progress.lengthComputable) {
                        const percentComplete = (progress.loaded / progress.total) * 50 + 30;
                        updateLoadingProgress(`Cargando modelo... ${Math.round(percentComplete)}%`, percentComplete);
                    }
                },
                (error) => {
                    console.error('Error al cargar OBJ:', error);
                    updateLoadingProgress('Error al cargar el modelo', 0);
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
            console.error('Error al cargar MTL:', error);
            updateLoadingProgress('Error al cargar materiales', 0);
        }
    );
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
    const container = typeof containerId === 'string'
        ? document.getElementById(containerId)
        : containerId;
    const modelConfig = {
        obj: modelPath.split('/').pop(),
        mtl: config.mtl || `${modelPath.substring(0, modelPath.lastIndexOf('.'))}.mtl`
    };

    return initModelViewer(container, modelConfig);
}
