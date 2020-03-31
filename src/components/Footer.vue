<template>
  <footer>
    <div class="container">
		<!-- Social -->
    <div class="text-center center-block">
        <a href="#!" class="footer-social-icon "><i class="fab fa-facebook-square social"></i></a>
        <a href="#!" class="footer-social-icon"><i class="fab fa-twitter social"></i></a>
        <a href="#!" class="footer-social-icon"><i class="fas fa-envelope social"></i></a>
      <a href="#!" class="footer-social-icon"><i class="fab fa-youtube social"></i></a>
    </div>
    <p class="float-right">
      <a href="#">Back to top</a>
    </p>
    <p>
      © 2019-2020 Syncs Company, Inc. ·
      <a href="#!">Privacy</a>
      ·
      <a href="#!">Terms</a>
    </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>
<style>
.text-center{
    bottom: 0;
    text-align: center;
}
.social{
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
    color: #333 !important;
    padding: 20px;
    font-size: 30px;
    width: 30px;
    text-decoration: none;
}

</style>