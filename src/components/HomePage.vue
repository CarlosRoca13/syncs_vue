<template>
<div>{{info}}</div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    this.$http.get('http://localhost:3000/clients')
      .then(response => (this.info = response.data[0].clientid)) // Devuelve el id del primer ciente
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
