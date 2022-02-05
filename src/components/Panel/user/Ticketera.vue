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
              &nbsp;
              <button
                type="button"
                class="btn btn-success rounded-pill buttonNew"
                @click="$bvModal.show('bv-modal-new')"
              >
                <strong>Nuevo</strong>
              </button>
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
                  <td>{{ formatDate(tkt.data.dateTimeStart)}}</td>
                  <!-- If -->
                  <td v-if="tkt.data.sla > 1">{{ tkt.data.sla }} dias</td>
                  <td v-else>{{ tkt.data.sla }} dia</td>
                  <!-- If end-->
                  <!-- If -->
                  <td v-if="calculationSla(tkt.data.dateTimeStart, tkt.data.sla)"><p class="rounded-pill bg-success text-center statusSLA my-2"><strong>A Tiempo</strong></p></td>
                  <td v-else><p class="rounded-pill bg-danger text-center statusSLA my-2"><strong> Vencido</strong></p></td>
                  <!-- If end-->
                  <td>{{ tkt.data.serviceType }}</td>
                  <td>{{ tkt.data.supportType }}</td>
                  <!-- If -->
                  <td v-if="tkt.data.serviceType === 'Hardware'">
                    {{ tkt.data.hardware}}
                  </td>
                  <td v-else-if="tkt.data.serviceType === 'Software'">
                      {{ tkt.data.software }}
                  </td>
                  <td v-else>-</td>
                  <!-- If end-->
                  <td>
                    <ModalShow :ticketSelected="tkt" :technical="getTechnical(tkt.data.technicalId)"/>
                    <ModalEdit :ticketSelected="tkt"/>
                    <ModalDelete :ticketSelected="tkt"/>
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

    <!-- Modal start -->
    <div>
      <b-modal id="bv-modal-new" hide-footer size="xl">
        <!-- Header modal start -->
        <template #modal-title>
          <font-awesome-icon icon="fa-clipboard-list" class="mx-2" />
          <strong>Nuevo Ticket</strong>
        </template>
        <!-- Header modal end -->

        <!-- Body modal start -->
        <div class="d-block text-center">
          <!-- Fomulario start-->
          <v-form v-model="valid">
            <!-- Datos personales start-->
            <v-container class="border mb-3">
              <strong><label class="titleForm">Datos personales</label></strong>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="name"
                    label="Nombre"
                    required
                    disabled
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="lastname"
                    label="Apellido"
                    required
                    disabled
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="rut"
                    label="Rut"
                    required
                    disabled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <!-- Datos personales end-->

            <!-- Datos de incidencia start-->
            <v-container class="border">
              <strong
                ><label class="titleForm">Datos de Incidencia</label></strong
              >
              <v-row>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="typeSupportSelected"
                    :items="typeSupport"
                    label="1) Tipo de Soporte"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-select
                    v-model="typeServiceSelected"
                    :items="typeService"
                    label="2) Tipo de Servicio"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="4" v-if="validateSelectHardware">
                  <v-select
                    v-model="hardwareSelected"
                    :items="supportHardware"
                    label="3) Tipo Hardware"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="4" v-if="validateSelectSoftware">
                  <v-select
                    v-model="softwareSelected"
                    :items="supportSoftware"
                    label="3) Tipo Software"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="12">
                  <v-textarea
                    v-model="datailTicket"
                    name="input-7-1"
                    label="Detalle incidencia"
                    hint="Ingrese detalle"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <!-- Datos de incidencia end-->
          </v-form>
          <!-- Fomulario end-->
        </div>
        <!-- Body modal end -->
        <hr />
        <!-- Footer modal start -->
        <b-button class="" block @click="cancelTicket">Cancelar</b-button>
        <b-button
          class="mx-2 btn-success"
          block
          @click="newTicket"
          :disabled="ValidateSave == false"
          >Guardar</b-button
        >
        <!-- Footer modal end -->
      </b-modal>
    </div>
    <!-- Modal end -->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { mixins } from "../../../mixins/mixins";
import ModalDelete from './ModalDelete.vue';
import ModalEdit from './ModalEdit.vue';
import ModalShow from './ModalShow.vue';

