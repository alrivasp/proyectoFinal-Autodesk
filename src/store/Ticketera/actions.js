import firebase from 'firebase';

export default {
    add_Ticket({ commit }, ticket) {
        firebase.firestore().collection("tickets").add(ticket);
        const notificaction = {
            title: 'TICKETERA',
            message: `Se creo Ticket correctamente`,
            type: 'success',
            icon: 'https://smwbtech.github.io/vue-flash-message/success.svg'
        }
        commit("ADD_TICKET", notificaction);
    },
    fetch_Tickets({ commit }) {
        commit("SET_LOADING", true);
        firebase
            .firestore()
            .collection("tickets")
            .orderBy("dateTimeStart", "asc")
            .onSnapshot((snapshot) => {
                const tickets = [];
                snapshot.forEach((doc) => {
                    tickets.push({ id: doc.id, data: doc.data() });
                });
                commit("SET_LOADING", false);
                commit("SET_TICKETS", tickets);
            });
    },
    update_Ticket({ commit }, { id, data, verb }) {
        firebase.firestore().collection("tickets").doc(id).set(data);
        const notificaction = {
            title: 'TICKETERA',
            message: `Se ${verb} Ticket N° ${data.numberTicket} correctamente`,
            type: 'success',
            icon: 'https://smwbtech.github.io/vue-flash-message/success.svg'
        }
        commit("ADD_TICKET", notificaction);
    }
};