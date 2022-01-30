<template>
  <span>
    <b-button
      class="btn btn-info btn-sm"
      id="show-btn"
      @click="$bvModal.show(`show-${ticketSelected.id}`)"
    >
      Detalle
    </b-button>

    <b-modal :id="`show-${ticketSelected.id}`" hide-footer size="xl">
      <template #modal-title>
        <font-awesome-icon
          class="glyphicon glyphicon-user mx-2"
          icon="fa-solid fa-eye"
        />
        <strong
          >Ver detalle Ticket N° {{ ticketSelected.data.numberTicket }}</strong
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
            <div class="col-3 border bg-vigente" v-if="calculationSla(ticketSelected.data.dateTimeStart, ticketSelected.data.sla)" >
              <span
                ><strong>Estado/SLA: </strong
                >A TIEMPO</span
              >
            </div>
            <div class="col-3 border bg-vencido" v-else>
              <span
                ><strong>Estado/SLA: </strong
                >VENCIDO</span
              >
            </div>
          </div>
          <div class="row shadow">
            <div class="col-12 border info">
              <span
                ><strong>Comentario/Resolucion: </strong
                >{{ ticketSelected.data.resolution }}</span
              >
            </div>
          </div>
        </div>
        <!-- info tkt end-->
      </div>
      <hr />
      <div>
        <div class="d-grid gap-2">
          <button
            class="btn btn-success"
            type="button"
            @click="$bvModal.hide(`show-${ticketSelected.id}`)"
          >
            Cerrar
          </button>
        </div>
      </div>
    </b-modal>
  </span>
</template>

<script>
import { mapState } from "vuex";
import { mixins } from "../../../mixins/mixins";

export default {
  name: "ModalShow",
  mixins: [mixins],
  props: {
    ticketSelected: Object,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>

<style scoped>
.info:hover {
  background-color: rgb(216, 216, 216);
}
.bg-vigente{
    background-color: rgb(41, 223, 116);
}
.bg-vencido{
    background-color: rgb(236, 74, 25);
}
</style>