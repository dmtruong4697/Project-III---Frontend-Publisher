import React from 'react'
import classNames from 'classnames/bind';
import styles from './roomCard.scss';

const cx = classNames.bind(styles);

const RoomCard = () => {
  return (
    <div className={cx('container-room-card')}>
      <div className={cx('all-room-info')}>

      </div>

      <div className={cx('all-room-table')}>

      </div>
    </div>
  )
}

export default RoomCard
