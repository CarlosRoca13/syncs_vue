# syncs

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

``` bash
# COMO USAR AXIOS PARA LLAMAR A REST
# Las siguientes lineas van dentro de script y de export default en cada componente
data () {
    return {
        clientid: null
    }
},
mounted () {
    this.$http.get('http://localhost:3000/clients')
      .then(response => (this.info = response.data[0].clientid))
}

# Como mostrarlo en el HTML (En este caso devuelve el id del primer cliente)
{{ clientid }}

#NOTAS
- No siempre debe ir dentro de mounted, esto se ejecuta al montar el componente
- Cuando se quiera lanzar a voluntad se usarán funciones que se declaran a continuación de data() usando methods de la siguente forma:
mothods: {
    unaFuncion() {
        this.$http.get('http://localhost:3000/clients')
            .then(response => (this.info = response.data[0].clientid))
  }
}
- Para llamar al metodo podemos hacer uso de lo siguiente:
<button v-on:click="unaFuncion">Enviar</button>
```
