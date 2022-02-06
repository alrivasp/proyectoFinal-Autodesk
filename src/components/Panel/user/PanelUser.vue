<template>
  <div>
    <!-- Nabvar start -->
    <header
      class="navbar navbar-dark sticky-top bg-primary flex-md-nowrap p-0 shadow"
    >
      <button v-b-toggle.sidebar-1 class="navbar-brand col-md-0 me-0 px-3">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="w-100 titleCompany" v-show="this.ticketera">TICKETERA</div>
      <div class="w-100 titleCompany" v-show="this.dashboard">DASHBOARD</div>
      <div class="w-100 titleCompany" v-show="this.perfil">PERFIL</div>
      <b-button-group class="px-3 buttonNavBar">
        <b-dropdown
          :text="user"
          variant="primary"
          size="sm"
          class="buttonNavBar"
        >
          <b-dropdown-item @click="viewComponent('perfil')"
            >Perfil</b-dropdown-item
          >
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="logout">Cerrar Sesion</b-dropdown-item>
        </b-dropdown>
      </b-button-group>
    </header>
    <!-- NavBar end -->
    <!-- SedeBar start -->
    <b-sidebar id="sidebar-1" shadow>
      <div class="px-3 py-2">
        <div class="text-center">
          <v-img
            src="../../../assets/img/autodesk.png"
            alt="icono autodesk"
            class="text-center iconAutodesk"
          ></v-img>
          <p class="titleSidebar">AUTODESK</p>
          <hr />
        </div>
      </div>
      <div class="itemView" @click="viewComponent('dashboard')">
        <span class="itemArea"
          ><font-awesome-icon class="" icon="fa-tachometer-alt" />
          DASHBOARD</span
        >
      </div>
      <div class="itemView" @click="viewComponent('ticketera')">
        <span class="itemArea"
          ><font-awesome-icon class="" icon="fa-book-open" /> TICKETERA</span
        >
      </div>
      <!-- FOOTER START-->
      <footer class="fixed-bottom bg-primary footer">
        <!-- Clima -->
        <div class="row mt-2 clima" v-show="getClima.length > 0">
          <div class="col-7">
            <span class="px-1"
              ><strong>Ubicacion:</strong> {{ getClima[0]["Estacion"] }}</span
            ><br />
            <span class="px-1"
              ><strong>Temperatura:</strong> {{ getClima[0]["Temp"] }}°</span
            ><br />
            <span class="px-1"
              ><strong>Humedad:</strong> {{ getClima[0]["Humedad"] }}%</span
            ><br />
            <span class="px-1"
              ><strong>Estado:</strong> {{ getClima[0]["Estado"] }}</span
            ><br />
          </div>
          <div class="col-4 main">
            <img
              class="main imgEfect"
              src="../../../assets/img/despejado.png"
              alt="foto_clima"
              width="70px"
              v-show="getClima[0]['Estado'] == 'Despejado'"
            />
            <img
              class="main imgEfect"
              src="../../../assets/img/pocasnubes.png"
              alt="foto_clima"
              width="70px"
              v-show="getClima[0]['Estado'] == 'Escasa nubosidad'"
            />
            <img
              class="main imgEfect"
              src="../../../assets/img/parcialalta.png"
              alt="foto_clima"
              width="70px"
              v-show="getClima[0]['Estado'] == 'Nubosidad parcial'"
            />
            <img
              class="main imgEfect"
              src="../../../assets/img/cubierto.png"
              alt="foto_clima"
              v-show="getClima[0]['Estado'] == 'Cubierto'"
            />
          </div>
        </div>
        <hr />
        <div class="itemFooter">
          <font-awesome-icon class="" icon="fa-user-alt" /> PERFIL TIPO USUARIO
        </div>
      </footer>
      <!-- FOOTER END-->
    </b-sidebar>
    <!-- SedeBar end -->
    <!-- Body component start-->
    <div v-show="dashboard">
      <Dashboard />
    </div>
    <div v-show="ticketera">
      <Ticketera />
    </div>
    <div v-show="perfil">
      <Perfil @viewComponent="viewComponent" />
    </div>
    <!-- Body component end-->
  </div>
</template>

<script>
import Ticketera from "./Ticketera.vue";
import Dashboard from "./Dashboard.vue";
import Perfil from "./Perfil.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "PanelUser",
  components: { Ticketera, Dashboard, Perfil },
  props: { user: String },
  data() {
    return {
      dashboard: true,
      ticketera: false,
      perfil: false,
    };
  },
  methods: {
    viewComponent(view) {
      if (view === "ticketera") {
        this.ticketera = true;
        this.dashboard = false;
        this.perfil = false;
      } else if (view === "dashboard") {
        this.ticketera = false;
        this.dashboard = true;
        this.perfil = false;
      } else {
        this.ticketera = false;
        this.dashboard = false;
        this.perfil = true;
      }
    },
    logout() {
      this.logout_User;
    },
  },
  computed: {
    ...mapActions(["logout_User", "fetch_Clima"]),
    ...mapState(["clima", "currentUser"]),
    getClima() {
      const data = this.clima.filter(
        (item) => item["Estacion"] == this.currentUser.city
      );

      return data;
    },
  },
  updated() {
    // Notificaciones
    if (this.notification) {
      this.flashMessage.success({
        title: this.notification.title,
        message: this.notification.message,
        icon: this.notification.icon,
      });
      this.CLEAN_NOTIFICATION();
    }
  },
  mounted() {
    this.fetch_Clima;
  },
};
</script>

<style scoped>
.main:hover .imgEfect {
  transform: scale(1.4);
}
.main {
  transition: 1s;
}
.clima {
  font-size: 12px;
}
.footer {
  color: white;
  height: 160px;
}
.itemFooter {
  margin-left: 65px;
  margin-top: 15px;
}
.itemArea {
  margin-left: 70px;
}
.itemView {
  font-size: 20px;
}
.itemView:hover {
  background-color: #007bff;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
.titleCompany {
  font-family: verdana, sans-serif;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1pt;
  word-spacing: 30pt;
  line-height: 3;
  color: rgba(255, 255, 255, 0.55);
}
.titleSidebar {
  font-family: verdana, sans-serif;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 3.2pt;
  word-spacing: 30pt;
  line-height: 3;
  color: rgb(26, 10, 10);
  text-shadow: rgb(156, 156, 156) 0.1em 0.1em 0.2em;
}
.buttonNavBar {
  color: rgba(255, 255, 255, 0.55) !important;
}
.sidebar {
  background-color: black !important;
}
.iconAutodesk {
  display: inline-block;
  font-size: 150px;
  text-shadow: 0 0 10px #222, 1px 1px 0 #450505;
  color: red;
  animation: latidos 0.5s infinite;
  transform-origin: center;
  width: 60px;
}
/* Animación con keyframe llamada "latidos" */
@keyframes latidos {
  from {
    transform: none;
  }
  50% {
    transform: scale(1.02);
  }
  to {
    transform: none;
  }
}
</style>