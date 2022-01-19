import router from '@/router'


export default {
    SET_USER (state, user){
        state.disconnected = false;
        state.currentUser = user;
        router.push('/panel').catch(() => {});
    },
    SET_OUT_USER(state, user){
        state.currentUser = user;
        state.disconnected = true;
        router.push('/').catch(() => {});
    }
}