import React from 'react'
import GoogleIcon from '../../icons/GoogleIcon'
import './google-button.scss'

export default function GoogleButton() {
  return (
    <button className='gbutton'>
      <GoogleIcon/>
      Inicia con Google
    </button>
  )
}
