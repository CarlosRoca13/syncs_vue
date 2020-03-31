<template>
  <div class="instrumentsDiv" align="center">
    <div v-for="instrument in instruments" :key="instrument.title" class="instrumentCard">
      <a :href="instrument.route"><v-card elevation="3">
        <v-img height="200px" width="200px" :src="instrument.src" class="white--text">
          <div class="cardTitle text-center">
            <v-card-title>{{instrument.title}}</v-card-title>
          </div>
        </v-img>
      </v-card></a>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      instruments: [
        {
          title: "Guitar",
          src:
            "https://images.unsplash.com/photo-1548426590-4459d4dd2a42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
          route: window.location.href+"/guitar"
        },
        {
          title: "Bass",
          src:
            "https://images.unsplash.com/photo-1462965326201-d02e4f455804?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          route: window.location.href+"/bass"
        },
        {
          title: "Piano",
          src:
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          route: window.location.href+"piano"
        },
        {
          title: "Trumpet",
          src:
            "https://images.unsplash.com/photo-1573871666457-7c7329118cf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          route: window.location.href+"trumpet"
        },
        {
          title: "Drums",
          src:
            "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          route: window.location.href+"drums"
        }
      ]
    };
  }
};
</script>

<style>
.instrumentsDiv {
  display: flex;
  padding-left: 10px;
  padding-top: 10px;
}

.instrumentCard {
  padding-left: 50px;
}

.cardTitle {
  position: absolute;
  bottom: 0%;
  width: 100%;
  height: 30%;
  background-color: hsla(120, 3%, 20%, 0.281);
  font-size: 36px;
  color: white;
}
</style>