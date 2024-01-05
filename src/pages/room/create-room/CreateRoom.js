import React, { useEffect, useState, useCallback } from 'react';
import SideBar from '../../../components/side-bar/SideBar';
import styles from './createRoom.scss';
import RoomCard from '../../../components/room-card/RoomCard';
import Seat from '../../../components/seat/Seat';
import axios from 'axios';
import classNames from 'classnames/bind';
import { Badge, Button, Input, Alert } from 'antd';
import { AppColor } from '../../../constants/AppColor';
import { createRoom } from '../../../redux/sagas/room.saga';

const cx = classNames.bind(styles);

const CreateRoom = () => {

  const backend = 'http://localhost:3000/api';
  const currentUser = localStorage.getItem("currentUser");

  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [roomName, setRoomName] = useState('');
  const [output, setOutput] = useState([]);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [roomData, setRoomData] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setRoomData(Array.from({ length: rows }, () => Array.from({ length: columns }, () => true)));
  }, [rows, columns]);

  const handleClick = useCallback((i, j) => {
    setRoomData(prevData => {
      return prevData.map((row, rowIndex) =>
        rowIndex === i
          ? row.map((value, colIndex) => (colIndex === j ? !value : value))
          : row
      );
    });
  }, []);

  const handleSubmit = () => {
    const outputArray = [];
    const headerRow = [<th key="header-0"> </th>];

    for (let j = 0; j < columns; j++) {
      headerRow.push(<th key={`header-${j + 1}`}>{j + 1}</th>);
    }
    outputArray.push(<tr key="header-row">{headerRow}</tr>);

    for (let i = 0; i < rows; i++) {
      const rowElements = [];

      rowElements.push(<th key={`header-${i + 1}`}>{String.fromCharCode(65 + i)}</th>);

      for (let j = 0; j < columns; j++) {
        rowElements.push(
          <td key={`${i}-${j}`}>
            <Seat
              key={`${String.fromCharCode(65 + i)}-${j + 1}`}
              content={`${String.fromCharCode(65 + i)}-${j + 1}`}
              handleClick={() => handleClick(i, j)}
              status={roomData[i][j]}
            />
          </td>
        );
      }
      outputArray.push(<tr key={i + 1}>{rowElements}</tr>);
    }
    setOutput(outputArray);
  };

  const handleReset = () => {
    setRows(0);
    setColumns(0);
    setRoomName('');
    setMessage('');
    setOutput([]);
    setRoomData([]);
  };

  const handleCreate = () => {

    //dem so ghe
    const flatArray = roomData.flat();
    const trueElements = flatArray.filter(element => element === true);

    const newRoom = {
      name: roomName,
      description: description,
      imageUrl: imageUrl,
      seats: roomData,
      seatCount: trueElements.length,
      createAt: new Date(),
    }

    createRoom(newRoom)
      .then(message => setMessage(message));
  }

  return (
      <div className={cx('container-create-room')}>
        <div className={cx('input-form')}>

          <div className={cx('input-section')}>

            <div className={cx('input-field')}>
              <Badge>Tên phòng: </Badge>
              <Input style={{width: 300}} value={roomName} onChange={(e) => setRoomName(e.target.value)} />
            </div>

            <div className={cx('input-field')}>
              <Badge>Số hàng ghế: </Badge>
              <Input style={{width: 300}} type='number' value={rows} onChange={(e) => setRows(e.target.value)} />
            </div>
            
            <div className={cx('input-field')}>
              <Badge>Số ghế mỗi hàng: </Badge>
              <Input style={{width: 300}} type='number' value={columns} onChange={(e) => setColumns(e.target.value)} />
            </div>

          </div>

          <div className={cx('button-field')}>
            <Button 
              style={{
                width: 100,
                backgroundColor: AppColor.themeColor,
                marginRight: 10,
                color: '#ffffff',
                borderWidth: 0,
              }} 
              onClick={handleSubmit}
            >
              Tạo
            </Button>

            <Button 
              style={{
                width: 100,
                backgroundColor: '#de4f45',
                marginRight: 10,
                color: '#ffffff',
                borderWidth: 0,
              }}
              onClick={handleReset}
            >
              Reset
            </Button>

            <Button 
              style={{
                width: 100,
                backgroundColor: AppColor.themeColor,
                marginRight: 10,
                color: '#ffffff',
                borderWidth: 0,
              }}
              onClick={handleCreate}
            >
              Xác nhận
            </Button>
          </div>

          <input type='file'/>

          {(message != '') && <p>{message}</p>}
        </div>
        <div className='outlet-content'>
          {output.length > 0 && <table><tbody>{output}</tbody></table>}
        </div>
      </div>
  );
};

export default CreateRoom;
