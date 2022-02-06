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
import DashboardUser from './DashboardUser/index'
import DashboardTechnical from './DashboardTechnical/index'
import DashboardAdmin from './DashboardAdmin/index'
import Cuentas from './Cuentas/index'

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
    DashboardUser,
    DashboardTechnical,
    DashboardAdmin,
    Cuentas
  }
})
