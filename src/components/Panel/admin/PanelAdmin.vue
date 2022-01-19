<template>
  <div>
    <nav class="bg-navbar navbar shadow navbar__color" height="500vw">
      <div class="mb-2">
        <p>PANEL Administrador</p>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "PanelAdmin",
};
</script>

<style scoped>
.navbar__color {
  color: white;
}
.bg-navbar {
  background: linear-gradient(270deg, #7075d0, #2147e9, #798ee9);
  background-size: 600% 600%;

  -webkit-animation: AnimationName 21s ease infinite;
  -moz-animation: AnimationName 21s ease infinite;
  animation: AnimationName 21s ease infinite;
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>