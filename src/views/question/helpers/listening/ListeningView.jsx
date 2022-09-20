import React from 'react';
import Button from '../../../../components/button/Button';
import TextField from '../../../../components/form/textField/TextField';
import './styles.scss';
import TrashIcon from '../../../../components/icons/TrashIcon';
import useListeningView from './hooks/useListeningView';
import PreviewListening from './helper/PreviewListening';
import Card from '../../../../components/card/Card';
import NavigationButtons from '../../../../components/navigationButtons/NavigationButtons';
import ProgressBar from '../../../../components/progressbar/ProgressBar';
import RowOption from './helper/RowOption';

export default function Speaking({ question }) {
  const {
    state,
    image,
    isEdited,
    isLoading,
    handleChange,
    handleAddOption,
    handleEditOption,
    handleDeleteOption,
    onSave,
    handleImage
  } = useListeningView(question);

  return (
    <>
      <Card className='w-100'>
        <div className='speaking-view'>
          <h5><b>Listening</b></h5>
          <NavigationButtons />
          <div className='mt-4' />
          <TextField placeholder='Título' value={state?.title} name='title' className='mb-4' onChange={handleChange} />
          {
            typeof (image) !== 'string' &&
            <>
              <span className='my-4'>Imagen </span>
              <input type='file' accept='image/*' onChange={handleImage} name='image' className='mb-4 d-inline-block' />
            </>
          }
          {
            typeof (image) !== 'string' &&
            <>
              <span className='my-4'>Audio </span>
              <input type='file' accept='audio/*' onChange={handleImage} name='audio' className='mb-4 d-inline-block' />
            </>
          }

          {
            image && <>
              <Button type='primary' className='my-4 d-inline-block px-1 me-1'>Imagen </Button>
              {
                typeof (image) === 'string' && <input disabled type='text' value={image} />
              }
              <Button type='primary' className='mx-4 d-inline-block' onClick={handleImage}>
                <TrashIcon className='icon' />
              </Button>
            </>
          }
          <div>
            <span className='my-4'>Descripción</span>
          </div>
          <textarea name="description" rows="4" className='w-100' onChange={handleChange} value={state?.description} />
          <span className='my-4'>Opciones de respuesta</span>
          <div className='d-flex'>

            {
              state?.options &&
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Opción</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Respuesta válida</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    state.options.map((option, i) =>
                      <RowOption 
                        key={i}
                        option={option} 
                        onChange={handleEditOption}
                        onDelete={handleDeleteOption}
                      />
                    )
                  }
                </tbody>
              </table>
            }


          </div>
          <Button type='primary' title='Agregar posible respuesta' className='px-2' onClick={handleAddOption} />
          <div className='d-flex justify-content-center mt-4'>
            {
              isEdited && <Button type='primary' title='Guardar' className='px-4' onClick={onSave} />
            }
          </div>
        </div>
        <ProgressBar isLoading={isLoading} />
      </Card>
      <PreviewListening image={image} question={state} />
    </>

  )
}
