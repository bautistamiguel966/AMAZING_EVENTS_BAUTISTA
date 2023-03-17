/*OBTENER LOS DATOS*/


const cargarTablas = async () => {
    try {
        const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        let eventos_total;
        let eventos;
        let eventos_pasados;
        let eventos_futuros;

        
        console.log("Estatus de la respuesta, si es distinto de 200, usara el json: Estatus = " + respuesta.status)
        
        if(respuesta.status === 200){
            console.log("Usando la API")
            eventos = await respuesta.json()
            eventos_total = eventos.events
            eventos_pasados = eventos_total.filter( event => eventos.currentDate > event.date)
            eventos_futuros = eventos_total.filter( event => eventos.currentDate < event.date)

        }else{
            console.log("Usando el JSON")
            const respuesta = await fetch('./assets/scripts/amazing.json');
            eventos = await respuesta.json()
            eventos_total = eventos.events
            eventos_pasados = eventos_total.filter( event => eventos.currentDate > event.date)
            eventos_futuros = eventos_total.filter( event => eventos.currentDate < event.date)
        }




        // let eventos_total;
        // let eventos;
        // const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        // eventos = await respuesta.json()
        // eventos_total = eventos.events
        // const eventos_futuros = eventos_total.filter( event => eventos.currentDate < event.date)
        // const eventos_pasados = eventos_total.filter( event => eventos.currentDate > event.date)

        /****** OBTENGO LOS TRES DATOS DE LA PRIMER TABLA ********/
        let mayor = {}
        let menor = {}
        let capacidad = {}
        let mayorA = 0
        let menorA = 100
        let mayorC = 0
        eventos_total.map((event)=>{
            let asistencia = ((event.assistance * 100) / event.capacity)
            if(asistencia > mayorA){
                mayorA = asistencia
                mayor.name = event.name
                mayor.assistance = asistencia.toFixed(2)
            }
            if(asistencia < menorA){
                menorA = asistencia
                menor.name = event.name
                menor.assistance = asistencia.toFixed(2)
            }
            if(event.capacity > mayorC){
                mayorC = event.capacity
                capacidad.name = event.name
                capacidad.capacity = event.capacity
            }
        })

        const tabla1 = document.getElementById("tabla1")
        tabla1.innerHTML += `
            <tr>
                <td>${mayor.name} (${mayor.assistance}%)</td>
                <td>${menor.name} (${menor.assistance}%)</td>
                <td>${capacidad.name} (${capacidad.capacity})</td>
            </tr>`

        /************** OBTENGO LAS CATEGORIAS ****************/
        function obtenerCategorias(arreglo) {
            const categorias = [];
            arreglo.map((event) => {
                categorias.push(event.category)
            });

            const resultado = categorias.filter((item, index) => {
                return categorias.indexOf(item) === index;
            });

            return resultado;
        }
        
        /****** OBTENGO LOS DATOS DE LA SEGUNDA TABLA ********/
        function obtenerFuturos() {
            const categorias = obtenerCategorias(eventos_futuros);
            const cat = []
            categorias.map((c) => {
                elem = {}
                let nombre;
                let asistencia = 0;
                let cont = 0;
                let ingreso = 0;
                let result = 0
                eventos_futuros.filter((e) => {

                    if (e.category == c) {
                        nombre = e.category;
                        ingreso += e.estimate * e.price
                        asistencia += ((e.estimate * 100) / e.capacity)
                        cont += 1
                    }
                })
                result = asistencia / cont
                elem.name = nombre
                elem.revenue = ingreso
                elem.assistance = result.toFixed(2)
                cat.push(elem)
            })
            /*********** ORDENO LA LISTA *************/
            for(let i = 0; i < cat.length; i++) {
                for(let j = 0; j <(cat.length)-1; j++) {
                    if(parseInt(cat[i].assistance) > parseInt(cat[j].assistance)){
                        aux = cat[j]
                        cat[j] = cat[i]
                        cat[i] = aux
                    }
                }
            }
            return cat
        }
        const futuros = obtenerFuturos()
        futuros.map((event)=>{
            const tabla2 = document.getElementById("tabla2")
            tabla2.innerHTML += `
                <tr>
                    <td>${event.name}</td>
                    <td>$${event.revenue}</td>
                    <td>${event.assistance}%</td>
                </tr>`
        })


        
        
        /****** OBTENGO LOS DATOS DE LA TERCER TABLA ********/
        function obtenerPasados() {
            const categorias = obtenerCategorias(eventos_pasados);
            const cat = []
            categorias.map((c) => {
                elem = {}
                let nombre;
                let asistencia = 0;
                let cont = 0;
                let ingreso = 0;
                let result = 0
                eventos_pasados.filter((e) => {

                    if (e.category == c) {
                        nombre = e.category;
                        ingreso += e.assistance * e.price
                        asistencia += ((e.assistance * 100) / e.capacity)
                        cont += 1
                    }
                })
                result = asistencia / cont
                elem.name = nombre
                elem.revenue = ingreso
                elem.assistance = result.toFixed(2)
                cat.push(elem)
            })
            /*********** ORDENO LA LISTA *************/
            for(let i = 0; i < cat.length; i++) {
                for(let j = 0; j <(cat.length)-1; j++) {
                    if(parseInt(cat[i].assistance) > parseInt(cat[j].assistance)){
                        aux = cat[j]
                        cat[j] = cat[i]
                        cat[i] = aux
                    }
                }
            }
            return cat
        }
        const pasados = obtenerPasados()
        pasados.map((event)=>{
            const tabla3 = document.getElementById("tabla3")
            tabla3.innerHTML += `
                <tr>
                    <td>${event.name}</td>
                    <td>$${event.revenue}</td>
                    <td>${event.assistance}%</td>
                </tr>`
        })

    }
    catch (error) {
        console.log(error);
        alert('Error')
    }
}
cargarTablas()