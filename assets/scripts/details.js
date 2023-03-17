/*OBTENER LOS DATOS*/

let eventos_total;
const obtenerEventos = async () => {
    try {
        let eventos;
        const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        eventos = await respuesta.json()
        eventos_total = eventos.events
        console.log(eventos_total)

        const querySearch = document.location.search
        const id = new URLSearchParams(querySearch).get("id")
        const tarjeta = eventos_total.find(evento => evento._id === parseInt(id))

        const tarjetas = document.getElementById("tarjeta-detalle")
        if(tarjeta.date > eventos.currentDate){
            tarjetas.innerHTML = `
            <div class="col-sm-4 col-md-4 col-lg-4" id="detalle-imagen">
                <img src="${tarjeta.image}" alt="${tarjeta.name}">
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4" id="detalle-texto">
                <h2>${tarjeta.name}</h2>
                <p>${tarjeta.description}</p>
                
            <div class="datos">
                <p>Category: ${tarjeta.category}</p>
        
                <div id="tarjeta-fecha">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                    <p>${tarjeta.date}</p>
                </div>
                
                <div id="tarjeta-ubicacion">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                    <p>${tarjeta.place}</p>
                </div>
            </div>
            <div class"mas-informacion">
                <p>Capacity: ${tarjeta.capacity}</p>
                <p>Estimate: ${tarjeta.estimate}</p>
                <p>Price: $${tarjeta.price}</p>
            </div>
        </div>
        `
        }else{
            tarjetas.innerHTML = `
            <div class="col-sm-4 col-md-4 col-lg-4" id="detalle-imagen">
                <img src="${tarjeta.image}" alt="${tarjeta.name}">
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4" id="detalle-texto">
                <h2>${tarjeta.name}</h2>
                <p>${tarjeta.description}</p>
                
            <div class="datos">
                <p>Category: ${tarjeta.category}</p>
        
                <div id="tarjeta-fecha">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                    <p>${tarjeta.date}</p>
                </div>
                
                <div id="tarjeta-ubicacion">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                    <p>${tarjeta.place}</p>
                </div>
            </div>
            <div class"mas-informacion">
                <p>Capacity: ${tarjeta.capacity}</p>
                <p>Assistance: ${tarjeta.assistance}</p>
                <p>Price: $${tarjeta.price}</p>
            </div>
        </div>
        `
        }


    }
    catch (error) {
        console.log(error);
        alert('Error')
    }
}
obtenerEventos()









