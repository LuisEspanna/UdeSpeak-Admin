import React from 'react'
import GoogleIcon from '../../icons/GoogleIcon'
import './google-button.scss'

export default function GoogleButton(props) {
  return (
    <button
      {...props}
      className='gbutton'>
      <GoogleIcon/>
      Inicia con Google
    </button>
  )
}
