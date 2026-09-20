export default function GabrielaPage() {
    const page = document.createElement('section');
    page.className = 'caja magic-page';
    page.innerHTML = `
        <h1 class="magic-heading">Gabriela</h1>
        <p class="text magic-intro">Hay preguntas que solo Gabriela puede responder.</p>
        <div class="magic-viewer" aria-label="Bola mágica de Gabriela en 3D"></div>
        <p class="magic-answer" role="status" aria-live="polite">Tu próxima respuesta está aquí dentro.</p>
        <form class="magic-form">
            <label for="magic-question">¿Qué quieres saber?</label>
            <p id="magic-hint">Haz una pregunta que se pueda responder con sí o no.</p>
            <div class="magic-input-row">
                <input id="magic-question" name="question" type="text" maxlength="240" required
                    placeholder="¿Hoy será un buen día?" autocomplete="off" aria-describedby="magic-hint">
                <button type="submit" disabled>Preparando…</button>
            </div>
        </form>
        <p class="magic-note">Un poco de misterio, un poco de azar. Solo por diversión.</p>
    `;

    GabrielaPage.afterRender = () => {
        const container = page.querySelector('.magic-viewer');
        const form = page.querySelector('form');
        const input = page.querySelector('input');
        const button = page.querySelector('button');
        const status = page.querySelector('.magic-answer');
        let disposed = false;
        let viewer;
        let busy = false;
        import('../magic-eight-ball.js').then(({ createMagicEightBall }) => {
            if (disposed) return;
            viewer = createMagicEightBall(container);
            button.disabled = false;
            button.textContent = 'Preguntar';
        }).catch(() => {
            if (disposed) return;
            status.textContent = 'No se pudo abrir la bola 3D. Recarga la página para volver a intentarlo.';
            button.textContent = 'No disponible';
        });

        const ask = (event) => {
            event.preventDefault();
            if (busy || !viewer) return;
            if (!input.value.trim()) {
                input.setCustomValidity('Escribe una pregunta primero.');
                input.reportValidity();
                return;
            }
            busy = true;
            button.disabled = true;
            button.textContent = 'Consultando…';
            status.textContent = 'Gabriela está consultando al universo…';
            container.setAttribute('aria-busy', 'true');
            viewer.ask((answer) => {
                if (disposed) return;
                busy = false;
                button.disabled = false;
                button.textContent = 'Preguntar otra vez';
                status.textContent = answer;
                container.setAttribute('aria-busy', 'false');
            });
        };
        const clearValidity = () => input.setCustomValidity('');
        input.addEventListener('input', clearValidity);
        form.addEventListener('submit', ask);
        return () => {
            disposed = true;
            viewer?.dispose();
            input.removeEventListener('input', clearValidity);
            form.removeEventListener('submit', ask);
        };
    };
    return page;
}
