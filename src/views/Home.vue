<template>
  <div>
    <div class="mt-0 mb-3" v-show="!disconnected">
      <div class="row row-cols-2 justify-content-center">
        <div class="col alignLink">
          <router-link class="linkRouter" to="/panel"> Panel </router-link>
        </div>
        <div class="col alingnLogout">
          <button class="linkRouter" @click="logout">Logout</button>
        </div>
      </div>
    </div>
    <!-- Icon Company -->
    <v-img
      src="../assets/img/autodesk.png"
      alt="icono autodesk"
      class="text-center iconAutodesk"
    ></v-img>
    <!-- component LoginUser -->
    <p class="titleCompany">AUTODESK</p>
    <div v-show="disconnected">
      <LoginUser />
      <Footer />
    </div>
    <div class="container mb-5" v-show="!disconnected">
      <v-card elevation="24" loading outlined shaped>
        <div class="m-5">
          <h3>Diseñado para empresas</h3>
          <br>
          <p>Las expectativas de los clientes están en constante evolución. Eso significa que el software de atención al cliente empresarial tiene que ser flexible. Ya sea que se trate de un innovador que está creciendo aceleradamente o de una compañía bien establecida que se está transformando, estamos para ayudarles.</p>
          <br>
          <p>Nuestra plataforma de atención al cliente y comunicación ayuda a las empresas innovadoras a crear las mejores experiencias posibles. Te ofrecemos el equilibrio adecuado entre sencillez y sofisticación para que tus equipos y tu tecnología siempre se centren en lo que más importa: tus clientes.</p>
        </div>
      </v-card>
      <Footer />
    </div>
  </div>
</template>

<script>
import LoginUser from "@/components/Login/LoginUser.vue";
import Footer from "@/components/Footer/Footer.vue";
import { mixins } from "../mixins/mixins";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    LoginUser,
    Footer,
  },
  mixins: [mixins],
  computed: {
    ...mapState(["disconnected"]),
  },
  methods: {
    ...mapActions(["logout_User"]),
    logout(){
      this.logout_User();
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  text-align: center;
}

/* En la clase corazon vamos a llamar latidos en la animación  */
.iconAutodesk {
  display: inline-block;
  font-size: 150px;
  text-shadow: 0 0 10px #222, 1px 1px 0 #450505;
  color: red;
  animation: latidos 0.5s infinite;
  transform-origin: center;
  width: 200px;
}
/* Animación con keyframe llamada "latidos" */
@keyframes latidos {
  from {
    transform: none;
  }
  50% {
    transform: scale(1.01);
  }
  to {
    transform: none;
  }
}

.titleCompany {
  font-family: verdana, sans-serif;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 3.2pt;
  word-spacing: 30pt;
  line-height: 3;
  color: white;
  text-shadow: black 0.1em 0.1em 0.2em;
}

.linkRef {
  text-decoration: none;
  color: white;
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
.alingnLogout {
  text-align: left;
}
</style>
