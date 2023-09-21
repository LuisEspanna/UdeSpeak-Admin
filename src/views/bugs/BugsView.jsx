import React from 'react';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import TrashIcon from '../../components/icons/TrashIcon';
import './styles.scss';
import { toDateFormat } from '../../functions';
import useBugsView from "./hooks/useBugsView";

export default function BugsView() {
  const {
    state,
    image,
    bugs,
    handleImage,
    handleDeleteBug,
    handleCreateBug,
    handleChange
  } = useBugsView();

  return (
    <div className='bugs-view'>
      <Card>
        <div className='view-title'>Reportar un problema</div>
        <textarea className='text-area' rows="4" placeholder='Escriba aquí el problema que identificó' value={state.description} onChange={handleChange} name='description' />
        {
          !image ?
            <div>
              <span className=''>Imagen </span>
              <input type='file' accept='image/*' onChange={handleImage} name='image' className='mb-4 d-inline-block' />
            </div> :
            <div className='row'>
              <div className='col-12'>
                {
                  ((typeof (image) === 'object') ?
                    <img src={URL.createObjectURL(image)} id="output" alt='' width={'50%'}/> :
                    <img src={image || ''} alt='' />)
                }
              </div>
              <div className='col-'>
                <Button type='primary' className='d-inline-block mb-4' onClick={handleImage}>
                  <div className='mx-2 d-inline-block'>Eliminar imagen</div><TrashIcon className='icon me-2' />
                </Button>
              </div>
            </div>

        }

        <Button title='Enviar' onClick={handleCreateBug} type='primary' className='px-4' />

        <div className='my-4'>
          {
            (bugs && bugs?.length > 0) &&
            <div className='table-container'>
              <div className='view-title mt-4'>Bugs reportados</div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Descripción</th>
                    <th scope="col">Fecha de creación</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    bugs?.map((b, i) =>
                      <tr key={i}>
                        <td>{b.description}</td>
                        <td>{toDateFormat(b.created_at)}</td>
                        <td>
                          <Button type='danger' onClick={() => handleDeleteBug(b)}>
                            <TrashIcon className='icon mx-2' />
                          </Button>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      </Card>
    </div>
  )
}
