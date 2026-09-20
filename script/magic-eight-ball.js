import * as THREE from 'three';

const answers = [
    'Sin duda', 'Sí, definitivamente', 'Puedes contar con ello', 'Todo apunta a que sí',
    'Las señales dicen que sí', 'Lo más probable', 'Tienes buena suerte', 'Parece prometedor',
    'Sí', 'Confía en ello', 'Pregunta de nuevo', 'Ahora no está claro',
    'Mejor no decirlo aún', 'No puedo predecirlo', 'Concéntrate y pregunta',
    'No cuentes con ello', 'Mi respuesta es no', 'Las señales dicen que no',
    'No parece probable', 'Lo dudo mucho', 'Está bien', 'No', 'Tal vez', 'No sé',
    'No estaría segura de eso', 'Eso sería peor', 'Mmmmm'
];

export function createMagicEightBall(container) {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 30);
    camera.position.set(0, 0, 5.2);
    scene.add(new THREE.HemisphereLight(0xcdd7ff, 0x252033, 2));
    const key = new THREE.DirectionalLight(0xffffff, 4);
    key.position.set(-3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xd2738a, 3);
    rim.position.set(3, 1, -2);
    scene.add(rim);

    const ball = new THREE.Group();
    scene.add(ball);
    ball.add(new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48),
        new THREE.MeshPhysicalMaterial({ color: 0x2d193f, roughness: 0.2, metalness: 0.15, clearcoat: 1 })));

    const textures = [];
    function makeDisc(back) {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 512;
        const context = canvas.getContext('2d');
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        textures.push(texture);
        const mesh = new THREE.Mesh(new THREE.CircleGeometry(back ? 0.52 : 0.43, 64),
            new THREE.MeshBasicMaterial({ map: texture, side: THREE.FrontSide }));
        mesh.position.z = back ? -1.008 : 1.008;
        if (back) mesh.rotation.y = Math.PI;
        ball.add(mesh);
        return { context, texture };
    }
    const front = makeDisc(false);
    front.context.fillStyle = '#f2eee8';
    front.context.fillRect(0, 0, 512, 512);
    front.context.fillStyle = '#101117';
    front.context.font = 'bold 390px Arial';
    front.context.textAlign = 'center';
    front.context.textBaseline = 'middle';
    front.context.fillText('G', 256, 275);
    front.texture.needsUpdate = true;
    const back = makeDisc(true);
    function drawAnswer(answer) {
        const ctx = back.context;
        ctx.fillStyle = '#080b24';
        ctx.fillRect(0, 0, 512, 512);
        const glow = ctx.createRadialGradient(256, 260, 20, 256, 260, 255);
        glow.addColorStop(0, '#405ce6');
        glow.addColorStop(1, '#080b24');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, 512, 512);
        ctx.beginPath();
        ctx.moveTo(256, 62);
        ctx.lineTo(465, 410);
        ctx.lineTo(47, 410);
        ctx.closePath();
        ctx.fillStyle = '#233aa5';
        ctx.fill();
        ctx.strokeStyle = '#879eff';
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 31px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const lines = [];
        let line = '';
        for (const word of answer.toUpperCase().split(' ')) {
            const candidate = line ? `${line} ${word}` : word;
            if (ctx.measureText(candidate).width > 255 && line) {
                lines.push(line);
                line = word;
            } else line = candidate;
        }
        lines.push(line);
        lines.forEach((text, index) => ctx.fillText(text, 256, 285 + (index - (lines.length - 1) / 2) * 39));
        back.texture.needsUpdate = true;
    }
    drawAnswer('');
    const resize = new ResizeObserver(() => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
    resize.observe(container);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    let active;
    let rotation = 0;
    let previousAnswer = -1;
    function animate(now) {
        frame = requestAnimationFrame(animate);
        if (active) {
            const t = Math.min((now - active.start) / active.duration, 1);
            const ease = t * t * (3 - 2 * t);
            rotation = active.from + (active.to - active.from) * ease;
            const shake = reducedMotion.matches ? 0 : Math.sin(Math.PI * t);
            ball.position.x = Math.sin(t * 65) * 0.09 * shake;
            ball.rotation.z = Math.sin(t * 48) * 0.13 * shake;
            if (t > 0.85 && !active.revealed) {
                drawAnswer(active.answer);
                active.revealed = true;
            }
            if (t === 1) {
                const done = active;
                active = null;
                done.onComplete(done.answer);
            }
        }
        ball.rotation.y = rotation;
        ball.position.y = reducedMotion.matches ? 0 : Math.sin(now * 0.0015) * 0.045;
        renderer.render(scene, camera);
    }
    frame = requestAnimationFrame(animate);
    return {
        ask(onComplete) {
            if (active) return;
            let index;
            do { index = Math.floor(Math.random() * answers.length); } while (index === previousAnswer);
            previousAnswer = index;
            drawAnswer('');
            active = {
                start: performance.now(), duration: reducedMotion.matches ? 180 : 2600,
                from: rotation, to: rotation === 0 ? Math.PI * 3 : rotation + Math.PI * 2,
                answer: answers[index], onComplete
            };
        },
        dispose() {
            cancelAnimationFrame(frame);
            active = null;
            resize.disconnect();
            scene.traverse(object => {
                object.geometry?.dispose();
                object.material?.dispose();
            });
            textures.forEach(texture => texture.dispose());
            renderer.dispose();
            renderer.domElement.remove();
        }
    };
}
