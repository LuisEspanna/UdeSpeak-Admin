import React, { useState } from 'react'
import Card from '../../components/card/Card'
import Button from '../../components/button/Button'
import GoogleButton from '../../components/form/googleButton/GoogleButton'
import useGoogleLogin from '../../hooks/useGoogleLogin'
import '../Login/styles.scss'
import Swal from 'sweetalert2';

export default function Register() {
  const { googleLogin, register } = useGoogleLogin();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  })

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if(user.password !== user.cpassword)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden'
      })
    else 
      register(user.email, user.password, user.name)
  }
  

  return (
    <div className='login'>
      <Card className='mx-auto'>
        <div>
          <span className='dot1'/>
          <span className='dot2'/>
        </div>
          <GoogleButton onClick={googleLogin}/>      
        <hr className='w-100 '/> 
        <form onSubmit={handleSubmit}>
          <input name='name' type='text' required placeholder='Nombre completo' className='' aria-required onChange={handleChange}/>
          <input name='email' type='email' required placeholder='Correo' className='mt-3' aria-required onChange={handleChange}/>
          <input name='password' type='password' required placeholder='Contraseña' className='mt-3' aria-required onChange={handleChange}/>
          <input name='cpassword' type='password' required placeholder='Confirmar contraseña' className='my-3' aria-required onChange={handleChange}/>
          <Button type={'primary'} className='my-2' active={true}>Iniciar sesión</Button>
        </form>
        <div className='my-2'>
          <span>¿ya tienes una cuenta? </span>
          <a href='/login'>Inicia sesión</a>
        </div>
      </Card>
    </div>
  )
}
