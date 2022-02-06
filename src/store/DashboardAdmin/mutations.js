export default {
    SET_LOADING(state, op){
        this.loading = op;
    },
    SET_TICKETS(state, tickets){
        state.tickets = tickets;
    },
};