import router from '@/router'


export default {
    SET_USER (state, user){
        state.disconnected = false;
        state.currentUser = user;
        state.notification = { 
            title: 'LOGIN', 
            message: `Hola ${user.name.toUpperCase()} ${user.lastName.toUpperCase()}, bienvenido a nuestra aplicacion Autodesk a iniciado sesion correctamente.-`, 
            type: 'success',
            icon: 'https://smwbtech.github.io/vue-flash-message/success.svg'
        }
        router.push('/panel').catch(() => {});
    },
    SET_OUT_USER(state, user){
        state.currentUser = user;
        state.disconnected = true;
        location.reload();
        //router.push('/').catch(() => {});
    },
    CLEAN_NOTIFICATION(state){
        state.notification = null;
    },
    CLEAN_NOTIFICATION_LOGIN(state){
        state.notificationLogin = '';
    },
    LOGIN_FAILED(state){
        state.notificationLogin = 'Inicio de sesion fallido - usuario o password invalido.-'
    },
    UPDATE_USER(state, data ){
        state.currentUser.id = data.id;
        state.currentUser.name = data.name;
        state.currentUser.lastName = data.lastName;
        state.currentUser.email = data.email;
        state.currentUser.rut = data.rut;
        state.currentUser.role = data.role;
        state.currentUser.position = data.position;
        state.currentUser.phone = data.phone;
        state.currentUser.company = data.company;
        state.currentUser.city = data.city;
        state.currentUser.status = data.status;
    },
    SET_CLIMA(state, data){
        state.clima = data;
    }
}