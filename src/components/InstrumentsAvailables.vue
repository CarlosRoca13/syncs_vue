<template>
  <div class="instrumentsDiv">
    <v-row>
      <div v-for="instrument in instruments" :key="instrument.title" class="instrumentCard">
        <v-col v-if="availables.includes(instrument.title)">
          <v-card style="border-radius:120px">
            <a :href="instrument.route">
              <v-img
                height="120px"
                width="120px"
                :src="instrument.src"
                class="white--text shapeCard"
              >
                <div class="cardTitle text-center">
                  <v-card-title>{{instrument.title}}</v-card-title>
                </div>
              </v-img>
            </a>
          </v-card>
        </v-col>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      availables: [],
      instruments: [
        {
          title: "Guitar",
          src:
            "https://images.unsplash.com/photo-1548426590-4459d4dd2a42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
          route:
            "http://localhost:8080/sheets/" + this.$route.params.id + "/Guitar"
        },
        {
          title: "Bass",
          src:
            "https://images.unsplash.com/photo-1462965326201-d02e4f455804?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          route:
            "http://localhost:8080/sheets/" + this.$route.params.id + "/Bass"
        },
        {
          title: "Piano",
          src:
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          route:
            "http://localhost:8080/sheets/" + this.$route.params.id + "/Piano"
        },
        {
          title: "Trumpet",
          src:
            "https://images.unsplash.com/photo-1573871666457-7c7329118cf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          route:
            "http://localhost:8080/sheets/" + this.$route.params.id + "/Trumpet"
        },
        {
          title: "Drums",
          src:
            "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          route:
            "http://localhost:8080/sheets/" + this.$route.params.id + "/Drums"
        }
      ]
    };
  },
  mounted() {
    this.$http
      .get("/api/sheetinstrument/" + this.$route.params.id)
      .then(response => {
        response.data.forEach(element =>
          this.availables.push(element.instrument)
        );
      });
  }
};
</script>

<style>
.instrumentsDiv {
  width: 50%;
  display: flex;
  border-radius: 100px;
  background-color:#38A694;
  padding-left: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.shapeCard {
  border-radius: 100px;
}

.cardTitle {
  position: absolute;
  text-align: center;
  bottom: 0%;
  width: 100%;
  height: 60%;
  background-color: hsla(120, 3%, 20%, 0.281);
  font-size: 24px;
  color: white;
}
</style>