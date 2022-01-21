<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-navbar-nav>
        <b-nav-item href="#">Home</b-nav-item>
        
        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="User" left>
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <button @click="prueba">prueba</button>
  </div>
</template>

<script>
export default {
  name: "PanelUser",
  methods: {
    prueba(){
      this.flashMessage.success({
        title: 'Title for success message',
        message: 'Lorem ipsum...',
        icon: 'https://smwbtech.github.io/vue-flash-message/success.svg'
      });
    }
  },
};
</script>

<style scoped>
</style>