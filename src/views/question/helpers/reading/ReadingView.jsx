import React from 'react';
import Button from '../../../../components/button/Button';
import TextField from '../../../../components/form/textField/TextField';
import './styles.scss';
import TrashIcon from '../../../../components/icons/TrashIcon';
import useReadingView from './hooks/useReadingView';
import PreviewReading from './helper/PreviewReading';
import Card from '../../../../components/card/Card';
import NavigationButtons from '../../../../components/navigationButtons/NavigationButtons';
import ProgressBar from '../../../../components/progressbar/ProgressBar';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

export default function Reading({ question }) {
  const {
    state,
    image,
    isLoading,
    isEdited,
    handleChange,
    onSave,
    handleAddOption,
    handleImage
  } = useReadingView(question);

  return (
    <>
      <Card className='w-100'>
        <div className='reading-view'>
          <h5><b>Reading</b></h5>
          <NavigationButtons />
          <div className='mt-4' />
          <TextField placeholder='Título' value={state?.title} name='title' className='mb-4' onChange={handleChange} />
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

          <div className='r-container'> 
            <div>
              <span className='my-4 w-100'>Descripción</span>
            </div>
            
            <TextInput 
              className='w-100 ' 
              trigger={["@"]} 
              options={{"@": state?.options?.map(option => option.name) || []}} 
              onChange={text => handleChange({target: {name:'description', value: text}})}
              value={state?.description || ''}
            />
            <p className='my-4 m-0 p-0 w-100'>Con @ puedes insertar a una opción desplegable</p>
          </div>
          
          <div className='r-container'>
            <div className='mb-4'><b>Opciones desplegables</b></div>

            <Button type='primary' title='Agregar opción' className='px-2' onClick={handleAddOption} />
          </div>

          <div className='r-container'>
            <div className='mb-4'><b>Preguntas</b></div>

            <Button type='primary' title='Agregar pregunta' className='px-2' onClick={handleAddOption} />
          </div>
          
          <div className='d-flex justify-content-center mt-4'>
            {
              isEdited && <Button type='primary' title='Guardar' className='px-4' onClick={onSave} />
            }
          </div>
        </div>
        <ProgressBar isLoading={isLoading} />
      </Card>
      <PreviewReading 
        image={image}
        question={state}
      />
    </>

  )
}
