import React from 'react';
import './styles.css';
import './PopoverStyles.css';
import { Apps, FeedbackOutlined, HelpOutline, Settings } from '@mui/icons-material';
import { Avatar } from '@mui/material';

const Header = () => {
  return (
    <div className='header'>
        <div className='header__logoContainer'>
            <img src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbf194273d27aa7ee1f5.png" alt="Google" className="header__logo"/>
            <p>Meet</p>
        </div>
        <div className='header__icons'>
          <HelpOutline />
          <FeedbackOutlined />
          <Settings />

          <div className='header__iconDivider'></div>
          <Apps />
          <Avatar className='header__avatar'/>       
        </div>
    </div>
  )
}

export default Header