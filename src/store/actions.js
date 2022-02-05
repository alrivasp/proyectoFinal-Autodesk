import firebase from 'firebase';
import axios from "axios"

export default {
    async login_User({dispatch, commit }, { email, password} ){
        try {
            const userCredential = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
            const { email: emailUser } = userCredential.user;
            dispatch("fetch_User", emailUser);
        } catch (error) {
            const { code } = error;
            console.log(code);
            commit("LOGIN_FAILED");
        }
    },
    fetch_User({commit}, email){
        let user = {
            id: '',
            name: '',
            lastName: '',
            email: '',
            rut: '',
            role: '',
            position: '',
            phone: '',
            company: '',
            city: '',
            password: '',
            status: ''
        };

        firebase.firestore().collection('users').onSnapshot(result => {
            result.forEach((doc) => {
                if(doc.data().email === email){
                   const { id } =  doc;
                   const { name, lastName, email, rut, role, position, phone, company, city, password, status} = doc.data();
                   user.id = id;
                   user.name = name;
                   user.lastName = lastName;
                   user.email = email;
                   user.rut = rut;
                   user.role = role;
                   user.position = position;
                   user.phone = phone;
                   user.company = company;
                   user.city = city;
                   user.password = password;
                   user.status = status;
                }
            })
            commit("SET_USER", user);
        });
    },
    logout_User({ commit }) {
        let user = {
            id: '',
            name: '',
            lastName: '',
            email: '',
            rut: '',
            role: '',
            position: '',
            phone: '',
            company: '',
            city: '',
            password: '',
            status: ''
        }
        try {
            commit("SET_OUT_USER", user);
            firebase.auth().signOut();
         } catch (error) {
             const { code } = error;
             console.log(code);
         }
    },
    update_User({ commit }, { id, data }) {
        try {
            firebase.firestore().collection("users").doc(id).set(data);    
            commit("UPDATE_USER", data);
        } catch (error) {
            const { code } = error;
            console.log(code);
        }
        
    },
    async fetch_Clima({ commit }){
        const { data } = await axios.get('https://api.gael.cloud/general/public/clima');
        commit("SET_CLIMA", data);
    }
}