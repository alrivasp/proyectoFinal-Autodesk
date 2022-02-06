export default {
    getTickets: ({ tickets }, {}, { currentUser }) => {
        let filteredId = tickets.filter(t => t.data.userId == currentUser.id)
        let filteredStatus = filteredId.filter(t => t.data.ticketStatus === 'Ingresado' || t.data.ticketStatus === 'En proceso' || t.data.ticketStatus === 'Pausado' );
        filteredStatus.sort((a, b) => a.data.numberTicket > b.data.numberTicket);
        return filteredStatus;
    },
    getNumberTicket({tickets}){
        let currentNumber = [];
        for (const key in tickets) { currentNumber.push(tickets[key].data.numberTicket)}
        let result = Math.max (...currentNumber)
        return result + 1;
    },
    getTicketsTechnical({ tickets }, {}, { currentUser }){
        let filteredId = tickets.filter(t => t.data.technicalId == currentUser.id);
        let filteredStatus = filteredId.filter(t => t.data.ticketStatus === 'Ingresado' || t.data.ticketStatus === 'En proceso' || t.data.ticketStatus === 'Pausado' );
        filteredStatus.sort((a, b) => a.data.numberTicket > b.data.numberTicket);
        return filteredStatus;
    },
    getTicketsAdmin({ tickets }){
        tickets.sort((a, b) => a.data.numberTicket > b.data.numberTicket);
        return tickets;
    }
}