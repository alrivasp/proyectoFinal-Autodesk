<template>
  <span>
    <b-button
      class="btn btn-danger btn-sm"
      id="show-btn"
      @click="$bvModal.show(`${ticketSelected.id}`)"
    >
      Cancelar
    </b-button>

    <b-modal :id="ticketSelected.id" hide-footer>
      <template #modal-title>
        <font-awesome-icon
          class="glyphicon glyphicon-user mx-2"
          icon="fa-solid fa-ban"
        />
        <strong>Cancelar Ticket</strong>
      </template>
      <div class="d-block text-center">
        <p>
          Estas seguro de cancelar el Ticket
          <strong>N° {{ ticketSelected.data.numberTicket }}</strong>
        </p>
      </div>
      <hr />
      <div>
        <b-button
          class="btn-sm mx-2"
          block
          @click="$bvModal.hide(`${ticketSelected.id}`)"
          >Descartar</b-button
        >
        <button class="btn btn-success btn-sm" @click="cancelTicket">
          Confirmar
        </button>
      </div>
    </b-modal>
  </span>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ModalDelete",
  props: {
    ticketSelected: Object,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("Ticketera", ["update_Ticket"]),
    cancelTicket() {
      this.ticketSelected.data.ticketStatus = "Cancelado";
      this.ticketSelected['verb'] = 'cancelo';
      this.update_Ticket(this.ticketSelected);
      this.$forceUpdate();
    },
  },
};
</script>