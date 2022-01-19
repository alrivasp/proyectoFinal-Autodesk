<template>
  <div class="container">
    <div class="cardRegistro">
      <v-card elevation="24" loading outlined shaped>
        <div class="" style="display: flex;">
          <div class="" style="display: flex; justify-content: flex-start;" >
            <img class="iconAutodesk" src="../../assets/img/autodesk.png" alt="icono autodesk">
          </div>
          <div class="" style="display: flex; justify-content: left; align-items: center; margin-top: 20px;">
            <span class="titleRegister">Registro</span>
          </div>
        </div>
        <form class="px-5 pb-4">
          <v-text-field
            v-model="user.name"
            :counter="20"
            label="Nombre"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.lastName"
            :counter="20"
            label="Apellido"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.rut"
            :counter="20"
            label="Rut"
            required
            placeholder="11.111.111-k"
          ></v-text-field>
          <v-text-field
            v-model="user.position"
            :counter="20"
            label="Cargo"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.phone"
            :counter="9"
            label="Telefono"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.company"
            :counter="20"
            label="Empresa"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.city"
            :counter="20"
            label="Ciudad"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            type="password"
            label="Password"
            required
          ></v-text-field>
          <div class="d-grid gap-2 mt-4">
            <button @click="registerUser" class="btn btn-primary btn-sm">
              <strong> REGISTRAR </strong>
            </button>
          </div>
        </form>
      </v-card>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer/Footer.vue";
import { mapActions } from "vuex";

export default {
  name: "Register",
  components: { Footer },
  data() {
    return {
      user: {
        name: '',
        lastName: '',
        email: '',
        rut: '',
        role: 'user',
        position: '',
        phone: '',
        company: '',
        city: '',
        password: '',
        status: 'active'
      },
    };
  },
  methods: {
    ...mapActions("Register", ["register_User"]),
    clearInput() {
      this.user.name = '', 
      this.user.lastName = '',
      this.user.email = '',
      this.user.rut = '',
      this.user.role = 'user',
      this.user.position = '',
      this.user.phone = '',
      this.user.company = '',
      this.user.city = '',
      this.user.password = '',
      this.user.status = 'active'
    },
    registerUser() {
      const formData = this.user;
      this.register_User(formData);
      this.clearInput();
    },
  },
};
</script>

<style scoped>
.cardRegistro {
  margin: 0 auto;
  width: 90%;
}

.iconAutodesk {
  display: inline-block;
  animation: latidos 0.5s infinite;
  width: 60px;
  margin-left: 30px;
  margin-top: 20px;
}

.titleRegister {
  font-family: verdana, sans-serif;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 2pt;
  word-spacing: 30pt;
  line-height: 3;
  color: black;
  text-shadow: rgb(126, 107, 107) 0.1em 0.1em 0.2em;
  display: flex;
  align-items: center;
}

@media (min-width: 1000px) {
  .cardRegistro {
    margin: 0 auto;
    width: 50%;
  }
}
</style>