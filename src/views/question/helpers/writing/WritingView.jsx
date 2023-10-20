import React from 'react';
import useWritingView from './hooks/useWritingView';
import PhoneContainer from '../../../../components/phoneContainer/PhoneContainer';
import TitleEditor from '../../../../components/phoneContainer/titleField/TitleField';
import ImageField from '../../../../components/phoneContainer/imageField/ImageField';
import AudioField from '../../../../components/phoneContainer/audioField/AudioField';
import DescriptionField from '../../../../components/phoneContainer/descriptionFieldWriting/DescriptionFieldWriting';
import useDialog from '../../../../hooks/useDialog';
import Dialog from '../../../../components/Dialog/Dialog';
import Card from '../../../../components/card/Card';
import imgExampleDD from './assets/example-blankspace.png';
import Button from '../../../../components/button/Button';


export default function Reading({ question }) {
  const dialogProps = useDialog();

  const {
    state,
    image,
    audio,
    isEdited,
    handleChange,
    onSave,
    handleImage,
    handleAddQuestion,
    handleDeleteQuestion,
    handleEditDropdown,
    handleAudio
  } = useWritingView(question, dialogProps);

  return (
    <>
      <PhoneContainer showSaveBtn={isEdited} onSave={onSave}>
        <TitleEditor
          className='my-1'
          value={state?.title}
          onChange={handleChange}
          name='title'
        />
        <ImageField
          className='my-3'
          image={image}
          onChange={handleImage}
        />
        <AudioField
          audio={audio}
          name='audio'
          onChange={handleAudio}
          label='Audio (Opcional)'
          className='mb-3'
        />
        <DescriptionField
          value={state?.description || ''}
          onChange={handleChange}
          name='description'
          dropdowns={state?.questions?.filter(q => q?.type === 'blankspace') || []}
          onDeleteDropdown={handleDeleteQuestion}
          handleEditDropdown={handleEditDropdown}
        />
      </PhoneContainer>
      <div className='w-100 ms-4' style={{textAlign: 'justify'}}>
        <Card className='mb-3'>
          <p><b>Creación de áreas de texto</b></p>
          <p>Las áreas de texto permite al estudiante escribir su respuesta, el área de texto puede tener varias respuestas válidas definidas por el docente o el administrador, es posible mover el área de texto con el mouse en cualquier parte de la descripción.</p>
          <div className='d-flex justify-content-center my-3'>
            <img src={imgExampleDD} alt='' style={{width: '16em', margin: '1em'}}/>
          </div>
          <div className='d-flex justify-content-center'>
            <Button className='px-3' title='Agregar área de texto' type='primary' onClick={() => handleAddQuestion('blankspace')} />
          </div>
        </Card>
      </div>
      <Dialog {...dialogProps} />
    </>
  )
}
