# syncs

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

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
        this.$http.post('http://localhost:3000/clients', {
            name: 'Carlos',
            lastname: 'Roca',
            email: 'al361876@uji.es',
            clientname: 'croca',
            password: 'alguna',
            verified: 'F',
            avatar: 'foto.png',
            birthday: '10-03-1998'
        }).then(console.log('Done'))
  }
}
- Para llamar al metodo podemos hacer uso de lo siguiente:
<button v-on:click="unaFuncion">Enviar</button>
```
