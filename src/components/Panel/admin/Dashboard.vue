<template>
  <div class="p-4">
    <div class="row">
      <div class="col">
        <CardJoined />
      </div>
      <div class="col">
        <CardInProgress />
      </div>
      <div class="col">
        <CardPaused />
      </div>
      <div class="col">
        <CardCanceled />
      </div>
      <div class="col">
        <CardClosed />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card text-left">
          <div class="card-body">
            <h3 class="card-title title"><strong>Historico de TKT</strong></h3>
            <line-chart
              :data="chartData"
              :colors="['#b00', '#666']"
              :discrete="true"
              xtitle="2022"
              ytitle="Tiket"
              :legend="true"
            ></line-chart>
          </div>
        </div>
      </div>
      <div class="row mt-1 mx-auto">
        <div class="col-2 main">
          <div class="card text-left main cardEfect">
            <div class="text-center">
              <h1 class="card-title title total shadow"><strong>{{ totalTegister }}</strong></h1>
              <hr />
              <h4 class="card-title title">
                <strong>Total Registrados</strong>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-2 main">
          <div class="card text-left main cardEfect">
            <div class="text-center">
              <h1 class="card-title total title-vencidos shadow">
                <strong>{{getBeaten}}</strong>
              </h1>
              <hr />
              <h4 class="card-title title-vencidos">
                <strong>Total Vencidos</strong>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-2 main">
          <div class="card sizeCard main cardEfect">
            <div class="text-center">
              <h1 class="card-title total title-atiempo shadow">
                <strong>{{totalInTime}}</strong>
              </h1>
              <hr />
              <h4 class="card-title title-atiempo">
                <strong>Total A tiempo</strong>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-2 main">
          <div class="card sizeCard main cardEfect">
            <div class="text-center">
              <h1 class="card-title total title shadow">
                <strong>{{totalTktSoftware}}</strong>
              </h1>
              <hr />
              <h4 class="card-title title title-atiempo">
                <strong>Casos de Software</strong>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-2 main">
          <div class="card sizeCard main cardEfect">
            <div class="text-center">
              <h1 class="card-title total title shadow">
                <strong>{{totalTktHardware}}</strong>
              </h1>
              <hr />
              <h4 class="card-title title title-atiempo">
                <strong>Casos de Hardware</strong>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-2 main">
          <div class="card sizeCard main cardEfect">
            <div class="text-center">
              <h1 class="card-title total title shadow">
                <strong>{{totalTktOther}}</strong>
              </h1>
              <hr />
              <h4 class="card-title title title-atiempo">
                <strong>Otros casos</strong>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardJoined from "./CardDashboard/CardJoined.vue";
import CardInProgress from "./CardDashboard/CardInProgress.vue";
import CardPaused from "./CardDashboard/CardPaused.vue";
import CardCanceled from "./CardDashboard/CardCanceled.vue";
import CardClosed from "./CardDashboard/CardClosed.vue";
import { mixins } from "../../../mixins/mixins";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Dashboard",
  mixins: [mixins],
  components: {
    CardPaused,
    CardCanceled,
    CardClosed,
    CardJoined,
    CardInProgress,
  },
  
  methods: {
    ...mapActions("DashboardAdmin", ["fetch_Tickets"]),
  },
  computed: {
    ...mapState("DashboardAdmin", ["tickets"]),
    ...mapGetters("DashboardAdmin", ["getHistoryTktUser", "getTotal", "getBeaten", "getInTime", "getTktSoftware", "getTktHardware", "getTktOther"]),
    chartData(){
      return this.getHistoryTktUser
    },
    totalTegister(){
      return this.getTotal
    },
    totalBeaten(){
      return this.getBeaten
    },
    totalInTime(){
      return this.getInTime
    },
    totalTktSoftware(){
      return this.getTktSoftware
    },
    totalTktHardware(){
      return this.getTktHardware
    },
    totalTktOther(){
      return this.getTktOther
    }
  },
  mounted() {
    this.fetch_Tickets();
  },
};
</script>

<style scoped>
.main:hover .cardEfect {
  transform: scale(1.1);
}
.main {
  transition: 1s;
}
.title-atiempo {
  color: green;
}
.title-vencidos {
  color: red;
}
.total {
  font-size: 5vw;
}
.title {
  color: #666666;
}
</style>