import firebase from 'firebase';
import router from '@/router'
import Store from '@/store'

export const mixins = {
    methods: {
        saludar: function() {
            alert('hola')
        },
        despedirce: function() {
            alert('adios')
        },
        logout() {
            try {
               firebase.auth().signOut();
               Store.state.disconnected = true;
               router.push('/').catch(() => {});
               alert('Desloageado con exito')
            } catch (error) {
                const { code } = error;
                console.log(code);
            }
        }

    }
}

// importar en componente
// import { mixins } from '@/mixins'
// import { mixins } from "../mixins/mixins";
// mixins: [globalMixins]
//   mixins: [mixins],