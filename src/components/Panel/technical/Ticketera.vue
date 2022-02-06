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
                placeholder="Buscar por N° de Ticket"
                required
              />
            </div>
          </form>
        </div>
        <!-- header card end -->
        <hr />
        <!-- body card start-->
        <div class="card-body">
          <div class="table-responsive" v-if="showTickets.length > 0">
            <table class="table table-sm table-hover">
              <thead>
                <tr>
                  <th scope="col">Tkt</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha Inicio</th>
                  <th scope="col">SLA</th>
                  <th scope="col">SLA/Status</th>
                  <th scope="col">Servicio</th>
                  <th scope="col">Soporte</th>
                  <th scope="col">Tipo</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr class="shadow" v-for="tkt in showTickets" :key="tkt.id">
                  <th scope="row">{{ tkt.data.numberTicket }}</th>
                  <td>{{ tkt.data.ticketStatus }}</td>
                  <td>{{ formatDate(tkt.data.dateTimeStart) }}</td>
                  <!-- If -->
                  <td v-if="tkt.data.sla > 1">{{ tkt.data.sla }} dias</td>
                  <td v-else>{{ tkt.data.sla }} dia</td>
                  <!-- If end-->
                  <!-- If -->
                  <td
                    v-if="calculationSla(tkt.data.dateTimeStart, tkt.data.sla, tkt.data.dateTimeEnd)"
                  >
                    <p
                      class="rounded-pill bg-success text-center statusSLA my-2"
                    >
                      <strong>A Tiempo</strong>
                    </p>
                  </td>
                  <td v-else>
                    <p
                      class="rounded-pill bg-danger text-center statusSLA my-2"
                    >
                      <strong> Vencido</strong>
                    </p>
                  </td>
                  <!-- If end-->
                  <td>{{ tkt.data.serviceType }}</td>
                  <td>{{ tkt.data.supportType }}</td>
                  <!-- If -->
                  <td v-if="tkt.data.serviceType === 'Hardware'">
                    {{ tkt.data.hardware }}
                  </td>
                  <td v-else-if="tkt.data.serviceType === 'Software'">
                    {{ tkt.data.software }}
                  </td>
                  <td v-else>-</td>
                  <!-- If end-->
                  <td>
                      <ModalGestion :ticketSelected="tkt" :technical="getTechnical(tkt.data.technicalId)"/>
                      <ModalReasign :ticketSelected="tkt" :technicals="technicals"/>
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
import ModalGestion from './ModalGestion.vue';
import ModalReasign from './ModalReasign.vue';

export default {
  name: "Ticketera",
  components: { ModalGestion, ModalReasign },
  data() {
    return {
      search: "",
      name: "",
      lastname: "",
      rut: "",
    };
  },
  mixins: [mixins],
  methods: {
    ...mapActions("Ticketera", ["fetch_Tickets"]),
    ...mapMutations("Ticketera", ["CLEAN_NOTIFICATION"]),
    cleanSearch() {
      this.search = ""
    },
    getTechnical(technicalId){
      const result = this.technicals.filter(tech => tech.id == technicalId ) 
      return result;
    },
  },
  computed: {
    ...mapState(["currentUser"]),
    ...mapState("Ticketera", ["notification", "technicals", "assignmentShift"]),
    ...mapGetters("Ticketera", ["getTicketsTechnical"]),
    showTickets() {
      if (this.search.length < 1 && this.getTicketsTechnical.length < 1) {
        return [];
      }
      if (this.search.length < 1 && this.getTicketsTechnical.length > 0) {
        return this.getTicketsTechnical;
      }
      const result = this.getTicketsTechnical.filter(
        (t) => t.data.numberTicket == this.search
      );
      return result;
    },
  },
  mounted() {
    this.name = this.currentUser.name;
    this.lastname = this.currentUser.lastName;
    this.rut = this.currentUser.rut;
    this.fetch_Tickets();
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