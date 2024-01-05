import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import SideBar from '../../components/side-bar/SideBar';
import './home.scss'; // Import file SCSS

const Home = () => {
  return (
    <div className='home-layout'>
        {/* <div className='sidebar'>
          <SideBar/>
        </div> */}

        <div className='main-content'>
            {/* <div className='topbar'>

            </div> */}

            <div className='outlet-content'>
                <Outlet/>
            </div>
        </div>
    </div>
  );
};

export default Home;
