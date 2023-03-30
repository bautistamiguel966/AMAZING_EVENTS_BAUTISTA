const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            urlApi: "https://mindhub-xj03.onrender.com/api/amazing",
            urlJson: "./assets/scripts/amazing.json",
            backup_eventos: [],
            backup_pasados: [],
            backup_futuros: [],
            eventos: [],
            eventos_pasados: [],
            categorias: [],
            categoriasSeleccionadas: [],
            texto: '',
            date: 0,
            evento_detail: [],
            mayor: {},
            menor: {},
            capacidad: {},
            tabla_futuros: [],
            tabla_pasados: [],
        };
    },
    created() {
        this.pedirDatos()
    },
    mounted() { },
    methods: {
        pedirDatos(){
            fetch(this.urlApi)
                .then(response => response.json())
                .then(datosApi =>{
                    this.eventos = datosApi.events
                    this.backup_eventos = datosApi.events
                    this.date = datosApi.currentDate
                    this.obtenerCategorias(this.backup_eventos)
                    this.obtenerTabla(this.backup_eventos)
                    this.eventos_pasados = this.eventos.filter( event => this.date > event.date)
                    this.backup_pasados = this.eventos_pasados
                    this.eventos_futuros = this.eventos.filter( event => this.date < event.date)
                    this.backup_futuros = this.eventos_futuros
                    this.obtenerTabla2(this.backup_futuros, this.tabla_futuros)
                    this.ordenartabla(this.tabla_futuros)
                    this.obtenerTabla2(this.backup_pasados, this.tabla_pasados)
                    this.ordenartabla(this.tabla_pasados)
                    this.infoDetails()
                })
        },
        obtenerCategorias(array){
            array.forEach(elemento =>{
                if(!this.categorias.includes(elemento.category)){
                    this.categorias.push(elemento.category)
                }
            })
        },
        obtenerTabla(array){
            let mayorA = 0
            let menorA = 100
            let mayorC = 0
            array.map((event)=>{
                let asistencia = ((event.assistance * 100) / event.capacity)
                if(asistencia > mayorA){
                    mayorA = asistencia
                    this.mayor.name = event.name
                    this.mayor.assistance = asistencia.toFixed(2)
                }
                if(asistencia < menorA){
                    menorA = asistencia
                    this.menor.name = event.name
                    this.menor.assistance = asistencia.toFixed(2)
                }
                if(event.capacity > mayorC){
                    mayorC = event.capacity
                    this.capacidad.name = event.name
                    this.capacidad.capacity = event.capacity
                }
            })
        },
        obtenerTabla2(array, array2){
            this.categorias.map((c) => {
                elem = {}
                let nombre;
                let asistencia = 0;
                let cont = 0;
                let ingreso = 0;
                let result = 0
                array.filter((e) => {
                    if (e.category == c) {
                        nombre = e.category;
                        if(e.estimate !== undefined){
                            ingreso += e.estimate * e.price
                            asistencia += ((e.estimate * 100) / e.capacity)
                        }else{
                            ingreso += e.assistance * e.price
                            asistencia += ((e.assistance * 100) / e.capacity)
                        }
                        cont += 1
                    }
                })
                result = asistencia / cont
                elem.name = nombre
                elem.revenue = ingreso
                elem.assistance = result.toFixed(2)
                if(elem.name !== undefined){
                    array2.push(elem)
                }
                
            })
        },
        ordenartabla(array){
            for(let i = 0; i < array.length; i++) {
                for(let j = 0; j <(array.length)-1; j++) {
                    if(parseInt(array[i].assistance) > parseInt(array[j].assistance)){
                        aux = array[j]
                        array[j] = array[i]
                        array[i] = aux
                    }
                }
            }
        },
        infoDetails(){
            const querySearch = document.location.search
            const id = new URLSearchParams(querySearch).get("id")
            this.evento_detail = this.backup_eventos.find(evento => evento._id === parseInt(id))
        }

    },
    computed: {

        filtroDoble(){
            let primerFiltro = this.backup_eventos.filter(evento => evento.name.toLowerCase().includes(this.texto.toLowerCase()))
            let primerFiltro2 = this.backup_pasados.filter(evento => evento.name.toLowerCase().includes(this.texto.toLowerCase()))
            let primerFiltro3 = this.backup_futuros.filter(evento => evento.name.toLowerCase().includes(this.texto.toLowerCase()))

            if(!this.categoriasSeleccionadas.length){
                this.eventos = primerFiltro
                this.eventos_pasados = primerFiltro2
                this.eventos_futuros = primerFiltro3
            }else{
                this.eventos = primerFiltro.filter(evento => this.categoriasSeleccionadas.includes(evento.category))
                this.eventos_pasados = primerFiltro2.filter(evento => this.categoriasSeleccionadas.includes(evento.category))
                this.eventos_futuros = primerFiltro3.filter(evento => this.categoriasSeleccionadas.includes(evento.category))
            }
        },

    },
}).mount("#app");

