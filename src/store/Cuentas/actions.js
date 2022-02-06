import firebase from 'firebase';

export default {
    fetch_Users({ commit }){
        firebase
            .firestore()
            .collection("users")
            .onSnapshot((snapshot) => {
                const users = [];
                snapshot.forEach((doc) => {
                    users.push({ id: doc.id, data: doc.data() });
                });
                commit("SET_USERS", users);
            });
    },
    fetch_Technical({ commit }){
        firebase
            .firestore()
            .collection("users")
            .onSnapshot((snapshot) => {
                const technicals = [];
                snapshot.forEach((doc) => {
                    if(doc.data().role === "technical"){
                        technicals.push({ id: doc.id, data: doc.data() });
                    }
                });
                commit("SET_TECHNICAL", technicals);
            });
    },
    update_User({ commit }, { id, data }) {
        try {
            firebase.firestore().collection("users").doc(id).set(data);    
        } catch (error) {
            const { code } = error;
            console.log(code);
        }
    },
}