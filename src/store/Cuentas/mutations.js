export default {
    SET_USERS(state, payload){
        state.users = payload
    },
    SET_TECHNICAL(state, technicals){
        state.technicals = technicals
    },
    CLEAN_NOTIFICATION(state){
        state.notification = ""
    },
}