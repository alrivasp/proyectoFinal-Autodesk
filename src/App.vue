<template>
  <div>
    <div class="container mb-3" v-show="disconnected">
      <div class="row row-cols-2 justify-content-center">
        <div class="col alignLink">
          <router-link class="linkRouter" to="/" >
            Home
          </router-link>
        </div>
        <div class="col">
          <router-link
            class="linkRouter"
            to="/register"
          >
            Registro
          </router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["disconnected"]),
  },
};
</script>

<style>
@import "~vue-snotify/styles/material.css";

body {
  background: url("./assets/img/background.jpg") no-repeat center center fixed;
  background-size: cover;
  height: 100%;
  overflow: hidden;
}

.linkRouter {
  text-decoration: none;
  color: white;
  text-shadow: black 0.1em 0.1em 0.2em;
  font-size: 18px;
}
.alignLink {
  text-align: right;
  border-right: 1px solid rgb(244, 247, 246);
}
</style>
