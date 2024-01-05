import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { useSelector } from 'react-redux';

const backend = 'http://localhost:3000/api';

const getTicketDetail = async (eventId, ticketId) => {
    try {
      const response = await axios.post(backend + "/ticket-detail", 
      {
        eventId: eventId,
        ticketId: ticketId,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      }
      );

      if (response.status === 200) {
        const result = {
            ticket: response.data.ticket,
            status: response.status,
        }
        return result;
      } else {
        
      }
    } catch (error) {
      console.error("Error during get ticket detail:", error.response.status);
      const result = {
        //ticket: response.data.ticket,
        status: error.response.status,
        }
      return result;
    }
};

const checkinTicket = async (eventId, ticketId, ownerId) => {
    try {
      const response = await axios.post(backend + "/checkin", 
      {
        eventId: eventId,
        ticketId: ticketId,
        ownerId: ownerId,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      }
      );

      if (response.status === 200) {
        const status =  response.status;
        return status;
      } else {
        
      }
    } catch (error) {
      console.error("Error during get ticket detail:", error.response.status);
      const status =  error.response.status;
      return status;
    }
};

const cancelTicket = async (eventId, ticketId, ownerId) => {
    try {
      const response = await axios.post(backend + "/cancel-ticket", 
      {
        eventId: eventId,
        ticketId: ticketId,
        ownerId: ownerId,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      }
      );

      if (response.status === 200) {
        const status =  response.status;
        return status;
      } else {
        
      }
    } catch (error) {
      console.error("Error during cancel ticket detail:", error.response.status);
      const status =  error.response.status;
      return status;
    }
};

export { getTicketDetail, checkinTicket, cancelTicket }
