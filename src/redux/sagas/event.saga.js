import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { useSelector } from 'react-redux';

const backend = 'http://localhost:3000/api';

const getAllEvent = async () => {
    try {
      const response = await axios.post(backend + "/all-event", 
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      }
      );

      if (response.status === 200) {
        const events = response.data.events;
        return events;
      } else {
        
      }
    } catch (error) {
      console.error("Error during get:", error);
    }
};

const createEvent = async (eventData) => {
  try {
    const response = await axios.post(backend + "/create-event", {
      name: eventData.name,
      description: eventData.description,
      imageUrl: eventData.imageUrl,
      tags: [],
      ticketOpeningTime: new Date(),
      ticketClosingTime: new Date(),
      startTime: eventData.startTime,
      closeTime: eventData.closeTime,
      location: eventData.location,
      tickets: [],
      roomIds: eventData.roomIds,
    },
    {
      headers: {
        Authorization: localStorage.getItem('token'),
        "Content-Type": "multipart/form-data",
      }
    });
    console.log(response.data);
    const message = response.data.message;
    return message;
  } catch (error) {
    console.error('Error creating event:', error);
    const message = error.response.data.message;
    return message;
  }
};

const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axios.put(backend + "/update-event", {
      eventId: eventId,
      updatedEvent: eventData,
    },
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    });

    console.log(response.status);
    const status = response.status;
    return response;
  } catch (error) {
    console.error('Error updating event:', error);
    const status = error.response.status;
    return error.response;
  }
};

const deleteEvent = async (eventId) => {
  try {
    const response = await axios.post(backend + "/delete-event", 
    {
      eventId: eventId,
    },
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    });

    console.log(response.data);
    const status = response.status;
    return response;
  } catch (error) {
    console.error('Error deleting event:', error.response);
    return error.response;
  }
};

export {getAllEvent, createEvent, updateEvent, deleteEvent};
  
