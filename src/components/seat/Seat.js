import React, { useState } from 'react';
import { AppColor } from '../../constants/AppColor';

const Seat = ({ content, handleClick, status }) => {
  const [seatStatus, setSeatStatus] = useState(status);

  const onClick = () => {
    setSeatStatus(!seatStatus);
    handleClick();
  };

  return (
    <div         
      style={{
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 8
    }}>
        <button
          onClick={onClick}
          style={{
              backgroundColor: seatStatus? AppColor.themeColor:null,
              height: 25,
              width: 25,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              fontSize: 8,
              borderWidth: 0,
          }}
        >{content}</button>
    </div>
  );
};

export default Seat;