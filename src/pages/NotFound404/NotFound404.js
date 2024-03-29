import React from 'react'
import Button from '../../components/button/Button'
import Image404 from './helpers/Image404'
import './styles.scss'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'

export default function NotFound404() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1);
  }

  return (
    <div className='notFound'>
      <div className='image'>
        <Image404 />
      </div>

      <div>
        <Card className='nf-card-container'>
          <h1 className='title'>ERROR 404</h1>
          <span>Página no encontrada</span>
          <Button
            active={true}
            onClick={handleClick}
            type='primary'
            className='nf-action-btn'
          >
            Volver
          </Button>
        </Card>
      </div>
    </div>
  )
}
