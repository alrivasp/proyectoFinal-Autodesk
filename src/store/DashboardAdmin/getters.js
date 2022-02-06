import moment from "moment";
import { mixins } from "../../mixins/mixins";

export default {
    getResultsJoined({ tickets }) {
        let resume = [] //{ date:'', count: 0 }
        let filteredStatus = tickets.filter(t => t.data.ticketStatus === 'Ingresado');
        filteredStatus.sort((a, b) => a.data.dateTimeStart > b.data.dateTimeStart);

        for (const key in filteredStatus) {
            if (resume.length < 1) {
                resume.push({ date: filteredStatus[key].data.dateTimeStart, count: 1 })
            } else {
                if (resume.find(entry => entry['date'] === filteredStatus[key].data.dateTimeStart)) {
                    // Ya esta en resumen
                    for (const item in resume) {
                        if (resume[item]['date'] == filteredStatus[key].data.dateTimeStart) {
                            let countTkt = resume[item]['count'];
                            resume[item]['count'] = countTkt + 1;
                        }
                    }
                } else {
                    //No esta en resumen y se debe agregar
                    resume.push({ date: filteredStatus[key].data.dateTimeStart, count: 1 })
                }
            }
        }

        let result = { labels: [], value: [], count: 0 };

        for (const key in resume) {
            result['labels'].push(resume[key]['date'])
            result['value'].push(resume[key]['count'])
        }

        result['count'] = filteredStatus.length
        
        return result
    },
    getResultsPaused: ({ tickets }) => {
        let resume = [] //{ date:'', count: 0 }
        let filteredStatus = tickets.filter(t => t.data.ticketStatus === 'Pausado');
        filteredStatus.sort((a, b) => a.data.dateTimeStart > b.data.dateTimeStart);

        for (const key in filteredStatus) {
            if (resume.length < 1) {
                resume.push({ date: filteredStatus[key].data.dateTimeStart, count: 1 })
            } else {
                if (resume.find(entry => entry['date'] === filteredStatus[key].data.dateTimeStart)) {
                    // Ya esta en resumen
                    for (const item in resume) {
                        if (resume[item]['date'] == filteredStatus[key].data.dateTimeStart) {
                            let countTkt = resume[item]['count'];
                            resume[item]['count'] = countTkt + 1;
                        }
                    }
                } else {
                    //No esta en resumen y se debe agregar
                    resume.push({ date: filteredStatus[key].data.dateTimeStart, count: 1 })
                }
            }
        }

        let result = { labels: [], value: [], count: 0 };

        for (const key in resume) {
            result['labels'].push(resume[key]['date'])
            result['value'].push(resume[key]['count'])
        }

        result['count'] = filteredStatus.length

        return result
    },
    getResultsInProgress({ tickets }) {
        let resume = [] //{ date:'', count: 0 }
        let filteredStatus = tickets.filter(t => t.data.ticketStatus === 'En proceso');
        filteredStatus.sort((a, b) => a.data.dateTimeStart > b.data.dateTimeStart);

        for (const key in filteredStatus) {
            if (resume.length < 1) {
                resume.push({ date: filteredStatus[key].data.dateTimeStart, count: 1 })
            } else {
                if (resume.find(entry => entry['date'] === filteredStatus[key].data.dateTimeStart)) {
                    // Ya esta en resumen
                    for (const item in resume) {
                        if (resume[item]['date'] == filteredStatus[key].data.dateTimeStart) {
                            let countTkt = resume[item]['count'];
                            resume[item]['count'] = countTkt + 1;
                        }
                    }
                } else {
                    //No esta en resumen y se debe agregar
                    resume.push({ date: filteredStatus[key].data.dateTimeStart, count: 1 })
                }
            }
        }

        let result = { labels: [], value: [], count: 0 };

        for (const key in resume) {
            result['labels'].push(resume[key]['date'])
            result['value'].push(resume[key]['count'])
        }

        result['count'] = filteredStatus.length

        return result
    },
    getResultsCanceled: ({ tickets }) => {
        let resume = [] //{ date:'', count: 0 }
        let filteredStatus = tickets.filter(t => t.data.ticketStatus === 'Cancelado');
        filteredStatus.sort((a, b) => a.data.dateTimeStart > b.data.dateTimeStart);

        for (const key in filteredStatus) {
            if (resume.length < 1) {
                resume.push({ date: filteredStatus[key].data.dateTimeStart, count: 1 })
            } else {
                if (resume.find(entry => entry['date'] === filteredStatus[key].data.dateTimeStart)) {
                    // Ya esta en resumen
                    for (const item in resume) {
                        if (resume[item]['date'] == filteredStatus[key].data.dateTimeStart) {
                            let countTkt = resume[item]['count'];
                            resume[item]['count'] = countTkt + 1;
                        }
                    }
                } else {
                    //No esta en resumen y se debe agregar
                    resume.push({ date: filteredStatus[key].data.dateTimeStart, count: 1 })
                }
            }
        }

        let result = { labels: [], value: [], count: 0 };

        for (const key in resume) {
            result['labels'].push(resume[key]['date'])
            result['value'].push(resume[key]['count'])
        }

        result['count'] = filteredStatus.length

        return result
    },
    getResultsClosed: ({ tickets }) => {
        let resume = [] //{ date:'', count: 0 }
        let filteredStatus = tickets.filter(t => t.data.ticketStatus === 'Cerrado');
        filteredStatus.sort((a, b) => a.data.dateTimeStart > b.data.dateTimeStart);

        for (const key in filteredStatus) {
            if (resume.length < 1) {
                resume.push({ date: filteredStatus[key].data.dateTimeStart, count: 1 })
            } else {
                if (resume.find(entry => entry['date'] === filteredStatus[key].data.dateTimeStart)) {
                    // Ya esta en resumen
                    for (const item in resume) {
                        if (resume[item]['date'] == filteredStatus[key].data.dateTimeStart) {
                            let countTkt = resume[item]['count'];
                            resume[item]['count'] = countTkt + 1;
                        }
                    }
                } else {
                    //No esta en resumen y se debe agregar
                    resume.push({ date: filteredStatus[key].data.dateTimeStart, count: 1 })
                }
            }
        }

        let result = { labels: [], value: [], count: 0 };

        for (const key in resume) {
            result['labels'].push(resume[key]['date'])
            result['value'].push(resume[key]['count'])
        }

        result['count'] = filteredStatus.length

        return result
    },
    getHistoryTktUser({ tickets }){
        let result = [['Enero', 0], ['Febrero',0], ['Marzo', 0], ['Abril', 0], ['Mayo', 0], ['Junio', 0], ['Julio', 0], ['Agosto', 0], ['Septiembre', 0], ['Octubre', 0], ['Noviembre', 0], ['Diciembre', 0]];
        tickets.sort((a, b) => a.data.dateTimeStart > b.data.dateTimeStart);

        for (const key in tickets) {
            const month = moment(tickets[key].data.dateTimeStart).month()
            result[month][1] = result[month][1] + 1;
            
        }
        return result
    },
    getTotal({ tickets }){
        return tickets.length
    },
    getBeaten({ tickets }){
        let result = 0;
        for (const key in tickets) {
            if (!mixins.methods.calculationSla(tickets[key].data.dateTimeStart, tickets[key].data.sla, tickets[key].data.dateTimeEnd)){ result += 1 }
        }
        return result
    },
    getInTime({ tickets }){
        let result = 0;
        for (const key in tickets) {
            if (mixins.methods.calculationSla(tickets[key].data.dateTimeStart, tickets[key].data.sla, tickets[key].data.dateTimeEnd)){ result += 1 }
        }
        return result
    },
    getTktSoftware({ tickets }){
        let filteredService = tickets.filter(t => t.data.serviceType === 'Software');
        return filteredService.length
    },
    getTktHardware({ tickets }){
        let filteredService = tickets.filter(t => t.data.serviceType === 'Hardware');
        return filteredService.length
    },
    getTktOther({ tickets }){
        let filteredService = tickets.filter(t => t.data.serviceType === 'Otros');
        return filteredService.length
    }
}