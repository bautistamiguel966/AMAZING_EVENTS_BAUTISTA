const eventos_futuros = []


for(let i = 0; i<data.events.length; i++){
    if(data.currentDate < data.events[i].date){
        eventos_futuros.push(data.events[i])
    }
}

let tarjeta = document.getElementById("tarjetas-cuerpo");

eventos_futuros.map((x) => {
    tarjeta.innerHTML += `
        <div class="card" style="width: 18rem;" id="tarjeta">
            <figure id="tarjeta-img">
                <img src="${x.image}" class="card-img-top" alt="${x.name}">
            </figure>
            <div class="card-body" id="tarjeta-cuerpo">
                <div id="tarjeta-titulo">
                    <h5 class="card-title">${x.name}</h5>
                    <p class="card-text">${x.description}</p>
                </div>
                <div class="datos">
                    <p>${x.category}</p>

                    <div id="tarjeta-fecha">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                        </svg>
                        <p>${x.date}</p>
                    </div>
                    
                    <div id="tarjeta-ubicacion">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                        </svg>
                        <p>${x.place}</p>
                    </div>
                    
                </div>
                <div class"mas-informacion">
                    <p>Capacity: ${x.capacity}</p>
                    <p>Assistance: ${x.assistance}</p>
                </div>
                <div class="precio">
                    <p>Price: $${x.price}</p>
                    <a href="./details.html" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>
    `;
});