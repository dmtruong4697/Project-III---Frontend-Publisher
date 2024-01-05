import React from 'react'
import styles from './eventCard.module.scss'; 
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const EventCard = () => {

  return (
    <div className={cx('container')}>
      <div className={cx('image-view')}>

      </div>

      <div className='title'>
        <p>EVENT TITLE</p>
      </div>

      <div className='date'>
        <p>22/11/2023</p>
      </div>

      <div className='tag'>
        <p>event tag</p>
      </div>
    </div>
  )
}

export default EventCard
