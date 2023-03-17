/*OBTENER LOS DATOS*/


const obtenerEventos = async () => {
    try {
        const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        let eventos_total;
        let eventos;
        let eventos_futuros;

        
        console.log("Estatus de la respuesta, si es distinto de 200, usara el json: Estatus = " + respuesta.status)
        
        if(respuesta.status === 200){
            console.log("Usando la API")
            eventos = await respuesta.json()
            eventos_total = eventos.events
            eventos_futuros = eventos_total.filter( event => eventos.currentDate < event.date)
            cargarTarjetas(eventos_futuros);

        }else{
            console.log("Usando el JSON")
            const respuesta = await fetch('./assets/scripts/amazing.json');
            eventos = await respuesta.json()
            eventos_total = eventos.events
            eventos_futuros = eventos_total.filter( event => eventos.currentDate < event.date)
            cargarTarjetas(eventos_futuros);
        }

        /*CATEGORIAS*/

        function obtenerCategorias() {
            const categorias = [];
            //eventos_futuros.map((event) => {
            eventos_total.map((event) => {
                categorias.push(event.category)
            });

            const resultado = categorias.filter((item, index) => {
                return categorias.indexOf(item) === index;
            });

            return resultado;
        }
        const categoriasEventos = obtenerCategorias();

        let categoria = document.getElementById("categorias");

        categoriasEventos.map((x) => {
            categoria.innerHTML += `
        <div class="form-check form-check-inline" id="cat-elemento">
            <input class="form-check-input" type="checkbox" value="${x}">
            <label class="form-check-label" for="inlineCheckbox">${x}</label>
        </div>
    `;
        });



        /******************** FILTROS BUSQUEDA *****************************************/

        const cambio = document.getElementById('categorias');

        cambio.addEventListener('change', (event) => {
            const pal = obtenerPalabra()
            if (pal.length > 0) {
                const palabras = filtrarPalabra(eventos_futuros)
                const check = buscarCheck()

                if (check.length > 0) {
                    const categorias = filtrarCategorias(palabras)
                    if (categorias.length > 0) {
                        cargarTarjetas(categorias)
                    } else {
                        sinResultado()
                    }
                } else {
                    if (palabras.length > 0) {
                        cargarTarjetas(palabras)
                    } else {
                        sinResultado()
                    }
                }

            } else {
                const categorias = filtrarCategorias(eventos_futuros)
                const check = buscarCheck()
                if (check.length > 0) {
                    if (categorias.length > 0) {
                        cargarTarjetas(categorias)
                    } else {
                        sinResultado()
                    }
                } else {
                    cargarTarjetas(eventos_futuros)
                }
            }
        });

        const cambioTexto = document.getElementById('input-buscar')
        cambioTexto.addEventListener('keyup', (event) => {
            const categorias = filtrarCategorias(eventos_futuros)
            if (categorias.length > 0) {
                const palabras = filtrarPalabra(categorias)
                if (palabras.length > 0) {
                    cargarTarjetas(palabras)
                } else {
                    sinResultado()
                }

            } else {
                const palabras = filtrarPalabra(eventos_futuros)
                if (palabras.length > 0) {
                    cargarTarjetas(palabras)
                } else {
                    sinResultado()
                }

            }
        })


        const form = document.getElementById("form-categorias");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
        });

        function sinResultado() {
            limpiarTarjetas()
            let tarjeta = document.getElementById("tarjetas-cuerpo");
            tarjeta.innerHTML += `<div class=".row" id="sin-resultado">
                        <img src="./assets/img/busqueda.png" alt="Sin resultados">
                        <p>No se encontro ningun resultado.</p>  
                        </div>`
        }

        function obtenerPalabra() {
            let palabra = document.getElementById("input-buscar");
            const p = palabra.value.toLocaleLowerCase();
            return p
        }

        function filtrarPalabra(arreglo) {
            const palabra = obtenerPalabra()
            const pFiltradas = []
            arreglo.filter((e) => {
                const nom = e.name.toLocaleLowerCase()
                if (nom.includes(palabra)) {
                    pFiltradas.push(e)
                }
            })
            return pFiltradas
        }

        function filtrarCategorias(arreglo) {
            const categorias = buscarCheck()
            const catFiltradas = []
            categorias.map((c) => {
                arreglo.filter((e) => {
                    if (e.category == c) {
                        catFiltradas.push(e)
                    }
                })
            })
            return catFiltradas
        }

        function buscarCheck() {
            let boxs = Array.from(document.querySelectorAll("input[type='checkbox']"));
            let boxCheckeado = boxs.filter((box) => box.checked);
            const valor = [];
            boxCheckeado.map((x) => {
                valor.push(x.value);
            });
            return valor;
        }


        /*********** TARJETAS ***********/


        function limpiarTarjetas() {
            let tarjeta = document.getElementById("tarjetas-cuerpo");
            tarjeta.innerHTML = ``
        }


        function cargarTarjetas(arreglo) {
            let tarjeta = document.getElementById("tarjetas-cuerpo");
            limpiarTarjetas()
            arreglo.map((x) => {
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
                <div class="precio">
                    <p>Price: $${x.price}</p>
                    <a href="./details.html?id=${x._id}" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>
        `;
            });
        }




    }
    catch (error) {
        console.log(error);
        alert('Error')
    }
}
obtenerEventos()