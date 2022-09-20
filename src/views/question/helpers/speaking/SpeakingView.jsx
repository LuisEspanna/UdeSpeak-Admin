import React from 'react';
import Button from '../../../../components/button/Button';
import TextField from '../../../../components/form/textField/TextField';
import './styles.scss';
import TrashIcon from '../../../../components/icons/TrashIcon';
import useSpeakingView from './hooks/useSpeakingView';
import Chip from '../../../../components/chip/Chip';
import PreviewSpeaking from './helper/PreviewSpeaking';
import Card from '../../../../components/card/Card';
import NavigationButtons from '../../../../components/navigationButtons/NavigationButtons';
import ProgressBar from '../../../../components/progressbar/ProgressBar';

export default function Speaking({ question }) {
  const { 
    state,
    image,
    isEdited,
    isLoading,
    handleChange, 
    handleAddPossibleAnswer, 
    onChangePossibleAnswer, 
    onDeletePossibleAnswer, 
    onSave, 
    handleImage 
  } = useSpeakingView(question);

  return (
    <>
      <Card className='w-100'>
        <div className='speaking-view'>    
          <h5><b>Speaking</b></h5>
          <NavigationButtons/>
          <div className='mt-4' />
          <TextField placeholder='Título' value={state?.title} name='title' className='mb-4' onChange={handleChange} />
          
          {
            typeof(image) !== 'string' && 
            <>
              <span className='my-4'>Imagen </span>
              <input type='file' accept='image/*' onChange={handleImage} name='image' className='mb-4 d-inline-block' />
            </>
          }
          
          {
            image && <>
              <Button type='primary' className='my-4 d-inline-block px-1 me-1'>Imagen </Button>
              {
                typeof(image) === 'string' && <input disabled type='text' value={image}/>
              }
              <Button type='primary' className='mx-4 d-inline-block' onClick={handleImage}>
                <TrashIcon className='icon'/>
              </Button>
            </>
          }
          <div>
            <span className='my-4'>Descripción</span>
          </div>
          <textarea name="description" rows="4" className='w-100' onChange={handleChange} value={state?.description}/>
          <span className='my-4'>Respuestas correctas</span>
          <div className='d-flex'>
            {
              state?.possible_answers?.map((option, i) =>
                <Chip
                  key={i}
                  value={option}
                  onChange={(text) => onChangePossibleAnswer(text, i)}
                  onDelete={() => onDeletePossibleAnswer(i)} />
              )
            }
          </div>
          <Button type='primary' title='Agregar posible respuesta' className='px-2' onClick={handleAddPossibleAnswer} />
          <div className='d-flex justify-content-center mt-4'>
            {
              isEdited && <Button type='primary' title='Guardar' className='px-4' onClick={onSave} />
            }
          </div>
        </div>
        <ProgressBar isLoading={isLoading}/>
      </Card>
      <PreviewSpeaking image={image} question={state}/>
    </>

  )
}
