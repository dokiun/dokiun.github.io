function HomePage() {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="caja">
      <div class="title"><p>Modelo 3D:</p></div>
      <div id="viewer3d" style="width: 100%; height: 500px;"></div>
    </div>
  
    <p>&nbsp;</p>
    <div class="resistencia-container">
      <div class="cable"></div>
      <hr class="resistencia">
      <div class="cable"></div>
    </div>
    <p>&nbsp;</p>
  
    <div class="caja">
      <div class="title">Sobre mí:</div>
      <div class="text">
        <p>Bachiller Técnico Mecatrónico y Estudiante de Ingeniería Mecánica con formación en diversas áreas de diseño y/o selección de elementos de máquinas, selección de materiales, sistemas neumáticos e hidráulicos y elementos de automatización...</p>
        <p>&nbsp;</p>
        <p>Para conocer los proyectos en los que estoy trabajando y he trabajado visita la página "Proyectos" o haz <a class="link" href="#/proyectos">click aquí</a>.</p>
      </div>
    </div>
  
    <p>&nbsp;</p>
    <div class="resistencia-container">
      <div class="cable"></div>
      <hr class="resistencia">
      <div class="cable"></div>
    </div>
    <p>&nbsp;</p>
  
    <div class="caja">
      <div class="title"><p>Formación:</p></div>
      <p>&nbsp;</p>
      <div class="cards">
        <div class="card">
          <img src="img/svg/oea_logo.svg" class="card-img" alt="Logo OEA">
          <div class="card-body">
            <h1 class="card-title">Técnico Mecatrónico</h1>
            <p class="card-sub">Colegio OEA</p>
            <p class="card-sub">2018-2019</p>
          </div>
        </div>
        <div class="card">
          <img src="img/svg/unal_logo.svg" class="card-img" alt="Logo UNAL">
          <div class="card-body">
            <h1 class="card-title">Ingeniería Mecánica</h1>
            <p class="card-sub">Universidad Nacional de Colombia</p>
            <p class="card-sub">2020-Actualidad</p>
          </div>
        </div>
        <div class="card">
          <img src="img/svg/sena_logo.svg" class="card-img" alt="Logo SENA">
          <div class="card-body">
            <h1 class="card-title">SENA</h1>
            <p class="card-sub">- Autocad 2D</p>
            <p class="card-sub">- Elementos de máquinas</p>
            <p class="card-sub">- Introd. a Sistemas de Automatización</p>
          </div>
        </div>
      </div>
    </div>
  
    <p>&nbsp;</p>
    <div class="resistencia-container">
      <div class="cable"></div>
      <hr class="resistencia">
      <div class="cable"></div>
    </div>
    <p>&nbsp;</p>
  
    <div class="caja">
      <p><img src="img/blog/20221010_180327.jpg" alt="Lain Iwakura on wired" width="100%" height="100%"></p>
      <div class="text">
        <a class="link" href="https://maps.app.goo.gl/gbc1xEZzsX6yznfx9" target="_blank">Click aquí</a> para conocer las coordenadas de esta foto.
      </div>
    </div>
  
    <p>&nbsp;</p>
    <div class="resistencia-container">
      <div class="cable"></div>
      <hr class="resistencia">
      <div class="cable"></div>
    </div>
    <p>&nbsp;</p>
  
    <div class="caja">
      <div class="text">
        <p>- Aprendiendo desarrollo web básico.</p>
        <p>- Aprendiendo análisis de datos.</p>
        <p>- Aprendiendo Matlab.</p>
        <p>- Aprendiendo Python.</p>
      </div>
      <div class="text">
        <a class="link" href="#/about">Click aquí</a> para conocer un poco más sobre mí.
      </div>
      <div class="text">
        <a class="link" href="#/blog">Click aquí</a> para el Debug.
      </div>
    </div>
    `;
  
    return div;
      
  }

  HomePage.afterRender = () => {
    const container = document.getElementById('viewer3d');
    if (container) {
      // Verificar si el elemento está visible antes de cargar el modelo
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Solo cargar cuando el contenedor sea visible
            import('/script/model-viewer.js').then(module => {
              module.initModelViewer(container);
            }).catch(error => {
              console.error('Error al cargar el modelo 3D:', error);
              // Mostrar un fallback en caso de error
              container.innerHTML = `
                <div style="
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
                  height: 100%; 
                  color: #666; 
                  flex-direction: column;
                  text-align: center;
                  padding: 2rem;
                ">
                  <div style="font-size: 2rem; margin-bottom: 1rem;">🛠️</div>
                  <div>PINEDA 2000</div>
                  <div style="font-size: 0.8rem; margin-top: 0.5rem;">Modelo 3D no disponible</div>
                </div>
              `;
            });
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '100px' // Cargar cuando esté 100px antes de ser visible
      });
      
      observer.observe(container);
    }
  };
  
  export default HomePage;
  