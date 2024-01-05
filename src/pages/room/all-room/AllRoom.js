import React, { useEffect, useMemo, useState } from 'react'
import SideBar from '../../../components/side-bar/SideBar'
import { Outlet } from 'react-router-dom'
import styles from './allRoom.scss'; 
import RoomCard from '../../../components/room-card/RoomCard';
import classNames from 'classnames/bind';
import { Badge, Button, Table, notification } from 'antd';
import { AppColor } from '../../../constants/AppColor';
import { useSelector } from 'react-redux';
import { deleteRoom, getAllRoom } from '../../../redux/sagas/room.saga';
import axios from 'axios';

const cx = classNames.bind(styles);
const backend = 'http://localhost:3000/api';
const Context = React.createContext({
  name: 'Default',
});

const AllRoom = () => {

  //thong bao
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message, notiType) => {
    api[notiType]({
      message: `Notification`,
      description: <p>{message}</p>,
      placement,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: 'Ant Design',
    }),
    [],
  );

  const columns = [
    {
      title: 'Tên phòng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Tổng số ghế',
      dataIndex: 'seatCount',
      key: 'seatCount',
    },
    {
      title: 'Ngày tạo',
      key: 'createAt',
      dataIndex: 'createAt',
    },
    {
      title: 'Tùy chọn',
      key: 'option',
      dataIndex: 'option',
      render: (text, record) => {
        return (
          <div>
            <Button
            size='small'
              style={{
                borderColor: AppColor.errorColor,
                backgroundColor: AppColor.errorColor,
                color: '#ffffff',
                marginRight: 10,
                width: 80
              }}
              onClick={() => handleDelete(record)}
            >
              Xóa
            </Button>
            
            <Button
            size='small'
              style={{
                borderColor: AppColor.themeColor,
                backgroundColor: AppColor.themeColor,
                color: '#ffffff',
                width: 80,
              }}onClick={() => handleUpdate(record)}
            >
              Chỉnh sửa
            </Button>
          </div>
        )
      }
  
    },
  ];

  const currentUser = useSelector((state) => state.auth.currentUser);
  const [roomCount, setRoomCount] = useState(0);
  const [roomsData, setRoomsData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});

  useEffect(() => {
    getAllRoom()
      .then(rooms => setRoomsData(rooms));
  }, []);

  const handleUpdate = () => {
  }

  const handleDelete = (room) => {
    deleteRoom(room._id)
      .then(response => {
        const notiType = (response.status == 200)? 'success': 'error';
        openNotification('topRight', response.data.message, notiType);
        getAllRoom()
          .then(rooms => setRoomsData(rooms));
      });
  }

  return (
    <Context.Provider value={contextValue}>
    {contextHolder}
      <div className={cx('container-all-room')}>
        <div className={cx('all-room-info')}>
          <p style={{fontSize: 20, fontWeight: 'bold'}}>Tổng số phòng: {roomsData.length}</p>
        </div>

        <div className={cx('all-room-table')}>
          <Table style={{width: '100%'}} columns={columns} dataSource={roomsData} />
        </div>
      </div>
    </Context.Provider>
  )
}

export default AllRoom
