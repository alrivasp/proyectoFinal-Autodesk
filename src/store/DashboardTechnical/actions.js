import firebase from 'firebase';

export default {
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
};