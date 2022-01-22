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
        router.push('/').catch(() => {});
    },
    CLEAN_NOTIFICATION(state){
        state.notification = null;
    },
    CLEAN_NOTIFICATION_LOGIN(state){
        state.notificationLogin = '';
    },
    LOGIN_FAILED(state){
        state.notificationLogin = 'Inicio de sesion fallido - usuario o password invalido.-'
    }
}