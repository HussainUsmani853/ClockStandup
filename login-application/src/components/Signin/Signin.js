import { Button, TextField } from '@mui/material'
import React from 'react';
import './styles.css'

const Signin = () => {
  return (
    <div className='login'>
        <div className="login__content">
            <div className="login__wrapper">
                <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" className="login__logo" />

                <p className="login__title">Sign in</p>
                <p className="login__subtitle">Continue to Gmail</p>

                <form className='login__form'>
                    <TextField id="oulined-basic" label="Email" variant="outlined" type="email" className='login__input' />
                    <TextField id="oulined-basic" label="Password" variant="outlined" type="Password" className='login__input' />

                    <div className="login__infoText">
                        Not your computer? Use quest mode to sign in privately
                        <a href="/">Learn More</a>
                    </div>

                    <div className="login__buttons">
                        <Button className="login__button" color='primary'>Create Account</Button>
                        <Button className="login__button" color='primary' variant='contained'>Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signin