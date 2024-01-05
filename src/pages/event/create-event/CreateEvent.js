import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import styles from './createEvent.scss'; 
import SideBar from '../../../components/side-bar/SideBar';
import classNames from 'classnames/bind';
import { useDropzone } from 'react-dropzone';
import { AppColor } from '../../../constants/AppColor';
import { Badge, Button, Input, List, Modal, Radio } from 'antd';
import { DatePicker, Space } from 'antd';
import { createEvent } from '../../../redux/sagas/event.saga';
import { getAllRoom } from '../../../redux/sagas/room.saga';
import { storage } from '../../../firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
const cx = classNames.bind(styles);
const { RangePicker } = DatePicker;

const CreateEvent = () => {

  const [backgroundImage, setBackgroundImage] = useState('');
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [closeTime, setCloseTime] = useState();
  const [location, setLocation] = useState('');
  const [roomsData, setRoomsData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);
  useEffect(() => {
    getAllRoom()
      .then(rooms => setRoomsData(rooms));
  }, []);

  const [message, setMessage] = useState('');

  const handleCreate = () => {

    // const formData = new FormData();
    // formData.append('imageUrl', imageUrl);
    // formData.append('name', eventName);
    // formData.append('description', description);
    // formData.append('startTime', startTime);
    // formData.append('closeTime', closeTime);
    // formData.append('location', location);
    // formData.append('roomIds', selectedRoom._id);

    const newEvent = {
      name: eventName,
      description: description,
      imageUrl: imageUrl,
      startTime: startTime,
      closeTime: closeTime,
      location: location,
      roomIds: selectedRoom._id,
    }

    createEvent(newEvent)
      .then(message => setMessage(message));

    //console.log(newEvent);
  }

  const handleUpload = () => {
    const file = image;
    const storageRef = ref(storage, `images/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
    (snapshot) => {
      const progress =
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgresspercent(progress);
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageUrl(downloadURL);
      });
    }
  );
  }

  const showModal = () => {
    console.log(roomsData.data);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (e) => {
    setSelectedRoom(e.target.value);
  };

  return (
    <div className={cx('container-create-event')}>
      <div 
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          height: 300,
          width: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center', 
          position: 'relative', 
        }}
      >
        <label>
          <input
            type='file' 
            onChange={(e) => {
              setImage(e.target.files[0]);
              setBackgroundImage(URL.createObjectURL(e.target.files[0]));
              //console.log(backgroundImage);
            }}
            style={{
              backgroundColor: AppColor.themeColor,
              height: 30,
              width: 'auto',
              borderRadius: 5,
              color: 'white'
            }} 
          />
        </label>
      </div>

      {(message != '') && <p>{message}</p>}

      <div className={cx('input-section')}>

        <div className={cx('input-field')}>
          <Badge>Tên sự kiện: </Badge>
          <Input style={{width: 1100}} value={eventName} onChange={(e) => setEventName(e.target.value)}/>
        </div>

        <div className={cx('input-field')}>
          <Badge>Địa điểm: </Badge>
          <Input style={{width: 1100}} value={location} onChange={(e) => setLocation(e.target.value)}/>
        </div>

        <div className={cx('input-field')}>
          <Badge>Mô tả: </Badge>
          <Input style={{width: 1100, height: 100}}  value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>

        <div className={cx('input-field')}>
          <Badge>Thời gian:</Badge>
          <RangePicker 
            style={{}} 
            showTime 
            onChange={(dates) => {
              setStartTime(dates[0].$d);
              setCloseTime(dates[1].$d);
            }}
          />
        </div>

        {/* <div className={cx('input-field')}>
          <Badge>Địa điểm: </Badge>
          <Input style={{width: 1100}}  value={location} onChange={(e) => setLocation(e.target.value)}/>
        </div> */}
      </div>

      <div>
        <Badge>Phòng: {selectedRoom.name}</Badge> 
      </div>

      <Button 
        style={{
        width: 110,
          backgroundColor: '#0390fc',
          marginRight: 10,
          color: '#ffffff',
          borderWidth: 0,
          marginBottom: 20,
          marginTop: 10,
        }}
        onClick={showModal}
      >
        Chọn phòng
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

      <Button 
        style={{
        width: 100,
          backgroundColor: AppColor.themeColor,
          marginRight: 10,
          color: '#ffffff',
          borderWidth: 0,
        }}
        onClick={handleUpload}
      >
        Upload
      </Button>

      <Modal 
        title="Chọn phòng" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        //width={1050}
        okText={'Chọn'}
      >
        <Radio.Group onChange={onChange} value={selectedRoom}>
          <Space direction="vertical">
            {roomsData && roomsData.map((item, index) => (
              <Radio key={item._id} value={item}>{item.name}</Radio>
            ))}
          </Space>
        </Radio.Group>
      </Modal>

    </div>
  );
};

export default CreateEvent;
