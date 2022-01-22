<template>
  <div>
    <!-- Formulario login start-->
    <form class="text-center formLogin mt-5">
      <!-- Input email start -->
      <div class="inner-addon left-addon mb-4">
        <font-awesome-icon
          class="glyphicon glyphicon-user"
          icon="fa-solid fa-user"
        />
        <input
          v-model="email"
          type="email"
          class="form-control rounded-pill"
          placeholder="Email"
          required
        />
      </div>
      <!-- Input email end -->
      <!-- Input password start-->
      <div class="inner-addon left-addon mb-4">
        <font-awesome-icon
          class="glyphicon glyphicon-user"
          icon="fa-solid fa-key"
        />
        <input
          v-model="password"
          type="password"
          class="form-control rounded-pill"
          placeholder="Password"
          required
          minlength="6"
        />
      </div>
      <!-- Input email end -->
      <!-- Boton login start-->
      <div class="d-grid gap-2 shadow-lg">
        <button type="submit" @click="userLogin" class="btn btn-primary rounded-pill" >INGRESAR</button>
      </div>
      <div v-if="notificationLocal" class="mt-2 validateInput">
        <font-awesome-icon icon="fa-exclamation-triangle" />
        <strong> {{messageLocal}}</strong>
      </div>
      <!-- Boton login end-->
    </form>
    <strong v-if="loginFailed" class="mt-2 validateInput"><font-awesome-icon icon="fa-exclamation-triangle" /> {{loginFailed}}</strong>
    <!-- Formulario login end -->
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "LoginUser",
  data() {
    return {
      email: "",
      password: "",
      notificationLocal: false,
      messageLocal: ''
    };
  },
  methods: {
    ...mapActions(["login_User"]),
    ...mapMutations(["CLEAN_NOTIFICATION_LOGIN"]),
    clearInput() {
      this.email = "", 
      this.password = "",
      this.notificationLocal = false,
      this.messageLocal = ''
    },
    userLogin() {
      if (this.validation()) {
        const formData = { email: this.email, password: this.password };
        this.login_User(formData);
        this.clearInput();
      }
      this.CLEAN_NOTIFICATION_LOGIN();
    },
    validation(){
      let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if(!emailRegex.test(this.email)){
        this.messageLocal = 'Fomato de correo Incorrecto'
        this.notificationLocal = true;
        return false;
      }else if(this.password.length < 6){
        this.messageLocal = 'Password debe tener 6 o mas caracteres'
        this.notificationLocal = true;
        return false;
      }else{
        return true;
      }
    }
  },
  computed:{
    ...mapState(["notificationLogin"]),
    loginFailed(){
      return this.notificationLogin;
    }
  }
};
</script>

<style>
.validateInput {
  color: white;
}
.inner-addon {
  position: relative;
}
.inner-addon .glyphicon {
  position: absolute;
  padding: 10px;
  pointer-events: none;
}
.left-addon .glyphicon {
  left: 0px;
}
.right-addon .glyphicon {
  right: 0px;
}
.left-addon input {
  padding-left: 30px;
}
.right-addon input {
  padding-right: 30px;
}
.formLogin {
  margin: 0 auto;
  width: 70%;
}

@media (min-width: 1000px) {
  .formLogin {
    margin: 0 auto;
    width: 25%;
  }
}
</style>