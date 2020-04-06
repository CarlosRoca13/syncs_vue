<template>
    <v-btn icon @click="downloadPdf">
        <v-icon>get_app</v-icon>

    </v-btn>
</template>

<script>
    export default {
        props: {
            sheetId: Number,
            instrument: String,
        },
        methods: {
            downloadPdf(){
                this.$http.get('/api/sheetinstrument/download/' + this.sheetId + '/' + this.instrument, {responseType: 'arraybuffer'})
                    .then(response => {
                        let blob = new Blob([response.data], { type: 'application/pdf' })
                        let link = document.createElement('a')
                        link.href = window.URL.createObjectURL(blob)
                        link.download = 'test.pdf' //quan funcione canviar açò per el nom del pdf
                        link.click()
                    })
            }
        }
    }
</script>

<style scoped>

</style>