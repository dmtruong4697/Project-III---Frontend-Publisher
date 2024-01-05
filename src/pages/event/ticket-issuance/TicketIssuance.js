import React, { useEffect, useMemo, useState } from 'react'
import styles from './ticketIssuance.scss'; 
import classNames from 'classnames/bind';
import { useLocation, useParams } from 'react-router-dom';
import { Badge, Button, ConfigProvider, Divider, Input, Modal, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomDetail } from '../../../redux/sagas/room.saga';
import Seat from '../../../components/seat/Seat';
import { AppColor } from '../../../constants/AppColor';
import { updateEvent } from '../../../redux/sagas/event.saga';

const cx = classNames.bind(styles);
const Context = React.createContext({
    name: 'Default',
  });

const TicketIssuance = () => {

    const dispatch = useDispatch();
    const currentEvent = useSelector((state) => state.event.currentEvent);

    const [ticketData, setTicketData] = useState(currentEvent.tickets);
    const [roomData, setRoomData] = useState([]);
    const [roomColorData, setRoomColorData] = useState([]);
    const [output, setOutput] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
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

    // thong tin 1 loai ve:
    const [ticketName, setTicketName] = useState('');
    const [ticketPrice, setTicketPrice] = useState(0);
    const [ticketQuantity, setTicketQuantity] = useState(0);

    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        handleCreateTicketType();
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    useEffect(() => {
        getRoomDetail(currentEvent.roomIds)
          .then(room => {
            setRoomData(room.seats);
          });

        //handleCreateRoom();
      }, []);

    // xu ly tao so do phong:
    const row = roomData.length;
    const column = 10;
    const handleCreateRoom = () => {

        var roomColor = Array.from({ length: row }, function () {
            return Array(column).fill('red');
        });

        setRoomColorData(roomColor);
        
        const outputArray = [];
        const headerRow = [<th key="header-0"> </th>];
    
        for (let j = 0; j < column; j++) {
          headerRow.push(<th key={`header-${j + 1}`}>{j + 1}</th>);
        }
        outputArray.push(<tr key="header-row">{headerRow}</tr>);
    
        for (let i = 0; i < row; i++) {
          const rowElements = [];
    
          rowElements.push(<th key={`header-${i + 1}`}>{String.fromCharCode(65 + i)}</th>);
    
          for (let j = 0; j < column; j++) {
            rowElements.push(
              <td key={`${i}-${j}`}>
                {/* <Seat
                  key={`${String.fromCharCode(65 + i)}-${j + 1}`}
                  content={`${String.fromCharCode(65 + i)}-${j + 1}`}
                  //handleClick={() => handleClick(i, j)}
                  status={roomData[i][j]}
                /> */}
                <button
                    style={{
                        backgroundColor: roomColorData[i][j],
                        height: 25,
                        width: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        fontSize: 8,
                        borderWidth: 0,
                    }}
                >{`${String.fromCharCode(65 + i)}-${j + 1}`}</button>
              </td>
            );
          }
          outputArray.push(<tr key={i + 1}>{rowElements}</tr>);
        }
        setOutput(outputArray);
      };


    const handleCreateTicketType = () => {

        const generateRandomId = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let randomId = '';
            for (let i = 0; i < 6; i++) {
                randomId += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return randomId;
        };

        const newTicketType = {
            name: ticketName,
            price: ticketPrice,
            quantity: ticketQuantity,
            ticketList: Array.from({ length: ticketQuantity }, () => ({
                id: generateRandomId(),
                name: ticketName,
                price: ticketPrice,
                ownerId: "",
                status: "NOT_SOLD",
            })),
        };

        setTicketData(prev => [...prev, newTicketType]);

        setTicketName('');
        setTicketPrice(0);
        setTicketQuantity(0);
    }

    const handleUpdateEvent = () => {

        const updatedEvent = {
            tickets: ticketData,
        }
    
        updateEvent(currentEvent._id, updatedEvent)
          .then(response => {
            // if(response.status == 200) setNotiType('success');
            // if(response.status != 200) setNotiType('error');
            const notiType = (response.status == 200)? 'success': 'error';
            openNotification('topRight', response.data.message, notiType);
          });
      }


  return (
    <Context.Provider value={contextValue}>
    {contextHolder}
    <div className={cx('container-ticket-issuance')}>
        <p
            style={{
                margin: 20,
                fontSize: 30,
                fontWeight: 'bold',
            }}
        >{currentEvent.name}</p>
        <Divider/>

        <div 
            style={{
                //width: '100%',
                //backgroundColor: 'pink',
                alignSelf: 'center',
            }}
        >
            <p>Danh sách các loại vé:</p>

            <div style={{maxHeight: 400, overflow: 'auto', marginBottom: 10,}}>
            {ticketData.map((item) => 
                <div
                    style={{
                        width: 1000,
                        //height: 70,
                        backgroundColor: '#e0e0e0',
                        marginBottom: 20,
                        borderRadius: 5,
                        padding: 5,
                        paddingLeft: 20,
                    }}
                >
                    <p style={{fontSize: 14}}>{item.name}</p>
                    <p style={{fontSize: 14}}>Giá vé: {item.price} đồng</p>
                    <p style={{fontSize: 14}}>Số lượng: {item.quantity}</p>
                </div>
            )}
            </div>

            <Button
                style={{
                    width: 1000,
                    height: 50,
                    fontWeight: 'bold',
                }}
                onClick={() => {
                    showModal();
                    //handleCreateRoom();
                }}
            >
                Thêm loại mới +
            </Button>
        </div>
        <Divider/>

        {/* <div>
            <p>Sơ đồ phòng:</p>
          {output.length > 0 && <table><tbody>{output}</tbody></table>}
        </div> */}

        {/* modal tao loai ve moi */}
        <ConfigProvider>
            <Modal 
                title="Thêm loại vé" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}
                width={550}
                okText={'Create'}
            >
                <Badge>Tên loại vé:</Badge>
                <Input 
                    style={{width: 500, marginBottom: 20,}}
                    value={ticketName} onChange={(e) => setTicketName(e.target.value)}
                />
                <Divider/>

                <Badge>Giá vé:</Badge>
                <Input 
                    style={{width: 500, marginBottom: 20,}}
                    value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)}
                />
                <Divider/>

                <Badge>Số lượng:</Badge>
                <Input 
                    style={{width: 500, marginBottom: 20,}}
                    value={ticketQuantity} onChange={(e) => setTicketQuantity(e.target.value)}
                />
                <Divider/>
            </Modal>

            <Button
            style={{
                width: 1000,
                backgroundColor: AppColor.themeColor,
                color: '#ffffff',
                fontWeight: 'bold',
                alignContent: 'center'
            }}
                onClick={() => {
                    //console.log(ticketData);
                    handleUpdateEvent();
                }}
            >
                Phát hành vé
            </Button>
        </ConfigProvider>
    </div>
    </Context.Provider>
  )
}

export default TicketIssuance
