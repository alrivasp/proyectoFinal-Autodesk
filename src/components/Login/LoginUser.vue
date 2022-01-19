<template>
  <div>
    <!-- Formulario login start-->
    <form class="text-center formLogin mt-5">
      <!-- Input email start -->
      <div class="inner-addon left-addon mb-4 shadow-lg">
        <font-awesome-icon
          class="glyphicon glyphicon-user"
          icon="fa-solid fa-user"
        />
        <input
          v-model="user.email"
          type="email"
          class="form-control rounded-pill"
          placeholder="Email"
          required
        />
      </div>
      <!-- Input email end -->
      <!-- Input password start-->
      <div class="inner-addon left-addon mb-4 shadow-lg">
        <font-awesome-icon
          class="glyphicon glyphicon-user"
          icon="fa-solid fa-key"
        />
        <input
          v-model="user.password"
          type="password"
          class="form-control rounded-pill"
          placeholder="Password"
          required
          minlength="6"
        />
      </div>
      <!-- Input email end -->
      <div class="d-grid gap-2 shadow-lg">
        <button @click="userLogin" class="btn btn-primary rounded-pill">INGRESAR</button>
      </div>
      <!-- Boton login -->
    </form>
    <!-- Formulario login end -->
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginUser",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["login_User"]),
    clearInput() {
      (this.user = ""), (this.password = "");
    },
    userLogin() {
      const formData = this.user;
      this.login_User(formData);
      this.clearInput();
    },
  },
};
</script>

<style>
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