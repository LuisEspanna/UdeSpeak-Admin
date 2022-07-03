import React from 'react'
import Card from '../../components/card/Card'
import Button from '../../components/button/Button'
import './styles.scss'
import useFirstSetup from './helpers/useFirstSetup'
import ProgressBar from '../../components/progressbar/ProgressBar'
import constants from '../../config/constants.json'

export default function FirstSetup() {
  const {isLoading, permissions, currOption, accessKey,
    onChangeOption, handleSubmit, handleAccessKey} = useFirstSetup();


  return (
    <div className='first-setup'>
      <Card className='mx-auto'>
        <div>
          <span className='dot1' />
          <span className='dot2' />
        </div>
        <span></span>
        <form onSubmit={handleSubmit}>
          <span className='title'>Selecciona tu rol</span>
          <select onChange={onChangeOption} className="form-select mt-3" aria-label="Default select example">
            {
              permissions.map((item, i)=> 
                <option
                  key={i}
                  value={i}
                >
                  {item.name}
                </option>
              )
            }
          </select>
          {
            (currOption.name !== constants.PERMISSIONS_STUDENT) &&
              <input 
                name='access-key'
                className='access-key'
                type='text' 
                required 
                placeholder={`Clave de acceso ${currOption.name.toLocaleLowerCase()}`} 
                onChange={handleAccessKey} 
                value={accessKey}
              /> 
          }
          <div className='description'>
            <span>
             {
              currOption.description
             }
            </span>
          </div>
          <div className='action-area'>
            <Button className='my-3' active={true}>
              {
                currOption.name === constants.PERMISSIONS_STUDENT ? 'Enviar' : 'Siguiente'
              }
            </Button>
            <div className='my-2'>
              <span>¿ya tienes una cuenta? </span>
              <a href='/login'>Inicia sesión</a>
            </div>
          </div>
        </form>
      </Card>
      <ProgressBar isLoading={isLoading}/>
    </div>
  )
}
