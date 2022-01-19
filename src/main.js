import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Firebase from 'firebase';
import { firebaseConfig } from './config/firebaseConfig';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import FlashMessage from '@smartweb/vue-flash-message';


const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}
library.add(fas, fab)
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false
Firebase.initializeApp(firebaseConfig);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Snotify, options)
Vue.use(FlashMessage)

new Vue({
  router,
  store,
  vuetify,
  Firebase,
  render: h => h(App)
}).$mount('#app')
