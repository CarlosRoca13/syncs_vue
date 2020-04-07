<template>
  <v-row class="instrumentsDiv" align="center">
    <div v-for="instrument in instruments" :key="instrument.title" class="instrumentCard">
      <v-col v-if="availables.includes(instrument.title)">
        <v-card style="border-radius:100px" elevation="3">
          <a :href="instrument.route">
            <v-img height="100px" width="100px" :src="instrument.src" class="white--text shapeCard">
              <div class="cardTitle text-center">
                <v-card-title>{{instrument.title}}</v-card-title>
              </div>
            </v-img>
          </a>
        </v-card>
      </v-col>
    </div>
  </v-row>
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
          route: "http://localhost:8080/sheets/"+ this.$route.params.id + "/Guitar"
        },
        {
          title: "Bass",
          src:
            "https://images.unsplash.com/photo-1462965326201-d02e4f455804?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          route: "http://localhost:8080/sheets/"+ this.$route.params.id + "/Bass"
        },
        {
          title: "Piano",
          src:
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          route: "http://localhost:8080/sheets/"+ this.$route.params.id + "/Piano"
        },
        {
          title: "Trumpet",
          src:
            "https://images.unsplash.com/photo-1573871666457-7c7329118cf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          route: "http://localhost:8080/sheets/"+ this.$route.params.id + "/Trumpet"
        },
        {
          title: "Drums",
          src:
            "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          route: "http://localhost:8080/sheets/"+ this.$route.params.id + "/Drums"
        }
      ]
    };
  },
  mounted() {
    this.$http
      .get("/api/sheetinstrument/" + this.$route.params.id)
      .then(response => {
        response.data.forEach(element => this.availables.push(element.instrument));
      });
  }
};
</script>

<style>
.instrumentsDiv {
  display: flex;
  padding-left: 10px;
  padding-top: 10px;
  border-radius: 100px;
}

.instrumentCard {
  padding-left: 50px;
  border-radius: 100px;
}

.shapeCard {
  border-radius: 100px;
}

.cardTitle {
  position: absolute;
  text-align: center;
  bottom: 0%;
  width: 100%;
  height: 50%;
  background-color: hsla(120, 3%, 20%, 0.281);
  font-size: 36px;
  color: white;
}
</style>