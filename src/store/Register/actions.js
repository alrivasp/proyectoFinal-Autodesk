import firebase from 'firebase';

export default {
    async register_User({ dispatch, commit },  user ){
        try {
            const { email, password } = user
            const userRegister = { ...user }
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);

            dispatch('add_User', {...userRegister});
        } catch (error) {
            const { code } = error;
            console.log(code)
        }
    },
    add_User({ commit }, userRegister){
        try {
            firebase.firestore().collection("users").add(userRegister);
            setTimeout(function(){
                firebase.auth().signOut();
            }, 2000);
        } catch (error) {
            const { code } = error;
            console.log(code)
        }
        
    }
}