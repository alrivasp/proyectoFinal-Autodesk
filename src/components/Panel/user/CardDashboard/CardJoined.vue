<template>
  <v-card class="mt-4 mx-auto" max-width="400">
    <v-sheet
      class="v-sheet--offset mx-auto shadow main"
      color="cyan"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="labels"
        :value="value"
        color="white"
        line-width="2"
        padding="16"
        class="kpi rounded-3 shadow main cardEfect"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="text-h6 font-weight-light mb-2">
        Casos en estado <strong>Ingresado</strong>
      </div>
      <div class="indicator">
        <p>
          <strong> N° TKT {{ count }}</strong>
        </p>
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small> mdi-open-in-new </v-icon>
      <span class="text-caption grey--text font-weight-light"
        >Ingresados por ti</span
      >
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CardJoined",
  computed: {
    ...mapGetters("DashboardUser", ["getResultsJoined"]),
    labels() {
      const { labels } = this.getResultsJoined;
      return  labels;
    },
    value(){
      const { value } = this.getResultsJoined;
      return  value;
    },
    count(){
      const { count } = this.getResultsJoined;
      return  count;
    }
  },
};
</script>

<style scoped>
.main:hover .cardEfect {
  transform: scale(1.2);
}
.main {
  transition: 1s;
}
.indicator {
  font-size: 30px;
}
.kpi {
  background:  linear-gradient(0deg, rgba(24,56,29,1) 0%, rgba(81,63,255,0.9500175070028011) 58%);
  color: rgb(230, 221, 221);
}
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>