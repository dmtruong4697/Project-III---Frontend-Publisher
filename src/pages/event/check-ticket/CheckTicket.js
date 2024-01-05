import React, { useEffect, useMemo, useState } from 'react'
import styles from './checkTicket.scss'; 
import classNames from 'classnames/bind';
import { useLocation, useParams } from 'react-router-dom';
import { Badge, Button, ConfigProvider, Divider, Input, Modal, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomDetail } from '../../../redux/sagas/room.saga';
import Seat from '../../../components/seat/Seat';
import { AppColor } from '../../../constants/AppColor';
import { updateEvent } from '../../../redux/sagas/event.saga';
import { cancelTicket, checkinTicket, getTicketDetail } from '../../../redux/sagas/ticket.saga';

const cx = classNames.bind(styles);
const Context = React.createContext({
    name: 'Default',
  });

const CheckTicket = () => {

    const dispatch = useDispatch();
    const currentEvent = useSelector((state) => state.event.currentEvent);
    const [ticketId, setTicketId] = useState('');
    const [result, setResult] = useState({});
    const [message, setMessage] = useState('');

    const handleSearch = () => {
        getTicketDetail(currentEvent._id, ticketId)
            .then((result) => {
                setResult(result);
                //console.log(ticket);
                //console.log('hehehe');
            })

        // console.log('kakakak');
    }

    const handleCheckin = () => {
        checkinTicket(currentEvent._id, ticketId, result.ticket.ownerId)
            .then((status) => { 
                if(status == 200) setMessage("Checkin thành công !");
                if(status == 400) setMessage("Không tìm thấy vé !");
                if(status == 500) setMessage("Lỗi khi tìm vé !");
                console.log(status);
            })

        // console.log('kakakak');
    }

    const handleCancel = () => {
        cancelTicket(currentEvent._id, ticketId, result.ticket.ownerId)
            .then((status) => {
                if(status == 200) setMessage("Hủy vé thành công !");
                if(status == 400) setMessage("Không tìm thấy vé !");
                if(status == 500) setMessage("Lỗi khi tìm vé !");
                console.log(status);
            })

        // console.log('kakakak');
    }

  return (
    <div className={cx('container-check-ticket')}>
        <p
            style={{
                fontSize: 24,
                fontWeight: 'bold'
            }}
        >Nhập ID của vé: </p>
        <Input 
            style={{width: 500, marginBottom: 20, fontSize: 22,}}
            placeholder='Ticket ID'
            size='large'
            value={ticketId} onChange={(e) => setTicketId(e.target.value)}
        />

        <Button
            size='small'
            style={{
                borderColor: AppColor.themeColor,
                backgroundColor: AppColor.themeColor,
                color: '#ffffff',
                marginBottom: 5,
                width: 120,
                height: 40,
                fontSize: 20,
                fontWeight: 'bold',
            }}
            onClick={handleSearch}
        >
            Kiểm Tra
        </Button>

        {(result.status == 400) && <p>Ticket not found</p>}

        {
            (result.ticket) &&
        <div
            style={{
                flexDirection: 'row',
                //backgroundColor: 'pink',
                width: '100%',
                height: 1000,
                marginTop: 30,
            }}
            className='content-table'
        >
            {/* thong tin ve */}
            <div
                style={{
                    width: '65%',
                    height: '100%',
                    //backgroundColor: 'green',
                    marginRight: 20,
                    marginLeft: 20,
                }}
            >
                <p style={{fontSize: 18, fontWeight: 'bold',}}>{currentEvent.name}</p>
                <p>ID: {result.ticket.id}</p>
                <p>Loại vé: {result.ticket.name}</p>
                <p>Giá vé: {result.ticket.price}</p>
                <p>Owner ID: {result.ticket.ownerId}</p>
                <p>Status: {result.ticket.status}</p>
            </div>

            <Divider type="vertical" style={{height: '100%'}}/>
            {/* nut option */}
            <div
                style={{
                    width: '30%',
                    height: '100%',
                    //backgroundColor: 'green',
                    flexDirection: 'column',
                    //marginLeft: 20,
                    alignItems: 'center'
                }}
                className='button-group'
            >
                <Button
                    size='small'
                    style={{
                        borderColor: AppColor.themeColor,
                        backgroundColor: AppColor.themeColor,
                        color: '#ffffff',
                        marginBottom: 20,
                        width: 180,
                        height: 40,
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}
                    onClick={handleCheckin}
                >
                    Checkin
                </Button>

                <Button
                    size='small'
                    style={{
                        borderColor: AppColor.errorColor,
                        backgroundColor: AppColor.errorColor,
                        color: '#ffffff',
                        marginBottom: 20,
                        width: 180,
                        height: 40,
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}
                    onClick={handleCancel}
                >
                    Hủy vé
                </Button>

                {message}
            </div>
        </div>
        }
    </div>
  )
}

export default CheckTicket
