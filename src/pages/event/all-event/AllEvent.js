import React, { useEffect, useState, useMemo } from 'react'
import SideBar from '../../../components/side-bar/SideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './allEvent.scss'; 
import classNames from 'classnames/bind';
import { Badge, Button, Table, Modal, ConfigProvider, Input, DatePicker, notification } from 'antd';
import { AppColor } from '../../../constants/AppColor';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, getAllEvent, updateEvent } from '../../../redux/sagas/event.saga';
import axios from 'axios';
import { setCurrentEvent } from '../../../redux/actions/event.action';

const cx = classNames.bind(styles);
const backend = 'http://localhost:3000/api';
const { RangePicker } = DatePicker;
const Context = React.createContext({
  name: 'Default',
});

const AllEvent = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const [eventCount, setEventCount] = useState(0);
  const [eventsData, setEventsData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [closeTime, setCloseTime] = useState();
  const [location, setLocation] = useState('');

  //thong bao
  //const [notiType, setNotiType] = useState('info');
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
      title: 'Tên sự kiện',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'Ngày kết thúc',
      key: 'closeTime',
      dataIndex: 'closeTime',
    },
    {
      title: 'Phòng',
      key: 'roomIds',
      dataIndex: 'roomIds',
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
                marginBottom: 5,
                width: 80
              }}
              onClick={() => {handleDelete(record)}}
            >
              Xóa
            </Button>
            
            <Button
              size='small'
              style={{
                borderColor: AppColor.themeColor,
                backgroundColor: AppColor.themeColor,
                color: '#ffffff',
                marginBottom: 5,
                width: 80,
              }}
              onClick={() => showEditModal(record)}
            >
              Chỉnh sửa
            </Button>
  
            <Button
            size='small'
              style={{
                borderColor: '#3694ff',
                backgroundColor: '#3694ff',
                color: '#ffffff',
                width: 100,
                marginBottom: 5,
              }}
              onClick={() => {
                dispatch(setCurrentEvent(record));
                navigate('/ticket-issuance');
              }}
            >
              Phát hành vé
            </Button>

            <Button
            size='small'
              style={{
                borderColor: '#3694ff',
                backgroundColor: '#3694ff',
                color: '#ffffff',
                width: 100,
                marginBottom: 5,
              }}
              onClick={() => {
                dispatch(setCurrentEvent(record));
                navigate('/check-ticket');
              }}
            >
              Kiểm tra vé
            </Button>
          </div>
        )
      }
  
    },
  ];

  useEffect(() => {
    getAllEvent()
      .then(events => {
        setEventsData(events);
        console.log(events);
      });
  }, []);

  const showEditModal = (event) => {
    setSelectedEvent(event);
    setEventName(event.name);
    setDescription(event.description);
    setLocation(event.location);
    setImageUrl(event.imageUrl);
    setStartTime(event.startTime);
    setCloseTime(event.closeTime);
    setIsEditModalOpen(true);
    console.log(selectedEvent._id);
  };

  const handleEditOk = () => {
    handleUpdate();
    setIsEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdate = () => {

    const updatedEvent = {
      name: eventName,
      description: description,
      imageUrl: imageUrl,
      startTime: startTime,
      closeTime: closeTime,
      location: location,
    }

    updateEvent(selectedEvent._id, updatedEvent)
      .then(response => {
        // if(response.status == 200) setNotiType('success');
        // if(response.status != 200) setNotiType('error');
        const notiType = (response.status == 200)? 'success': 'error';
        openNotification('topRight', response.data.message, notiType);
      });

    getAllEvent()
      .then(events => setEventsData(events));
  }

  const handleDelete = (event) => {
    setSelectedEvent(event);
    deleteEvent(selectedEvent._id)
      .then(response => {
        const notiType = (response.status == 200)? 'success': 'error';
        openNotification('topRight', response.data.message, notiType);
        getAllEvent()
        .then(events => setEventsData(events));
      });
  }

  return (
    <Context.Provider value={contextValue}>
    {contextHolder}
    <div className={cx('container-all-event')}>
      <div className={cx('all-event-info')}>
        <p style={{fontSize: 20, fontWeight: 'bold'}}>Tổng số sự kiện: {eventsData.length}</p>
      </div>

      <div className={cx('all-event-table')}>
        <Table style={{width: '100%'}} columns={columns} dataSource={eventsData} />
      </div>

      <ConfigProvider
        // modal={{
        //   style: {
        //     width: 1000,
        //     backgroundColor: 'pink'
        //   }
        // }}
      >
        <Modal 
          title="Chỉnh sửa sự kiện" 
          open={isEditModalOpen} 
          onOk={handleEditOk} 
          onCancel={handleEditCancel}
          width={1050}
          okText={'Edit'}
        >

          <div style={{
            flexDirection: 'column'
          }}>

            <Badge>Tên sự kiện: </Badge>
            <Input 
              style={{width: 1000, marginBottom: 20,}}
              value={eventName} onChange={(e) => setEventName(e.target.value)}
            />

            <Badge>Địa điểm: </Badge>
            <Input 
              style={{width: 1000, marginBottom: 20,}}
              value={location} onChange={(e) => setLocation(e.target.value)}
            />

            <Badge>Mô tả: </Badge>
            <Input 
              style={{width: 1000, height: 100, marginBottom: 20,}}
              value={description} onChange={(e) => setDescription(e.target.value)}
            />

            <Badge>Thời gian: </Badge>
            <RangePicker 
              style={{width: 1000, marginBottom: 20,}} 
              showTime 
              onChange={(dates) => {
                setStartTime(dates[0].$d);
                setCloseTime(dates[1].$d);
              }}
            />

          </div>
        </Modal>
      </ConfigProvider>
      
    </div>
    </Context.Provider>
  )
}

export default AllEvent
