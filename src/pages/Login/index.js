import React from 'react'
import Card from '../../components/card/Card'
import Button from '../../components/button/Button'
import './styles.scss'
import UdespeakLogo from '../../components/icons/UdespeakLogo'
import GoogleButton from '../../components/form/googleButton/GoogleButton'

export default function Login() {
  return (
    <div className='login'>
      <Card className='mx-auto'>
        <div>
          <span className='dot1'/>
          <span className='dot2'/>
        </div>
        <div className='logo'>
          <UdespeakLogo/>
        </div>
          <GoogleButton/>      
        <hr className='w-100'/> 
        <form>
          <span>Inicia con tu correo electrónico</span>
          <input type='email' required placeholder='Correo' className='my-4'/>
          <input type='password' required placeholder='Contraseña'/>
          <a href='/' className='my-3'>Olvidaste tu Contraseña?</a>
          <Button className='my-2' active={true}>Iniciar sesión</Button>
        </form>
        <div className='my-2'>
          <span>¿No tienes una cuenta? </span>
          <a href='/register'>Registrate</a>
        </div>
      </Card>
    </div>
  )
}
