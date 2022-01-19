<template>
  <div>
    <footer class="footer fixed-bottom d-none d-sm-block d-md-block">
      <div class="container my-2">
        <div class="row">
          <div class="col">
            <a
              href="https://www.facebook.com/alvaro.rivas.p/"
              target="_blank"
              class="linkRef mx-3"
            >
              <font-awesome-icon
                class="mx-3"
                :icon="['fab', 'fa-facebook']"
                size="xl"
              />
            </a>
            <a
              href="https://www.instagram.com/alrivasp/"
              target="_blank"
              class="linkRef mx-3"
            >
              <font-awesome-icon
                :icon="['fab', 'fa-instagram-square']"
                size="xl"
                class="mx-3"
              />
            </a>
          </div>
          <div class="col">
            <span> © Desarrollado por </span>
            <strong>Alvaro Rivas 🚀 </strong> — {{ new Date().getFullYear() }}
          </div>
          <div class="col">
            <a
              href="https://www.facebook.com/alvaro.rivas.p/"
              target="_blank"
              class="linkRef mx-3"
            >
              <font-awesome-icon :icon="['fab', 'fa-github']" size="xl" />
            </a>
            <a
              href="https://alrivasp.github.io/"
              target="_blank"
              class="linkRef mx-3"
            >
              <font-awesome-icon
                class="mx-3"
                :icon="['fas', 'fa-user-circle']"
                size="xl"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
.footer {
  background: linear-gradient(270deg, #e93122, #223fe9, #252279, #67b824);
  background-size: 800% 800%;
  color: white;
  -webkit-animation: AnimationName 20s ease infinite;
  -moz-animation: AnimationName 20s ease infinite;
  animation: AnimationName 20s ease infinite;
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

.linkRef{
  text-decoration: none;
  color: white;
}
</style>