export default {
  name: "Ticketera",
  components:{
      ModalDelete,
      ModalEdit,
      ModalShow
  },
  data() {
    return {
      datailTicket: "",
      typeServiceSelected: "",
      typeSupportSelected: "",
      softwareSelected: "",
      hardwareSelected: "",
      search: "",
      valid: false,
      name: "",
      lastname: "",
      rut: "",
      typeService: ["Software", "Hardware", "Otros"],
      supportHardware: [
        "Notebook",
        "CPU",
        "Pantalla",
        "Cableado",
        "Red",
        "Teclado",
        "Mouse",
        "Impresora",
        "Otros",
      ],
      supportSoftware: ["Windows", "Linux", "Mac", "App", "Otros"],
      typeSupport: ["Instalacion", "Mantencion", "Reparacion"],
    };
  },
  mixins: [mixins],
  methods: {
    ...mapActions("Ticketera", ["add_Ticket", "fetch_Tickets", "fetch_Technical"]),
    ...mapMutations("Ticketera", ["CLEAN_NOTIFICATION", "SET_NETXTURN"]),
    newTicket() {
      const ticket = {
        userId: this.currentUser.id,
        numberTicket: this.getNumberTicket,
        dateTimeStart: this.dateToday(),
        dateTimeEnd: "",
        serviceType: this.typeServiceSelected,
        supportType: this.typeSupportSelected,
        hardware: this.hardwareSelected,
        software: this.softwareSelected,
        detail: this.datailTicket,
        sla: this.fetchSla(this.typeServiceSelected),
        resolution: "",
        ticketStatus: "Ingresado",
        technicalId: this.assignment(),
      };
      this.add_Ticket(ticket);
      this.cleanFormTicket();
      this.fetch_Tickets();
      this.$forceUpdate();
      this.$bvModal.hide("bv-modal-new");
    },
    cleanFormTicket() {
      (this.datailTicket = ""),
        (this.typeServiceSelected = ""),
        (this.typeSupportSelected = ""),
        (this.softwareSelected = ""),
        (this.hardwareSelected = "");
    },
    cleanSearch() {
      (this.search = ""), this.SET_SEARCH("");
    },
    cancelTicket() {
      this.flashMessage.info({
        title: "TICKETERA",
        message: "Se cancela la creacion del ticket.",
        icon: "https://smwbtech.github.io/vue-flash-message/info.svg",
      });
      this.cleanFormTicket();
      this.$bvModal.hide("bv-modal-new");
    },
    getTechnical(technicalId){
      const result = this.technicals.filter(tech => tech.id == technicalId ) 
      return result;
    },
    assignment(){
      // agrupar id de tecnicos
      let idTechnicals = [];
      let id = '';
      for (const key in this.technicals) {
        idTechnicals.push(this.technicals[key].id)
      }
      // validar variable assignmentShift
      if (this.assignmentShift == 0){
        id = idTechnicals[0];
        this.SET_NETXTURN(1);
      }else if(this.assignmentShift == (idTechnicals.length - 1) ){
        id = idTechnicals[idTechnicals.length - 1];
        this.SET_NETXTURN(0);
      }else {
        let currentTurn = this.assignmentShift;
        let nextTurn = currentTurn + 1;
        id = idTechnicals[currentTurn];
        this.SET_NETXTURN(nextTurn);
      }
      return id
    }
  },
  computed: {
    ...mapState(["currentUser"]),
    ...mapState("Ticketera", ["notification", "technicals", "assignmentShift"]),
    ...mapGetters("Ticketera", ["getTickets", "getNumberTicket"]),
    supportServiceC() {
      return this.typeService;
    },
    validateSelectHardware() {
      if (this.typeSupportSelected.length == 0) return false;
      if (this.typeServiceSelected.length == 0) return false;
      if (this.typeServiceSelected === "Hardware") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.softwareSelected = "";
        return true;
      }
      return false;
    },
    validateSelectSoftware() {
      if (this.typeSupportSelected.length == 0) return false;
      if (this.typeServiceSelected.length == 0) return false;
      if (this.typeServiceSelected === "Software") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.hardwareSelected = "";
        return true;
      }
      return false;
    },
    ValidateSave() {
      if (this.typeServiceSelected && this.typeSupportSelected) {
        return true;
      }
      return false;
    },
    showTickets() {
      if (this.search.length < 1 && this.getTickets.length < 1) {
        return [];
      }
      if (this.search.length < 1 && this.getTickets.length > 0) {
        return this.getTickets;
      }
      const result = this.getTickets.filter(
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
    this.fetch_Technical();
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
.statusSLA{
    width: 100px;
    color: white;
    font-size:12px;
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