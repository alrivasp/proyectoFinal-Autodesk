import firebase from 'firebase';

export default {
    ADD_TICKET(state, notification){
        state.notification = notification
    },
    CLEAN_NOTIFICATION(state){
        state.notification = ""
    },
    SET_LOADING(state, op){
        this.loading = op;
    },
    SET_TICKETS(state, tickets){
        state.tickets = tickets;
    },
    SET_TECHNICAL(state, technicals){
        state.technicals = technicals
    }
}