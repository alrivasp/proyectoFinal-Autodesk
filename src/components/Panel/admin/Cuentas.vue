<template>
  <div class="container mt-4" data-app>
    <!-- Tarjeta start -->
    <div class="card text-dark bg-light">
      <div class="card">
        <!-- header card -->
        <div class="pt-3">
          <form class="formSearchTicket">
            <div class="inner-addon left-addon d-flex">
              <font-awesome-icon
                class="glyphicon glyphicon-user"
                icon="fa-solid fa-search"
              />
              <input
                v-model="search"
                type="text"
                class="form-control rounded-pill search__Ticketera shadow"
                placeholder="Buscar por N° de Rut"
                required
              />
            </div>
          </form>
        </div>
        <!-- header card end -->
        <hr />
        <!-- body card start-->
        <div class="card-body">
          <div class="table-responsive" v-if="showUsers.length > 0">
            <table class="table table-sm table-hover">
              <thead>
                <tr>
                  <th scope="col">N°</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Rut</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Cargo</th>
                  <th scope="col">Empresa</th>
                  <th scope="col">Ciudad</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Estado</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="shadow"
                  v-for="(user, index) in showUsers"
                  :key="user.id"
                >
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ capitalize(user.data.name) }}</td>
                  <td>{{ capitalize(user.data.lastName) }}</td>
                  <td>{{ user.data.rut }}</td>
                  <td>{{ user.data.email }}</td>
                  <td>{{ user.data.phone }}</td>
                  <td>{{ capitalize(user.data.position) }}</td>
                  <td>{{ capitalize(user.data.company) }}</td>
                  <td>{{ capitalize(user.data.city) }}</td>
                  <!--- If rol start-->
                  <td v-if="user.data.role === 'user'">Usuario</td>
                  <td v-else-if="user.data.role === 'technical'">Tecnico</td>
                  <td v-else>Administrador</td>
                  <!--- If rol end -->
                  <!--- If estado start -->
                  <td v-if="user.data.status === 'active'">Activo</td>
                  <td v-else>Inactivo</td>
                  <!--- If estado end -->
                  <td>
                    <button
                      @click="desactivate(user.id)"
                      class="btn btn-danger btn-sm"
                      v-if="user.data.status === 'active'"
                    >
                      Desactivar
                    </button>
                    <button
                      @click="activate(user.id)"
                      class="btn btn-info btn-sm"
                      v-if="user.data.status === 'inactive'"
                    >
                      Activar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-center">
            <p><strong>No se encontraron resultados</strong></p>
            <font-awesome-icon
              class="glyphicon glyphicon-user fa-3x"
              icon="fa-solid fa-frown"
            />
          </div>
        </div>
        <!-- body card end-->

        <!-- footer card start-->
        <div class="card-footer text-muted text-center">AUTODESK</div>
        <!-- footer card end-->
      </div>
    </div>
    <!-- Tarjeta end -->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { mixins } from "../../../mixins/mixins";

export default {
  name: "Ticketera",
  components: {},
  data() {
    return {
      search: "",
    };
  },
  mixins: [mixins],
  methods: {
    ...mapActions("Cuentas", ["fetch_Users", "update_User"]),
    ...mapMutations("Cuentas", ["CLEAN_NOTIFICATION"]),
    cleanSearch() {
      this.search = "";
    },
    getTechnical(technicalId) {
      const result = this.technicals.filter((tech) => tech.id == technicalId);
      return result;
    },
    desactivate(userId) {
      let user = this.users.filter((entry) => entry.id === userId);
      let { id, data } = user[0];
      data.status = "inactive";
      let updateUser = { id: id, data: data };
      this.update_User(updateUser);
      this.flashMessage.success({
        title: "Gestion de cuentas",
        message: `Usuario ${updateUser.data.name} ${updateUser.data.lastName} se desactivo de Autodesk.-`,
        icon: "https://smwbtech.github.io/vue-flash-message/success.svg",
      });
    },
    activate(userId) {let user = this.users.filter((entry) => entry.id === userId);
      let { id, data } = user[0];
      data.status = "active";
      let updateUser = { id: id, data: data };
      this.update_User(updateUser);
      this.flashMessage.success({
        title: "Gestion de cuentas",
        message: `Usuario ${updateUser.data.name} ${updateUser.data.lastName} se Activa en Autodesk.-`,
        icon: "https://smwbtech.github.io/vue-flash-message/success.svg",
      });},
  },
  computed: {
    ...mapState("Cuentas", ["notification", "technicals", "users"]),
    showUsers() {
      if (this.search.length < 1 && this.users.length < 1) {
        return [];
      }
      if (this.search.length < 1 && this.users.length > 0) {
        return this.users;
      }
      const result = this.users.filter((t) => t.data.rut == this.search);
      return result;
    },
  },
  mounted() {
    this.fetch_Users();
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
};
</script>

<style scoped>
.statusSLA {
  width: 100px;
  color: white;
  font-size: 12px;
}
.titleForm {
  font-family: verdana, sans-serif;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: rgb(26, 10, 10);
  text-shadow: rgb(156, 156, 156) 0.1em 0.1em 0.2em;
}
.buttonNew {
  display: flex;
  align-items: flex-end;
  justify-content: space-between !important;
}
.formSearchTicket {
  width: 90%;
  margin-left: 10px;
  margin-right: 10px;
}
.search__Ticketera {
  background-color: rgb(204, 201, 201) !important;
  color: white;
}
@media (min-width: 1000px) {
  .formSearchTicket {
    margin: 0 auto;
    width: 40%;
  }
}
</style>