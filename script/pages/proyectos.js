export default function ProyectosPage() {
    const div = document.createElement('div');
    div.innerHTML = `
      <script src="script\menu-desp.js"></script>

<div class="caja">
<div class="faq-container">
    <details> <!-- Análisis de datos CyT -->
      <summary> <!-- Título del proyecto -->
        <span class="faq-title">
            Pineda 2000 - IME
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="expand-icon" width="24" height="24" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 6l6 6l-6 6"></path>
        </svg>
      </summary>
      <div class="faq-content"> <!-- Contenido del proyecto -->
        <p>Cálculos, diseño y construcción de un transformador AC (requisito para aprobar la materia de Instalaciones y Máquinas Eléctricas [IME]).</p>
        </p>
        <p>&nbsp;</p>
         <p><a class="link" href="https://www.overleaf.com/read/ntrgtkrnpknf#a11acb" target="_blank"  >Enlace -></a></p>
      </div>
    </details>
    <details> <!-- Blackjack -->
      <summary>
        <span class="faq-title"> <!-- Título del proyecto -->
            Blackjack - PDC
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="expand-icon" width="24" height="24" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 6l6 6l-6 6"></path>
        </svg>
      </summary>
      <div class="faq-content"> <!-- Contenido del proyecto -->
        <p>Programa de blackjack en python, incluye interfaz gráfica y juego contra la máquina. Realizado en la materia de Programación de Computadores [PDC].
        realizado en su totalidad por mi.</p>
        <p>&nbsp;</p>
         <p><a class="link" href="https://github.com/dokiun/blackjack" target="_blank"  >Enlace -></a></p>
      </div>
    </details>
    <details> <!-- Repositorio CAD -->
      <summary>
        <span class="faq-title"> <!-- Título del proyecto -->
            Repositorio CAD
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="expand-icon" width="24" height="24" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 6l6 6l-6 6"></path>
        </svg>
      </summary>
      <div class="faq-content"> <!-- Contenido del proyecto -->
        <p>Un pequeño repertorio de la materia de Dibujo de Máquinas, incluye dibujos de piezas, ensambles y despieces.</p>
        <p>&nbsp;</p>
         <p><a class="link" href="#" target="_blank"  >Enlace -></a></p>
      </div>
    </details>
    <details> <!-- Página WEB -->
        <summary>
          <span class="faq-title"> <!-- Título del proyecto -->
              Página WEB
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" class="expand-icon" width="24" height="24" viewBox="0 0 24 24"
            stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 6l6 6l-6 6"></path>
          </svg>
        </summary>
        <div class="faq-content"> <!-- Contenido del proyecto -->
          <p>Ésta página web en su totalidad está desarrollada por mi, inluye HTML y CSS, además de un poco de JavaScript.</p>
          <p>&nbsp;</p>
           <p><a class="link" href="index.html"  >Enlace -></a></p>
        </div>
    </details>
    <details> <!-- Planta de GIA -->
      <summary>
        <span class="faq-title"> <!-- Título del proyecto -->
            Peletizadora Marengo - GIA
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="expand-icon" width="24" height="24" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 6l6 6l-6 6"></path>
        </svg>
      </summary>
      <div class="faq-content"> <!-- Contenido del proyecto -->
        <p>Un proyecto de remodelación, diseño y adecuación de un espacio en Marengo para una máquina de peletizado de alimento para los animales en la granja de Marengo, en conjunto con demás integrantes del Grupo de Investigación Agrícola (GIA).</p>
        <p>&nbsp;</p>
         <p><a class="link" href="index.html"  >Enlace -></a></p>
      </div>
  </details>
</div>
</div>
<script src="script\acordeon.js"></script>
    `;
    return div;
  }
  