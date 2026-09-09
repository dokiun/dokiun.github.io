import { initAccordions } from '../acordeon.js';

export default function MiniRobotsPage() {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="caja">
        <div class="faq-container">
          <details>
            <summary>
              <span class="faq-title">IA - Mini Robots</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="expand-icon" width="24" height="24" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 6l6 6l-6 6"></path>
              </svg>
            </summary>
            <div class="faq-content">
              <p>Texto de muestra para la página de IA y Mini Robots.</p>
            </div>
          </details>
        </div>
      </div>
    `;

    MiniRobotsPage.afterRender = () => initAccordions(div);

    return div;
}