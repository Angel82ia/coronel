document.addEventListener("DOMContentLoaded",()=>{
    const toggle=document.querySelector(".menu-toggle");
    const nav=document.querySelector(".nav-list");
    if(toggle){toggle.onclick=()=>nav.classList.toggle("active")}
    // Carga de datos desde JSON (simplificado)
    fetch("content/configuracion.json").then(r=>r.json()).then(data=>{
        if(data.podcast){
            document.getElementById("podcastContainer").innerHTML=`
                <div class="featured-podcast">
                    <div class="podcast-cover"><img src="${data.podcast.imagen||'assets/img/podcast-cover.jpg'}"></div>
                    <div class="podcast-info"><h3>${data.podcast.titulo}</h3><p>${data.podcast.descripcion}</p><a href="${data.podcast.enlace}" class="btn-primary">Reproducir</a></div>
                </div>`
        }
        if(data.redes){
            let html="";
            for(let [k,v] of Object.entries(data.redes)){if(v) html+=`<a href="${v}" class="social-icon">${k}</a>`}
            document.getElementById("socialLinks").innerHTML=html
        }
        if(data.email) document.getElementById("emailContacto").innerHTML=`📧 ${data.email}`
    });
    fetch("content/libros.json").then(r=>r.json()).then(libros=>{
        document.getElementById("librosContainer").innerHTML=libros.map(l=>`<div class="card"><img src="${l.imagen}" class="card-img"><h3>${l.titulo}</h3><p>${l.sinopsis}</p><a href="${l.enlace}">Comprar</a></div>`).join("")
    });
    fetch("content/eventos.json").then(r=>r.json()).then(eventos=>{
        document.getElementById("eventosContainer").innerHTML=eventos.map(e=>`<div class="event-card"><div class="event-card-info"><div class="event-date">${e.fecha}</div><h3>${e.titulo}</h3><p>${e.lugar||''}</p>${e.enlace_compra?`<a href="${e.enlace_compra}" class="btn-comprar-entrada">Entradas</a>`:''}</div></div>`).join("")
    });
});
