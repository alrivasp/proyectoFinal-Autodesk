<template>
  <span>
    <b-button
      class="btn btn-success btn-sm"
      id="show-btn"
      @click="$bvModal.show(`gestion-${ticketSelected.id}`)"
    >
      Gestionar TKT
    </b-button>

    <b-modal :id="`gestion-${ticketSelected.id}`" hide-footer size="xl">
      <template #modal-title>
        <font-awesome-icon
          class="glyphicon glyphicon-user mx-2"
          icon="fa-solid fa-sync"
        />
        <strong
          >Gestion de Ticket N° {{ ticketSelected.data.numberTicket }}</strong
        >
      </template>
      <div class="d-block p-4">
        <!-- info personal start-->
        <div class="">
          <div class="row shadow">
            <div class="col-6 border info">
              <span
                ><strong>Nombre: </strong>{{ capitalize(currentUser.name) }}
                {{ capitalize(currentUser.lastName) }}</span
              >
            </div>
            <div class="col-6 border info">
              <span
                ><strong>Rut: </strong>{{ capitalize(currentUser.rut) }}</span
              >
            </div>
          </div>
          <div class="row shadow">
            <div class="col-6 border info">
              <span><strong>Email: </strong>{{ currentUser.email }}</span>
            </div>
            <div class="col-6 border info">
              <span><strong>Telefono: </strong>{{ currentUser.phone }}</span>
            </div>
          </div>
          <div class="row shadow">
            <div class="col-6 border info">
              <span><strong>Ciudad: </strong>{{ currentUser.city }}</span>
            </div>
            <div class="col-6 border info">
              <span><strong>Empresa: </strong>{{ currentUser.company }}</span>
            </div>
          </div>
        </div>
        <!-- info personal end-->
        <!-- info problema start-->
        <div class="mt-5">
          <div class="row shadow">
            <div class="col-4 border info">
              <span
                ><strong>Soporte: </strong
                >{{ ticketSelected.data.supportType }}</span
              >
            </div>
            <div class="col-4 border info">
              <span
                ><strong>Servicio: </strong
                >{{ ticketSelected.data.serviceType }}</span
              >
            </div>
            <div class="col-4 border info">
              <span v-if="ticketSelected.data.software"
                ><strong>Software: </strong
                >{{ ticketSelected.data.software }}</span
              >
              <span v-if="ticketSelected.data.hardware"
                ><strong>Hardware: </strong
                >{{ ticketSelected.data.hardware }}</span
              >
            </div>
          </div>
          <div class="row shadow">
            <div class="col-12 border info">
              <span
                ><strong>Detalle: </strong
                >{{ ticketSelected.data.detail }}</span
              >
            </div>
          </div>
        </div>
        <!-- info problema end-->
        <!-- info tkt start-->
        <div class="mt-5">
          <div class="row shadow">
            <div class="col-3 border info">
              <span
                ><strong>Estado TKT: </strong
                >{{ ticketSelected.data.ticketStatus }}</span
              >
            </div>
            <div class="col-3 border info">
              <span
                ><strong>Fecha Inicio: </strong
                >{{ formatDate(ticketSelected.data.dateTimeStart) }}</span
              >
            </div>
            <div class="col-3 border info">
              <span
                ><strong>SLA dias: </strong>{{ ticketSelected.data.sla }}</span
              >
            </div>
            <div
              class="col-3 border bg-vigente"
              v-if="
                calculationSla(
                  ticketSelected.data.dateTimeStart,
                  ticketSelected.data.sla,
                  ticketSelected.data.dateTimeEnd
                )
              "
            >
              <span><strong>Estado/SLA: </strong>A TIEMPO</span>
            </div>
            <div class="col-3 border bg-vencido" v-else>
              <span><strong>Estado/SLA: </strong>VENCIDO</span>
            </div>
          </div>
        </div>
        <!-- info tkt end-->
        <!-- info tecnico end-->
        <div class="mt-5">
          <div class="row shadow">
            <div class="col-4 border info">
              <span
                ><strong>Tecnico responsable: </strong
                >{{ technical[0].data.name }}
                {{ technical[0].data.lastName }}</span
              >
            </div>
            <div class="col-4 border info">
              <span><strong>Email: </strong>{{ technical[0].data.email }}</span>
            </div>
            <div class="col-4 border info">
              <span
                ><strong>Telefono: </strong>{{ technical[0].data.phone }}</span
              >
            </div>
          </div>
        </div>
        <!-- info tecnico end-->
        <!-- Resolution start-->
        <div class="mt-4">
          <div class="row">
            <div class="col-3">
              <v-select
                v-model="tkt.ticketStatus"
                :items="items"
                label="Seleccione Estado"
                solo
              ></v-select>
            </div>
            <div class="col">
              <v-textarea
                v-model="tkt.resolution"
                solo
                name="input-7-4"
                label="Resulucion / Comentario"
              ></v-textarea>
            </div>
          </div>
        </div>
        <!-- Resolution end-->
        <hr />
        <div class="text-center">
          <button
            class="btn btn-info btn-modal mx-2 shadow"
            type="button"
            @click="$bvModal.hide(`gestion-${ticketSelected.id}`)"
          >
            Cerrar
          </button>
          <button
            :disabled="validateResolution"
            class="btn btn-success btn-modal mx-2 shadow"
            type="button"
            @click="editTkt"
          >
            Guardar
          </button>
        </div>
      </div>
    </b-modal>
  </span>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { mixins } from "../../../mixins/mixins";

export default {
  name: "ModalGestion",
  mixins: [mixins],
  props: {
    ticketSelected: Object,
    technical: Array,
  },
  data() {
    return {
      tkt: [],
      before: [],
      items: ["Ingresado","En proceso", "Pausado", "Cerrado", "Cancelado"],
    };
  },
  methods: {
    ...mapActions(["update_Tkt"]),
    editTkt() {
      if(this.tkt.ticketStatus == 'Cerrado' || this.tkt.ticketStatus == 'Cancelado'){ this.tkt.dateTimeEnd = this.dateToday(); }
      const { ticketStatus } = this.tkt.ticketStatus;
      this.before.ticketStatus = ticketStatus;
      const formData = { id: this.ticketSelected.id, data: this.tkt };
      this.update_Tkt(formData);
      this.flashMessage.success({
        title: "Gestion de TKT",
        message: `Tkt N°${this.tkt.numberTicket} cambio su estado a ${this.tkt.ticketStatus} correctamente`,
        icon: "https://smwbtech.github.io/vue-flash-message/success.svg",
      });
      this.$bvModal.hide(`gestion-${this.ticketSelected.id}`)
    },
  },
  computed: {
    ...mapState(["currentUser"]),
    validateResolution() {
      let result = true;
      for (const key in this.tkt) {
        if (this.tkt[key] != this.before[key]) {
          result = false;
          break;
        }
      }
      return result;
    },
  },
  mounted() {
    let temp = { ...this.ticketSelected.data };
    this.tkt = { ...temp };
    this.before = { ...temp };
  },
};
</script>

<style scoped>
.btn-modal {
  width: 45%;
}
.info:hover {
  background-color: rgb(216, 216, 216);
}
.bg-vigente {
  background-color: rgb(41, 223, 116);
}
.bg-vencido {
  background-color: rgb(236, 74, 25);
}
</style>