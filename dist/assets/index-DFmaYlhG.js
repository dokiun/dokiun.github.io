(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const t of i.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&l(t)}).observe(document,{childList:!0,subtree:!0});function o(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(s){if(s.ep)return;s.ep=!0;const i=o(s);fetch(s.href,i)}})();const h="modulepreload",w=function(e){return"/"+e},p={},b=function(a,o,l){let s=Promise.resolve();if(o&&o.length>0){document.getElementsByTagName("link");const t=document.querySelector("meta[property=csp-nonce]"),r=(t==null?void 0:t.nonce)||(t==null?void 0:t.getAttribute("nonce"));s=Promise.allSettled(o.map(c=>{if(c=w(c),c in p)return;p[c]=!0;const n=c.endsWith(".css"),u=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const d=document.createElement("link");if(d.rel=n?"stylesheet":h,n||(d.as="script"),d.crossOrigin="",d.href=c,r&&d.setAttribute("nonce",r),document.head.appendChild(d),n)return new Promise((_,v)=>{d.addEventListener("load",_),d.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(t){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=t,window.dispatchEvent(r),!r.defaultPrevented)throw t}return s.then(t=>{for(const r of t||[])r.status==="rejected"&&i(r.reason);return a().catch(i)})};function g(){const e=document.createElement("div");return e.innerHTML=`
    <div class="caja">
      <div class="title"><p>Pineda 2000:</p></div>
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
    `,e}g.afterRender=()=>{const e=document.getElementById("viewer3d");e&&b(()=>import("./model-viewer-ClFR6lzd.js"),[]).then(a=>{a.initModelViewer(e)})};function f(){const e=document.createElement("div");return e.innerHTML=`
      <!-- Spotify -->

<div class="caja">
    <div class="title"></div>
    <div class="title">Música:</div>
    <div class="text">Enlace a mi perfil de Spotify <a href="https://open.spotify.com/user/18x7ntzds908u1orse2s8anw6?si=99b32c4587f14b81" target="_blank" style="color: #00ACC1">aquí</a>.</div>
    
    <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0BkSNNbQcXXxpKtHSFyBGE?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/1rcPYNgEypcQL9vh5ezDV0?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/32to6veMfC1V27GEwfnWnS?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
</div>

<p>&nbsp;</p>
<div class="resistencia-container">
    <div class="cable"></div>
    <hr class="resistencia">
    <div class="cable"></div>
</div>
<p>&nbsp;</p>

<!-- Letterbox -->

<div class="caja">
    <div class="title">Películas:</div>
    <div class="text">Enlace a mi perfil de Letterboxd <a href="https://letterboxd.com/dokiun/" target="_blank" style="color: #00ACC1">aquí</a>.</div>
</div>

<p>&nbsp;</p>
<div class="resistencia-container">
    <div class="cable"></div>
    <hr class="resistencia">
    <div class="cable"></div>
</div>
<p>&nbsp;</p>

<!-- goodreads -->

<div class="caja">
    <p><div class="title">Libros:</div></p>
    <div class="text">Enlace a mi perfil de Goodreads <a href="https://www.goodreads.com/user/show/174451467-mateo-vargas" target="_blank" style="color: #00ACC1">aquí</a>.</div>
    <p>&nbsp;</p>
    <div>
          <!-- Show static HTML/CSS as a placeholder in case js is not enabled - javascript include will override this if things work -->
          <style type="text/css" media="screen">
            .gr_custom_container_1715743582 {
              /* customize your Goodreads widget container here*/
              border: 1px solid gray;
              border-radius:10px;
              padding: 10px 5px 10px 5px;
              background-color: white;
              color: black;
              
            }
            .gr_custom_header_1715743582 {
              /* customize your Goodreads header here*/
              border-bottom: 1px solid gray;
              width: 100%;
              margin-bottom: 5px;
              text-align: center;
              font-size: 120%
            }
            .gr_custom_each_container_1715743582 {
              /* customize each individual book container here */
              width: 100%;
              clear: both;
              margin-bottom: 10px;
              overflow: auto;
              padding-bottom: 4px;
              border-bottom: 1px solid #aaa;
            }
            .gr_custom_book_container_1715743582 {
              /* customize your book covers here */
              overflow: hidden;
              height: 60px;
                float: left;
                margin-right: 4px;
                width: 39px;
            }
            .gr_custom_author_1715743582 {
              /* customize your author names here */
              font-size: 10px;
            }
            .gr_custom_tags_1715743582 {
              /* customize your tags here */
              font-size: 10px;
              color: gray;
            }
            .gr_custom_rating_1715743582 {
              /* customize your rating stars here */
              float: right;
            }
          </style>
          
                <div id="gr_custom_widget_1715743582">
                    <div class="gr_custom_container_1715743582">
              <h2 class="gr_custom_header_1715743582">
              <a style="text-decoration: none;" rel="nofollow" href="https://www.goodreads.com/review/list/174451467-mateo-vargas?shelf=read&amp;utm_medium=api&amp;utm_source=custom_widget">Librería de Mateo: Ledos</a>
              </h2>
                <div class="gr_custom_each_container_1715743582">
                    <div class="gr_custom_book_container_1715743582">
                      <a title="Pyongyang: A Journey in North Korea" rel="nofollow" href="https://www.goodreads.com/review/show/6432953082?utm_medium=api&amp;utm_source=custom_widget"><img alt="Pyongyang: A Journey in North Korea" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1518211422l/37941795._SX50_.jpg" /></a>
                    </div>
                    <div class="gr_custom_rating_1715743582">
                      <span class=" staticStars notranslate" title="really liked it"><img alt="really liked it" src="https://s.gr-assets.com/images/layout/gr_red_star_active.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_active.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_active.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_active.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /></span>
                    </div>
                    <div class="gr_custom_title_1715743582">
                      <a rel="nofollow" href="https://www.goodreads.com/review/show/6432953082?utm_medium=api&amp;utm_source=custom_widget">Pyongyang: A Journey in North Korea</a>
                    </div>
                    <div class="gr_custom_author_1715743582">
                      by <a rel="nofollow" href="https://www.goodreads.com/author/show/46027.Guy_Delisle">Guy Delisle</a>
                    </div>
                    <div class="gr_custom_review_1715743582">
                      El estilo de la ilustración es agradable, para los aficionados o curiosos de Corea del Norte ésta historieta llenará algunos vacíos que tienen documentales sobre Corea del Norte. Los comentarios que hace el autor son cuanto menos curioso...
                    </div>
                </div>
                <div class="gr_custom_each_container_1715743582">
                    <div class="gr_custom_book_container_1715743582">
                      <a title="Del sentido de la vida" rel="nofollow" href="https://www.goodreads.com/review/show/6222223644?utm_medium=api&amp;utm_source=custom_widget"><img alt="Del sentido de la vida" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1442273619l/26530986._SY75_.jpg" /></a>
                    </div>
                    <div class="gr_custom_rating_1715743582">
                      <span class=" staticStars notranslate" title="really liked it"><img alt="really liked it" src="https://s.gr-assets.com/images/layout/gr_red_star_active.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_active.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_active.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_active.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /></span>
                    </div>
                    <div class="gr_custom_title_1715743582">
                      <a rel="nofollow" href="https://www.goodreads.com/review/show/6222223644?utm_medium=api&amp;utm_source=custom_widget">Del sentido de la vida</a>
                    </div>
                    <div class="gr_custom_author_1715743582">
                      by <a rel="nofollow" href="https://www.goodreads.com/author/show/197400.Jean_Grondin">Jean Grondin</a>
                    </div>
                    <div class="gr_custom_review_1715743582">
                      Es un ensayo que explora distintos argumentos filosóficos, cita 71 aportes en todo el libro, viene bien estructurado en 12 capítulos, en mi experiencia personal un poco difícil de leer y seguirle el hilo al autor, tal vez porque no suelo...
                    </div>
                </div>
                <div class="gr_custom_each_container_1715743582">
                    <div class="gr_custom_book_container_1715743582">
                      <a title="Los que habitan el abismo" rel="nofollow" href="https://www.goodreads.com/review/show/6177442462?utm_medium=api&amp;utm_source=custom_widget"><img alt="Los que habitan el abismo" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1677810860l/22913581._SY75_.jpg" /></a>
                    </div>
                    <div class="gr_custom_rating_1715743582">
                      <span class=" staticStars notranslate" title="really liked it"><img alt="really liked it" src="https://s.gr-assets.com/images/layout/gr_red_star_active.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_active.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_active.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_active.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /></span>
                    </div>
                    <div class="gr_custom_title_1715743582">
                      <a rel="nofollow" href="https://www.goodreads.com/review/show/6177442462?utm_medium=api&amp;utm_source=custom_widget">Los que habitan el abismo</a>
                    </div>
                    <div class="gr_custom_author_1715743582">
                      by <a rel="nofollow" href="https://www.goodreads.com/author/show/14530043.Diego_Petersen_Farah">Diego Petersen Farah</a>
                    </div>
                    <div class="gr_custom_review_1715743582">
                      El formato de pequeños capítulos es muy agradable de leer, sobretodo que se acomoda a pequeñas lecturas, que pueden terminar siendo no muy pequeñas por la intriga que deja cada final de capítulo. Los personajes van tomando relevancia a l...
                    </div>
                </div>
                <div class="gr_custom_each_container_1715743582">
                    <div class="gr_custom_book_container_1715743582">
                      <a title="Las edades de Lulú" rel="nofollow" href="https://www.goodreads.com/review/show/6177440206?utm_medium=api&amp;utm_source=custom_widget"><img alt="Las edades de Lulú" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1377615206l/69483._SY75_.jpg" /></a>
                    </div>
                    <div class="gr_custom_rating_1715743582">
                      <span class=" staticStars notranslate" title="liked it"><img alt="liked it" src="https://s.gr-assets.com/images/layout/gr_red_star_active.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_active.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_active.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /></span>
                    </div>
                    <div class="gr_custom_title_1715743582">
                      <a rel="nofollow" href="https://www.goodreads.com/review/show/6177440206?utm_medium=api&amp;utm_source=custom_widget">Las edades de Lulú</a>
                    </div>
                    <div class="gr_custom_author_1715743582">
                      by <a rel="nofollow" href="https://www.goodreads.com/author/show/34291.Almudena_Grandes">Almudena Grandes</a>
                    </div>
                    <div class="gr_custom_review_1715743582">
                      Más que erotismo la narración está centrada en un relato más explícito, bastante, de hecho; maneja pedofilia, incesto y demás parafilias. La historia de Lulú es cuanto menos extraña, y parece estar no muy alejada del abuso sexual, inclus...
                    </div>
                </div>
            <br style="clear: both"/>
            <center>
              <a rel="nofollow" href="https://www.goodreads.com/"><img alt="goodreads.com" style="border:0" src="https://s.gr-assets.com/images/widget/widget_logo.gif" /></a>
            </center>
            <noscript>
              Share <a rel="nofollow" href="https://www.goodreads.com/">book reviews</a> and ratings with Mateo, and even join a <a rel="nofollow" href="https://www.goodreads.com/group">book club</a> on Goodreads.
            </noscript>
            </div>
          
                </div>
                <script src="https://www.goodreads.com/review/custom_widget/174451467.Mateo's%20bookshelf:%20read?cover_position=left&cover_size=small&num_books=5&order=d&shelf=read&show_author=1&show_cover=1&show_rating=1&show_review=1&show_tags=1&show_title=1&sort=date_added&widget_bg_color=1d1f20&widget_bg_transparent=&widget_border_width=1&widget_id=1715743582&widget_text_color=c9c9c9&widget_title_size=medium&widget_width=full" type="text/javascript" charset="utf-8"><\/script>

    </div>
    <div>
        <!-- Show static HTML/CSS as a placeholder in case js is not enabled - javascript include will override this if things work -->
      <style type="text/css" media="screen">
        .gr_custom_container_1715744031 {
          /* customize your Goodreads widget container here*/
          border: 1px solid gray;
          border-radius:10px;
          padding: 10px 5px 10px 5px;
          background-color: white;
          color: black;
          
        }
        .gr_custom_header_1715744031 {
          /* customize your Goodreads header here*/
          border-bottom: 1px solid gray;
          width: 100%;
          margin-bottom: 5px;
          text-align: center;
          font-size: 120%
        }
        .gr_custom_each_container_1715744031 {
          /* customize each individual book container here */
          width: 100%;
          clear: both;
          margin-bottom: 10px;
          overflow: auto;
          padding-bottom: 4px;
          border-bottom: 1px solid #aaa;
        }
        .gr_custom_book_container_1715744031 {
          /* customize your book covers here */
          overflow: hidden;
          height: 60px;
            float: left;
            margin-right: 4px;
            width: 39px;
        }
        .gr_custom_author_1715744031 {
          /* customize your author names here */
          font-size: 10px;
        }
        .gr_custom_tags_1715744031 {
          /* customize your tags here */
          font-size: 10px;
          color: gray;
        }
        .gr_custom_rating_1715744031 {
          /* customize your rating stars here */
          float: right;
        }
      </style>
      
            <div id="gr_custom_widget_1715744031">
                <div class="gr_custom_container_1715744031">
          <h2 class="gr_custom_header_1715744031">
          <a style="text-decoration: none;" rel="nofollow" href="https://www.goodreads.com/review/list/174451467-mateo-vargas?shelf=currently-reading&amp;utm_medium=api&amp;utm_source=custom_widget">Mateo&#39;s bookshelf: currently-reading</a>
          </h2>
            <div class="gr_custom_each_container_1715744031">
                <div class="gr_custom_book_container_1715744031">
                  <a title="El cadáver de papá" rel="nofollow" href="https://www.goodreads.com/review/show/6504890144?utm_medium=api&amp;utm_source=custom_widget"><img alt="El cadáver de papá" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1359918211l/17317465._SY75_.jpg" /></a>
                </div>
                <div class="gr_custom_rating_1715744031">
                  <span class=" staticStars notranslate"><img src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /></span>
                </div>
                <div class="gr_custom_title_1715744031">
                  <a rel="nofollow" href="https://www.goodreads.com/review/show/6504890144?utm_medium=api&amp;utm_source=custom_widget">El cadáver de papá</a>
                </div>
                <div class="gr_custom_author_1715744031">
                  by <a rel="nofollow" href="https://www.goodreads.com/author/show/1434462.Jaime_Manrique_Ardila">Jaime Manrique Ardila</a>
                </div>
                <div class="gr_custom_tags_1715744031">
                  tagged:
                  currently-reading
                </div>
            </div>
            <div class="gr_custom_each_container_1715744031">
                <div class="gr_custom_book_container_1715744031">
                  <a title="Armas y urnas. Historia de un genocidio político" rel="nofollow" href="https://www.goodreads.com/review/show/6376064106?utm_medium=api&amp;utm_source=custom_widget"><img alt="Armas y urnas. Historia de un genocidio político" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1234999362l/6271320._SY75_.jpg" /></a>
                </div>
                <div class="gr_custom_rating_1715744031">
                  <span class=" staticStars notranslate"><img src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /></span>
                </div>
                <div class="gr_custom_title_1715744031">
                  <a rel="nofollow" href="https://www.goodreads.com/review/show/6376064106?utm_medium=api&amp;utm_source=custom_widget">Armas y urnas. Historia de un genocidio político</a>
                </div>
                <div class="gr_custom_author_1715744031">
                  by <a rel="nofollow" href="https://www.goodreads.com/author/show/20480409.Steven_Dudley">Steven  Dudley</a>
                </div>
                <div class="gr_custom_tags_1715744031">
                  tagged:
                  currently-reading
                </div>
            </div>
            <div class="gr_custom_each_container_1715744031">
                <div class="gr_custom_book_container_1715744031">
                  <a title="1984" rel="nofollow" href="https://www.goodreads.com/review/show/6177448053?utm_medium=api&amp;utm_source=custom_widget"><img alt="1984" border="0" src="https://s.gr-assets.com/assets/nophoto/book/50x75-a91bf249278a81aabab721ef782c4a74.png" /></a>
                </div>
                <div class="gr_custom_rating_1715744031">
                  <span class=" staticStars notranslate"><img src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /><img alt="" src="https://s.gr-assets.com/images/layout/gr_red_star_inactive.png" /></span>
                </div>
                <div class="gr_custom_title_1715744031">
                  <a rel="nofollow" href="https://www.goodreads.com/review/show/6177448053?utm_medium=api&amp;utm_source=custom_widget">1984</a>
                </div>
                <div class="gr_custom_author_1715744031">
                  by <a rel="nofollow" href="https://www.goodreads.com/author/show/3706.George_Orwell">George Orwell</a>
                </div>
                <div class="gr_custom_tags_1715744031">
                  tagged:
                  currently-reading
                </div>
            </div>
        <br style="clear: both"/>
        <center>
          <a rel="nofollow" href="https://www.goodreads.com/"><img alt="goodreads.com" style="border:0" src="https://s.gr-assets.com/images/widget/widget_logo.gif" /></a>
        </center>
        <noscript>
          Share <a rel="nofollow" href="https://www.goodreads.com/">book reviews</a> and ratings with Mateo, and even join a <a rel="nofollow" href="https://www.goodreads.com/group">book club</a> on Goodreads.
        </noscript>
        </div>
      
            </div>
            <script src="https://www.goodreads.com/review/custom_widget/174451467.Mateo's%20bookshelf:%20currently-reading?cover_position=left&cover_size=small&num_books=5&order=d&shelf=currently-reading&show_author=1&show_cover=1&show_rating=1&show_review=1&show_tags=1&show_title=1&sort=date_added&widget_bg_color=1d1f20&widget_bg_transparent=&widget_border_width=1&widget_id=1715744031&widget_text_color=c9c9c9&widget_title_size=medium&widget_width=full" type="text/javascript" charset="utf-8"><\/script>
    </div>
</div>
<p>&nbsp;</p>
<div class="resistencia-container">
    <div class="cable"></div>
    <hr class="resistencia">
    <div class="cable"></div>
</div>
<p>&nbsp;</p>

</div>
    `,e}function y(){const e=document.createElement("div");return e.innerHTML=`
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
    `,e}function k(){const e=document.createElement("div");return e.innerHTML=`
      <script src="scriptmenu-desp.js"><\/script>

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
<script src="scriptacordeon.js"><\/script>
    `,e}const x={"/":g,"/about":f,"/blog":y,"/proyectos":k};function m(){const e=location.hash.slice(1)||"/",a=document.getElementById("app"),o=x[e];if(o){a.innerHTML="";const l=o();a.appendChild(l),typeof o.afterRender=="function"&&o.afterRender(),S()}else a.innerHTML="<h2>Página no encontrada</h2>"}function S(){const e=document.querySelectorAll("nav a[data-link]"),a=location.hash.slice(1)||"/";e.forEach(o=>{o.getAttribute("data-link")===a?o.classList.add("active"):o.classList.remove("active")})}function j(){const e=document.querySelector(".icon"),a=document.querySelector(".nav ul");e&&a&&e.addEventListener("click",()=>{a.classList.toggle("active")})}function A(){j()}window.addEventListener("hashchange",m);window.addEventListener("load",m);window.addEventListener("DOMContentLoaded",()=>{A()});
