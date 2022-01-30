// Libraries
import Vue from 'vue'
import Vuex from 'vuex'

// Persisted
import createPersistedState from 'vuex-persistedstate';

// Modules local
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// Modules
import Register from './Register/index'
import Ticketera from './Ticketera/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  plugins: [createPersistedState()],
  mutations,
  actions,
  getters,
  modules: {
    Register,
    Ticketera,
  }
})
