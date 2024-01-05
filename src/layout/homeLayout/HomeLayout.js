// HomeLayout.js
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../../components/side-bar/SideBar';
import TopBar from '../../components/top-bar/TopBar';
import styles from './homeLayout.scss'; 
import classNames from 'classnames/bind';
import { AppstoreOutlined, CalendarOutlined, CodepenOutlined, HomeOutlined, MailOutlined, PicCenterOutlined, SettingOutlined } from '@ant-design/icons';
import { App, Menu } from 'antd';
import { AppColor } from '../../constants/AppColor';
import { ConfigProvider } from 'antd';
import appIcon from '../../assets/images/light.png'
import { Image } from 'react-bootstrap';

const cx = classNames.bind(styles);

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Home', 'home', <HomeOutlined/>),
  getItem('Event', 'event', <CalendarOutlined/>,
    [
      getItem('All event', 'all-event'),
      getItem('Create event', 'create-event')
    ]
  ),
  getItem('Room', 'room', <CalendarOutlined/>,
    [
      getItem('All room', 'all-room'),
      getItem('Create room', 'create-room')
    ]
  )
];

export const HomeLayout = ({children}) => {

  const navigate = useNavigate();
  const [message, setMessage] = useState('default');

  const onClick = (e) => {
    console.log('click ', e);
    navigate(`/${e.key}`);
  };

  return (
    <div className={cx('container-homeLayout')}>

      {/* left menu */}
      <div className={cx('left-menu')}>

        <div className={cx('app-icon')}>
          <Image src={appIcon} style={{width: 230, alignSelf: 'center'}}/>
        </div>

        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemSelectedColor: AppColor.themeColor
              }
            }
          }}
        >
          <Menu
            onClick={onClick}
            style={{
              width: '100%',
              borderWidth: 0,
              //color: AppColor.themeColor
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items} 
          />
        </ConfigProvider>
      </div>

      <div className={cx('main-content')}>
        {children}
      </div>

    </div>
  );
}

