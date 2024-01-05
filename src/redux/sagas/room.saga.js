import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { useSelector } from 'react-redux';

const backend = 'http://localhost:3000/api';

const getAllRoom = async () => {
    try {
      const response = await axios.get(backend + "/all-room", 
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      }
      );

      if (response.status === 200) {
        const rooms = response.data.rooms;
        return rooms;
      } else {
        
      }
    } catch (error) {
      console.error("Error during get:", error);
    }
};

const createRoom = async (roomData) => {
  try {
    const response = await axios.post(backend + "/create-room", {
      name: roomData.name,
      description: roomData.description,
      imageUrl: roomData.imageUrl,
      seats: roomData.seats,
      seatCount: roomData.seatCount,
      createAt: roomData.createAt,
    },
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    });
    console.log(response.data);
    const message = response.data.message;
    return message;
  } catch (error) {
    console.error('Error creating room:', error);
    const message = error.response.data.message;
    return message;
  }
};

const updateRoom = async (roomId, updatedData) => {
  try {
    const response = await axios.put(backend + "/update-room", {
      roomId: roomId,
      updatedData: updatedData,
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
    console.error('Error updating room:', error);
    const status = error.response.status;
    return error.response;
  }
};

const deleteRoom = async (roomId) => {
  try {
    const response = await axios.post(backend + "/delete-room", 
    {
      roomId: roomId,
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
    console.error('Error deleting room:', error.response);
    return error.response;
  }
};

const getRoomDetail = async (roomId) => {
  try {
    const response = await axios.post(backend + "/room-detail", 
    {
      roomId: roomId,
    },
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    });

    //console.log(response.data);
    const room = response.data.room;
    console.log(room);
    return room;
  } catch (error) {
    console.error('Error getting room detail:', error.response);
    return error.response;
  }
};

export {getAllRoom, createRoom, updateRoom, deleteRoom, getRoomDetail};
  
