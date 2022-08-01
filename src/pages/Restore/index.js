import React, { useState } from 'react'
import Card from '../../components/card/Card'
import Button from '../../components/button/Button'
import useGoogleLogin from '../../hooks/useGoogleLogin'
import './styles.scss'
import Swal from 'sweetalert2';

export default function Restore() {
  const { recoverAccount } = useGoogleLogin();
  const [user, setUser] = useState({
    email: ""
  })

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if(user.email.length < 6)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un correo válido'
      })
    else
      recoverAccount(user.email)
  }
  

  return (
    <div className='recover'>
      <Card className='mx-auto'>
        <div>
          <span className='dot1' />
          <span className='dot2' />
        </div>
        <span></span>
        <form onSubmit={handleSubmit}>
          <span className='title'>Ingresa el correo electónico asociado a tu cuenta</span>
          <input name='email' type='email' required placeholder='Correo electrónico' className='mt-3' aria-required onChange={handleChange} />
          <div className='action-area'>
            <Button type={'primary'} className='my-3' active={true}>Enviar</Button>
            <div className='my-2'>
              <span>¿ya tienes una cuenta? </span>
              <a href='/login'>Inicia sesión</a>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}
