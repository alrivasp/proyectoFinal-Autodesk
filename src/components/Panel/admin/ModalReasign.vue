<template>
  <span>
    <b-button
      id="show-btn"
      class="btn btn-warning btn-sm mx-1"
      @click="$bvModal.show(`asign-${ticketSelected.id}`)"
      >Re-asignar</b-button
    >

    <b-modal :id="`asign-${ticketSelected.id}`" hide-footer>
      <template #modal-title>
        <font-awesome-icon
          class="glyphicon glyphicon-user mx-2"
          icon="fa-solid fa-people-arrows"
        />
        <strong
          >Cambiar responsable | Ticket N°
          {{ ticketSelected.data.numberTicket }}</strong
        >
      </template>
      <div class="d-block text-center">
        <v-select
          v-model="technicalIdNew"
          :items="items"
          label="Tecnicos disponibles"
        ></v-select>
      </div>
      <hr />
      <b-button
        class="btn btn-sm"
        block
        @click="$bvModal.hide(`asign-${ticketSelected.id}`)"
        >Cancelar</b-button
      >
      <b-button
        :disabled="validateAsign"
        class="btn btn-success btn-sm mx-2"
        block
        @click="updateResponsible"
        >Aceptar</b-button
      >
    </b-modal>
  </span>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ModalReasign",
  props: {
    ticketSelected: Object,
    technicals: Array,
  },
  data() {
    return {
      tkt: [],
      items: [],
      technicalId: "",
      technicalIdNew: "",
    };
  },
  computed: {
    validateAsign() {
      if (this.technicalIdNew != this.technicalId) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    ...mapActions(["update_Tkt"]),
    chargeTechnicals() {
      let result = [];
      for (const key in this.technicals) {
        result.push({
          value: this.technicals[key].id,
          text: `${this.technicals[key].data.name} ${this.technicals[key].data.lastName}`,
        });
      }
      return result;
    },
    updateResponsible() {
      this.tkt.data.technicalId = this.technicalIdNew;
      const formData = { id: this.ticketSelected.id, data: this.tkt.data };
      this.update_Tkt(formData);
      this.flashMessage.success({
        title: "Cambio de responsable",
        message: `Tkt N°${this.tkt.data.numberTicket} cambio su responsable.`,
        icon: "https://smwbtech.github.io/vue-flash-message/success.svg",
      });
      this.$bvModal.hide(`asign-${this.ticketSelected.id}`);
    },
  },
  mounted() {
    let temp = { ...this.ticketSelected };
    this.tkt = { ...temp };
    let { technicalId: id } = this.ticketSelected.data;
    this.technicalId = id;
    this.technicalIdNew = id;
    this.items = this.chargeTechnicals();
  },
};
</script>

<style scoped>
</style>