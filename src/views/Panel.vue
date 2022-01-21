<template>
  <div>
    <!-- panel cliente -->
    <PanelUser v-if="currentUser.role === 'user'" />
    <!-- panel tecnico -->
    <PanelTechnical v-if="currentUser.role === 'technical'" />
    <!-- panel admnisitrador -->
    <PanelAdmin v-if="currentUser.role === 'admin'" />
  </div>
</template>

<script>
import PanelUser from "../components/Panel/user/PanelUser.vue";
import PanelAdmin from "../components/Panel/admin/PanelAdmin.vue";
import PanelTechnical from "../components/Panel/technical/PanelTechnical.vue";

import { mapState, mapMutations } from "vuex";

export default {
  name: "Panel",
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