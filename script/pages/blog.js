export default function BlogPage() {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="caja"> <!-- Aviso de construccion -->
    <div class="pretitle" style="text-align: center;">
        <p>| Sitio en construcción |</p>
        <p>&nbsp;</p>
        <p>disculpe las molestias</p>
    </div>
</div>

<div class="caja"> <!-- Imagen de Lain Iwakura -->
    <p><img src="img/misc/wired.gif" alt="Lain Iwakura on wired" width="100%" height="100%"></p>
    <p>&nbsp;</p>
</div>

<div class="resistencia-container"> <!-- Separador de resistencia -->
    <div class="cable"></div>
    <hr class="resistencia">
    <div class="cable"></div>
</div>
<p>&nbsp;</p>

<div class="caja"> <!-- Debug -->
    <div class="title">Debug: 2025-03-29</div>
    <div class="text">
        <p>- Incorporación de three.js incluyendo a Pineda 2000 en la portada de la página.</p>
        <p>- Cambio total de la apariencia de la página.</p>
        <p>- Actualización en Internet Archive</p>
    </div>
</div>

<div class="resistencia-container"> <!-- Separador de resistencia -->
    <div class="cable"></div>
    <hr class="resistencia">
    <div class="cable"></div>
</div>
<p>&nbsp;</p>

<div class="caja"> <!-- Debug -->
    <div class="title">Debug: 2025-01-03</div>
    <div class="text">
        <p>- Cambio total de la apariencia de la página.</p>
        <p>- Actualización en Internet Archive</p>
        <p>- Eliminación de actualizar.html.</p>
    </div>
</div>

<div class="resistencia-container"> <!-- Separador de resistencia -->
    <div class="cable"></div>
    <hr class="resistencia">
    <div class="cable"></div>
</div>
<p>&nbsp;</p>

<div class="caja"> <!-- Debug -->
    <div class="title">Debug: 2024-07-01</div>
    <div class="text">
        <p>- Cambio de presentación de la Formación en la pagina de inicio.</p>
        <p>- Agregado el proyecto de Marengo.</p>
        <p>- Actualizado la info en Sobre mi en la página principal.</p>
        <p>- Uso de blog.html para el debug :p.</p>
        <p>- Ahora en proyectos, el blackjack redirige a la página del proyecto en github.</p>
    </div>
</div>

<div class="resistencia-container"> <!-- Separador de resistencia -->
    <div class="cable"></div>
    <hr class="resistencia">
    <div class="cable"></div>
</div>
<p>&nbsp;</p>

 
<div class="caja"> <!-- Debug -->
    <div class="title">Debug: 2024-05-27</div>
    <div class="text">
        <p>- Arreglado el problema de la fuente Consolas.ttf</p>
        <p>- Agregago el aviso Sitio en construcción.</p>
        <p>- Agregado Novedades.</p>
        <p>- Arreglado el problema de la barra de navegación.</p>
        <p>- Actualización de proyectos.</p>
        <p>- Formateo de código más legible.</p>
    </div>
</div>
    `;
    return div;
  }
  