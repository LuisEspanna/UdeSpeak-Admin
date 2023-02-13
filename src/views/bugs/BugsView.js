import React from 'react';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import TrashIcon from '../../components/icons/TrashIcon';
import './styles.scss';
import useBugsView from './hooks/useBugsView';

export default function BugsView() {
  const {
    image,
    handleImage
  } = useBugsView();

  return (
    <div className='bugs-view'>
      <Card>
        <div className='view-title'>Reportar un problema</div>
        <textarea className='text-area' placeholder='Escriba aquí el problema que identificó' />
        {
          !image &&
          <div>
            <span className=''>Imagen </span>
            <input type='file' accept='image/*' onChange={handleImage} name='image' className='mb-4 d-inline-block' />
          </div>
        }
        {
          image && <div>
            <Button type='primary' className='my-4 d-inline-block px-1 me-1'>Imagen </Button>
            {
              typeof (image) === 'string' && <input disabled type='text' value={image} />
            }
            <Button type='primary' className='mx-4 d-inline-block' onClick={handleImage}>
              <TrashIcon className='icon' />
            </Button>
          </div>
        }
        <Button title='Enviar' type='primary' className='px-4' />
      </Card>
    </div>
  )
}
