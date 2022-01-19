import firebase from 'firebase';
import router from '@/router';

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
            alert('Desloageado con exito')
            
         } catch (error) {
             const { code } = error;
             console.log(code);
         }
    }
}