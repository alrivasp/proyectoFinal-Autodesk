<template>
  <div>
    <!-- panel cliente -->
    <PanelUser v-if="currentUser.role === 'user'" :user="getCurrentUser" />
    <!-- panel tecnico -->
    <PanelTechnical v-if="currentUser.role === 'technical'" :user="getCurrentUser" />
    <!-- panel admnisitrador -->
    <PanelAdmin v-if="currentUser.role === 'admin'" :user="getCurrentUser" />
  </div>
</template>

<script>
import PanelUser from "../components/Panel/user/PanelUser.vue";
import PanelAdmin from "../components/Panel/admin/PanelAdmin.vue";
import PanelTechnical from "../components/Panel/technical/PanelTechnical.vue";
import { mixins } from "../mixins/mixins";

import { mapState, mapMutations } from "vuex";

export default {
  name: "Panel",
  mixins: [mixins],
  components: {
    PanelUser,
    PanelTechnical,
    PanelAdmin,
  },
  methods: {
    ...mapMutations(["CLEAN_NOTIFICATION"]),
  },
  computed: {
    ...mapState(["currentUser", "notification"]),
    getCurrentUser(){
      return `${this.capitalize(this.currentUser.name)} ${this.capitalize(this.currentUser.lastName)}`; 
    }
  },
  mounted() {
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
</style>