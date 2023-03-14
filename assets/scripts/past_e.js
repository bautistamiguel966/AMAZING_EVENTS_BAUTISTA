/*CATEGORIAS*/

function obtenerCategorias(){
    const categorias = []
    data.events.map(event =>{
        categorias.push(event.category)
    })

    const resultado = categorias.filter((item,index)=>{
        return categorias.indexOf(item) === index;
    })

    return resultado
}
const categoriasEventos = obtenerCategorias()


let categoria = document.getElementById("categorias")

categoriasEventos.map((x) =>{
    categoria.innerHTML += `
        <div class="form-check form-check-inline" id="cat-elemento">
            <input class="form-check-input" type="checkbox" value="${x}">
            <label class="form-check-label" for="inlineCheckbox1">${x}</label>
        </div>
    `
})

/******************** FILTROS BUSQUEDA *****************************************/

const cambio = document.getElementById('categorias');

cambio.addEventListener('change', (event) => {
    const pal = obtenerPalabra()
    if(pal.length > 0){
        const palabras = filtrarPalabra(eventos_pasados)
        const check = buscarCheck()

        if(check.length > 0){
            const categorias = filtrarCategorias(palabras)
            if(categorias.length > 0){
                cargarTarjetas(categorias)
            }else{
                sinResultado()
            }
        }else{
            if(palabras.length > 0){
                cargarTarjetas(palabras)
            }else{
                sinResultado()
            }
        }

    }else{
        const categorias = filtrarCategorias(eventos_pasados)
        const check = buscarCheck()
        if(check.length > 0){
            if(categorias.length > 0){
                cargarTarjetas(categorias)
            }else{
                sinResultado()
            }
        }else{
            cargarTarjetas(eventos_pasados)
        }
    }
});

const cambioTexto = document.getElementById('input-buscar')
cambioTexto.addEventListener('keyup',(event) =>{
    const categorias = filtrarCategorias(eventos_pasados)
    if(categorias.length > 0){
        const palabras = filtrarPalabra(categorias)
        if(palabras.length > 0){
            cargarTarjetas(palabras)
        }else{
            sinResultado()
        }
        
    }else{
        const palabras = filtrarPalabra(eventos_pasados)
        if(palabras.length > 0){
            cargarTarjetas(palabras)
        }else{
            sinResultado()
        }
        
    }
})


const form = document.getElementById("form-categorias");
form.addEventListener("submit", (e) => {
    e.preventDefault();
});

function sinResultado(){
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

function filtrarPalabra(arreglo){
    const palabra = obtenerPalabra()
    const pFiltradas = []
    arreglo.filter((e)=>{
        const nom = e.name.toLocaleLowerCase()
        if(nom.includes(palabra)){
            pFiltradas.push(e)
        }
    })
    return pFiltradas
}

function filtrarCategorias(arreglo){
    const categorias = buscarCheck()
    const catFiltradas = []
    categorias.map((c)=>{
        arreglo.filter((e)=>{
            if(e.category == c){
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
/*TARJETAS*/
const eventos_pasados = data.events.filter( event => data.currentDate > event.date)
cargarTarjetas(eventos_pasados);

function limpiarTarjetas(){
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