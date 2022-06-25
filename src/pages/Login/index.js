import React, { useState } from 'react'
import Card from '../../components/card/Card'
import Button from '../../components/button/Button'
import './styles.scss'
import UdespeakLogo from '../../components/icons/UdespeakLogo'
import GoogleButton from '../../components/form/googleButton/GoogleButton'
import useGoogleLogin from '../../hooks/useGoogleLogin'

export default function Login() {
  const { login, singUpWithEmailAndPassword } = useGoogleLogin();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    singUpWithEmailAndPassword(user.email, user.password)
  }
  

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
          <GoogleButton onClick={login}/>      
        <hr className='w-100 '/> 
        <form onSubmit={handleSubmit}>
          <span>Inicia con tu correo electrónico</span>
          <input name='email' type='email' required placeholder='Correo' className='my-4' onChange={handleChange}/>
          <input name='password' type='password' required placeholder='Contraseña' onChange={handleChange}/>
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
