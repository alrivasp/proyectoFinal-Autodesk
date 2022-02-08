<template>
  <div class="container">
    <div class="cardRegistro">
      <v-card elevation="24" loading outlined shaped>
        <div class="" style="display: flex">
          <div class="" style="display: flex; justify-content: flex-start">
            <img
              class="iconAutodesk"
              src="../../assets/img/autodesk.png"
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
            <span class="titleRegister">Registro</span>
          </div>
        </div>
        <v-form ref="form" v-model="valid" lazy-validation class="mx-5 px-5">
          <v-text-field
            id="inputName"
            v-model="name"
            :counter="20"
            :rules="nameRules"
            label="Nombre"
            required
          ></v-text-field>

          <v-text-field
            id="inputLastName"
            v-model="lastName"
            :counter="20"
            :rules="lastNameRules"
            label="Apellido"
            required
          ></v-text-field>

          <v-text-field
            id="inputEmail"
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            id="inputRut"
            v-model="rut"
            :counter="13"
            :rules="rutRules"
            label="Rut"
            required
          ></v-text-field>

          <v-text-field
            id="inputPosition"
            v-model="position"
            :counter="30"
            :rules="positionRules"
            label="Cargo"
            required
          ></v-text-field>

          <v-text-field
            id="inputPhone"
            v-model="phone"
            :counter="13"
            :rules="phoneRules"
            label="Telefono"
            required
          ></v-text-field>

          <v-text-field
            id="inputCompany"
            v-model="company"
            :counter="20"
            :rules="companyRules"
            label="Compañia"
            required
          ></v-text-field>

          <v-text-field
            id="inputCity1"
            v-model="city"
            :counter="30"
            :rules="cityRules"
            label="Ciudad"
            required
          ></v-text-field>

          <v-text-field
            id="inputPassword"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-btn :disabled="!valid" class="mr-4 bg-info" @click="validate">
            Validar
          </v-btn>

          <v-btn color="error" class="mr-4 bg-danger mx-1" @click="reset">
            Reset Form</v-btn
          >

          <v-btn color="warning" class="bg-warning" @click="resetValidation">
            Reset Validacion
          </v-btn>
        </v-form>
        <div class="d-grid gap-2 mt-4">
          <button
            @click="registerUser"
            class="btn btn-primary btn-sm"
            :disabled="!validRegister"
          >
            <strong> REGISTRAR </strong>
          </button>
        </div>
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
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Nombre es requerido",
        (v) =>
          (v && v.length <= 20) ||
          "Nombre debe tener como maximo 20 caracteres",
      ],
      lastName: "",
      lastNameRules: [
        (v) => !!v || "Apellido es requerido",
        (v) =>
          (v && v.length <= 20) ||
          "Apellido debe tener como maximo 20 caracteres",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail es requerido",
        (v) => /.+@.+\..+/.test(v) || "E-mail debe ser valido",
      ],
      rut: "",
      rutRules: [
        (v) => !!v || "Rut es requerido",
        (v) =>
          (v && v.length <= 13) || "Rut debe tener como maximo 13 caracteres",
      ],
      position: "",
      positionRules: [
        (v) => !!v || "Cargo es requerido",
        (v) =>
          (v && v.length <= 30) || "Cargo debe tener como maximo 30 caracteres",
      ],
      phone: "",
      phoneRules: [
        (v) => !!v || "Telefono es requerido",
        (v) =>
          (v && v.length <= 13) ||
          "Telefono debe tener como maximo 13 caracteres",
      ],
      company: "",
      companyRules: [
        (v) => !!v || "Compañia es requerido",
        (v) =>
          (v && v.length <= 20) ||
          "Compañia debe tener como maximo 20 caracteres",
      ],
      city: "",
      cityRules: [
        (v) => !!v || "Ciudad es requerido",
        (v) =>
          (v && v.length <= 30) ||
          "Ciudad debe tener como maximo 30 caracteres",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Password es requerido",
        (v) =>
          (v && v.length >= 6) ||
          "Password debe tener mas de 6 caracteres",
      ],
    };
  },
  methods: {
    ...mapActions("Register", ["register_User"]),
    clearInput() {
      (this.name = ""),
        (this.lastName = ""),
        (this.email = ""),
        (this.rut = ""),
        (this.role = "user"),
        (this.position = ""),
        (this.phone = ""),
        (this.company = ""),
        (this.city = ""),
        (this.password = ""),
        (this.status = "active");
    },
    registerUser() {
      const formData = {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        rut: this.rut,
        role: "user",
        position: this.position,
        phone: this.phone,
        company: this.company,
        city: this.city,
        password: this.password,
        status: "active"
      }
      this.register_User(formData);
      this.clearInput();
      this.flashMessage.success({
        title: 'Registro de usuario',
        message: 'Usuario registrado correctamente',
        icon: 'https://smwbtech.github.io/vue-flash-message/success.svg'
      });
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  computed:{
    validRegister(){
      if(this.name == "" ||
      this.lastName == "" ||
      this.email == "" ||
      this.rut == "" ||
      this.position == "" ||
      this.phone == "" ||
      this.company == "" ||
      this.city == "" ||
      this.password == ""){
        return false
      }else{
      return true
      }
    }
  }
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