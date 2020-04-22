<template>
  <footer class="mainFooter">
      <v-app-bar dark>
        <div>
          © 2019-2020 Syncs Company, Inc. ·
          <a class="pyt" href="#!">Privacy</a>
          ·
          <a class="pyt" href="#!">Terms</a>
        </div>
        <v-spacer></v-spacer>
        <div class="media-icons">
          <a href="#!" class="footer-social-icon">
            <i class="fab fa-facebook-square social"></i>
          </a>
          <a href="#!" class="footer-social-icon">
            <i class="fab fa-twitter social"></i>
          </a>
          <a href="#!" class="footer-social-icon">
            <i class="fas fa-envelope social"></i>
          </a>
          <a href="#!" class="footer-social-icon">
            <i class="fab fa-youtube social"></i>
          </a>
        </div>
      </v-app-bar>
      </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>
<style>
.mainFooter {
  background-color: #1f1f1f;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.footerBar {
  height: 50px;
}
.media-icons {
  margin: 0 auto;
  padding-right: 50px;
}
.social {
  -webkit-transform: scale(1);
  /* Browser Variations: */

  -moz-transform: scale(1);
  -o-transform: scale(1);
  -webkit-transition-duration: 0.5s;
  -moz-transition-duration: 0.5s;
  -o-transition-duration: 0.5s;
}

.social:hover {
  -webkit-transform: scale(1.5);
  -moz-transform: scale(1.5);
  -o-transform: scale(1.5);
}

.footer-social-icon {
  color: white !important;
  padding: 20px;
  font-size: 30px;
  width: 30px;
  text-decoration: none;
}

.pyt:link {
  text-decoration: none;
  color: #38A694;
}

.pyt:visited {
  text-decoration: none;
  color: #38A694;
}

.pyt:hover {
  text-decoration: underline;
}

.pyt:active {
  text-decoration: underline;
}
</style>