<template>
  <div class="mainWrap">
    <v-card class="commentCard">
      <v-row>
        <v-col cols="10">
          <v-textarea
            class="commentTextArea"
            color="#38A694"
            v-model="textArea"
            label="Add a comment..."
          ></v-textarea>
        </v-col>
        <v-col cols="2">
          <center style="margin-top:20px; margin-right:20px;">
            <v-avatar color="transparent" size="100">
              <img :src="avatar" />
            </v-avatar>
            <v-btn color="#bf4222" dark class="sendCommentButton" @click="sendComment()">
              <v-icon left>send</v-icon>Send
            </v-btn>
          </center>
        </v-col>
      </v-row>
    </v-card>
    <div v-for="comment in comments" :key="comment.id">
      <v-card class="commentsCards">
        <v-row>
          <v-col cols="10" class="commentText">
            {{comment.description}}
          </v-col>
          <v-col cols="2">
            <center style="margin-top:20px; margin-right:20px;">
              <v-avatar color="transparent" size="100" class="commentAvatar">
                <img :src="comment.avatar" />
              </v-avatar>
              <span class="commentUsername">{{comment.username}}</span>
            </center>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
      avatar: null,
      user_id: null,
      userLogged: null,
      textArea: null
    };
  },
  methods:{
      async sendComment(){
          await this.$http.post("/api/comments", 
          {"clients_id": this.user_id,
          "sheets_id": this.$route.params.id,
          "description": this.textArea,
          })
          await this.$http
          .get("/api/comments/song/" + this.$route.params.id)
          .then(response => {
            this.comments = response.data
          });
          this.textArea = "";
      }
  },
  mounted() {
    this.$http
      .get("/api/comments/song/" + this.$route.params.id)
      .then(response => {
        this.comments = response.data
      });
    let activeUser = localStorage.getItem("activeUser");
    const item = JSON.parse(activeUser);
    if (item == null) {
      this.userLogged = false;
    } else {
      this.avatar = "http://localhost:8000/api/clients/avatar/" + item.id;
      this.user_id = item.id;
    }
  }
};
</script>

<style scoped>
.mainWrap {
  width: 60%;
  padding-left: 20px;
}
.commentCard {
  margin-top: 20px;
}
.commentTextArea {
  padding: 20px;
  width: 100%;
}
.sendCommentButton {
  margin-top: 20px;
  margin-bottom: 20px;
}
.commentsCards{
    margin-top: 20px;
    margin-left: 50px;
}
.commentText{
  padding: 20px 0px 0px 40px;
}
.commentUsername{
  font-weight: 500;
}
.commentAvatar{
  margin-bottom: 10px;
}
</style>