import React from 'react'
import './sideBar.scss'; // Import file SCSS
import { Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { AppColor } from '../../constants/AppColor';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigation = useNavigate();
  return (
    <div className='sidebar-container'>

      <Button 
        className='sidebar-button'
        onClick={() => {navigation("/home")}}
      >Home</Button>

      <Button 
        className='sidebar-button'
        onClick={() => {navigation("/all-event")}}
      >My Event</Button>

      <Button 
        className='sidebar-button'
        onClick={() => {navigation("/create-event")}}
      >Create Event</Button>

      <Button 
        className='sidebar-button'
        onClick={() => {navigation("/all-room")}}
      >Room</Button>

      <Button 
        className='sidebar-button'
        onClick={() => {navigation("/create-room")}}
      >Create Room</Button>

    </div>
  )
}

export default SideBar
