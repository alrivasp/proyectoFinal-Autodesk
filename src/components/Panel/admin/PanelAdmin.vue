<template>
  <div>
    <!-- Nabvar start -->
    <header
      class="navbar navbar-dark sticky-top bg-primary flex-md-nowrap p-0 shadow"
    >
      <button v-b-toggle.sidebar-1 class="navbar-brand col-md-0 me-0 px-3">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="w-100 titleCompany">AUTODESK</div>
      <b-button-group class="px-3 buttonNavBar">
        <b-dropdown
          :text="user"
          variant="primary"
          size="sm"
          class="buttonNavBar"
        >
          <b-dropdown-item>Perfil</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item>Cerrar Sesion</b-dropdown-item>
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
      <div class="itemView">
        <span class="itemArea"
          ><font-awesome-icon class="" icon="fa-tachometer-alt" />
          DASHBOARD</span
        >
      </div>
      <div class="itemView" @click="">
        <span class="itemArea"
          ><font-awesome-icon class="" icon="fa-book-open" />
          TICKETERA</span
        >
      </div>
      <!-- FOOTER START-->
      <footer class="fixed-bottom bg-primary footer">
         <div class="itemFooter"
          ><font-awesome-icon class="" icon="fa-user-alt" />
          PERFIL TIPO USUARIO</div
        >
      </footer>
      <!-- FOOTER END-->
    </b-sidebar>
    <!-- SedeBar end -->
  </div>
</template>

<script>
export default {
  name: "PanelUser",
  props: { user: String },
  data() {
    return {
      
    }
  }
};
</script>

<style scoped>
.footer{
    color:white;
    height:50PX;
}
.itemFooter{
    margin-left: 65px;
    margin-top: 15px;
}
.itemArea{
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