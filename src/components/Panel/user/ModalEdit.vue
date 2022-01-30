<template>
  <span>
    <b-button
      class="btn btn-warning btn-sm mx-1"
      id="show-btn"
      @click="$bvModal.show(`edit-${ticketSelected.id}`)"
    >
      Editar
    </b-button>

    <b-modal :id="`edit-${ticketSelected.id}`" hide-footer size="xl">
      <template #modal-title>
        <font-awesome-icon
          class="glyphicon glyphicon-user mx-2"
          icon="fa-solid fa-edit"
        />
        <strong>Editar Ticket</strong>
      </template>
      <div class="d-block text-center">
        <!-- Datos de incidencia start-->
        <v-container class="border">
          <strong><label class="titleForm">Datos de Incidencia</label></strong>
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
      </div>
      <div>
        <b-button
          class="mt-3 mx-3 btn-sm"
          block
          @click="$bvModal.hide(`edit-${ticketSelected.id}`)"
          >Descartar</b-button
        >
        <b-button
          class="mt-3 btn-success btn-sm"
          block
          @click="editTicket"
          :disabled="ValidateSave == false"
          >Confirmar</b-button
        >
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
    return {
      datailTicket: "",
      typeServiceSelected: "",
      typeSupportSelected: "",
      softwareSelected: "",
      hardwareSelected: "",
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
  methods: {
    ...mapActions("Ticketera", ["update_Ticket"]),
    editTicket() {
      this.ticketSelected.data.detail = this.datailTicket;
      this.ticketSelected.data.supportType = this.typeSupportSelected;
      this.ticketSelected.data.serviceType = this.typeServiceSelected;
      this.ticketSelected.data.software = this.softwareSelected;
      this.ticketSelected.data.hardware = this.hardwareSelected;

      this.ticketSelected['verb'] = 'edito';
      
      this.update_Ticket(this.ticketSelected);
      this.$bvModal.hide(`edit-${this.ticketSelected.id}`);
      this.$forceUpdate();
    },
  },
  mounted() {
    const { detail } = this.ticketSelected.data;
    const { supportType } = this.ticketSelected.data;
    const { serviceType } = this.ticketSelected.data;
    const { software } = this.ticketSelected.data;
    const { hardware } = this.ticketSelected.data;

    this.datailTicket = detail;
    this.typeServiceSelected = serviceType;
    this.typeSupportSelected = supportType;
    this.softwareSelected = software;
    this.hardwareSelected = hardware;
  },
  computed: {
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
  },
};
</script>