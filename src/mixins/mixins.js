import firebase from 'firebase';
import router from '@/router'
import Store from '@/store'
import moment from 'moment';

export const mixins = {
    methods: {
        logout() {
            try {
                firebase.auth().signOut();
                Store.state.disconnected = true;
                router.push('/').catch(() => { });
                alert('Desloageado con exito')
            } catch (error) {
                const { code } = error;
                console.log(code);
            }
        },
        capitalize(word) {
            return word[0].toUpperCase() + word.slice(1);
        },
        dateToday(){
            let format = 'dd/mm/yyyy'
            const today = new Date();
            const map = {
                dd: today.getDate(),
                mm: today.getMonth() + 1,
                yyyy: today.getFullYear()
            }
        
            return format.replace(/yyyy|mm|dd/gi, matched => map[matched])
        },
        fetchSla(type){
            if(type === "Software"){return 1}
            if(type === "Hardware"){return 3}
            if(type === "Otros"){return 5}
        },
        calculationSla(dateStart, sla){
            //FORMATO PARA MOMENT 2021-01-30
            //moment(dateStart).format('DD-MM-YYYY')
            const params = dateStart.split('-');
            const dateIn = new Date(params[0], params[1] - 1, params[2])
            const now = moment().format('YYYY-MM-DD');
            const nowParts = now.split('-');
            const start = sla == 1 ? moment(dateIn).add(sla,'day').format('YYYY-MM-DD') : moment(dateIn).add(sla,'days').format('YYYY-MM-DD')
            const startParts = start.split('-');
            const nowDate = new Date(nowParts[0], nowParts[1] - 1, nowParts[2]);
            const startDate = new Date(startParts[0], startParts[1] - 1, startParts[2]);
            let result = startDate >= nowDate
            // si es true es vigente si es false es vencido
            return result
        },
        formatDate(date){
            return moment(date).format('DD-MM-YYYY')
        }        
    }
}

// importar en componente
// import { mixins } from '@/mixins'
// import { mixins } from "../mixins/mixins";
// mixins: [globalMixins]
//   mixins: [mixins],