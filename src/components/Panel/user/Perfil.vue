<template>
  <div class="container">
    <div class="cardRegistro">
      <v-card elevation="24" loading outlined shaped>
        <div class="" style="display: flex">
          <div class="" style="display: flex; justify-content: flex-start">
            <img
              class="iconAutodesk"
              src="../../../assets/img/autodesk.png"
              alt="icono autodesk"
            />
          </div>
          <div
            class=""
            style="
              display: flex;
              justify-content: left;
              align-items: center;
              margin-top: 20px;
            "
          >
            <span class="titleRegister">Perfil</span>
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
        </form>
        <div class="d-grid gap-2 mt-4">
            <button @click="editUser" class="btn btn-primary btn-sm" :disabled="validadorProperties">
              <strong> Editar </strong>
            </button>
          </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Perfil",
  data() {
    return {
      user: {
        name: "",
        lastName: "",
        email: "",
        rut: "",
        role: "user",
        position: "",
        phone: "",
        company: "",
        city: "",
        status: "active",
      },
      before: {
        name: "",
        lastName: "",
        email: "",
        rut: "",
        role: "user",
        position: "",
        phone: "",
        company: "",
        city: "",
        status: "active",
      },
    };
  },
  methods: {
    ...mapActions(["update_User"]),
    editUser() {
      const formData = { id: this.currentUser.id, data: this.user };
      this.update_User(formData);
      this.flashMessage.success({
        title: 'Perfil de usuario',
        message: 'Perfil editado correctamente',
        icon: 'https://smwbtech.github.io/vue-flash-message/success.svg'
      });
      this.$emit('viewComponent', 'dashboard');
    },
  },
  computed: {
    ...mapState(["currentUser"]),
    validadorProperties(){
      let result = true
      for (const key in this.user) {
        if(this.user[key] != this.before[key]){
          result = false;
          break;
        }
      }
     return result
    }
  },
  mounted() {
    let { password, id , ...newUser } = this.currentUser;
    this.user = {...newUser};
    this.before = {...newUser}
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