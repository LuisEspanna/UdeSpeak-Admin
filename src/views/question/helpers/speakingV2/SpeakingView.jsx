import React from 'react';
import useSpeakingView from './hooks/useSpeakingView';
import PhoneContainer from '../../../../components/phoneContainer/PhoneContainer';
import TitleEditor from '../../../../components/phoneContainer/titleField/TitleField';
import ImageField from '../../../../components/phoneContainer/imageField/ImageField';
import Card from '../../../../components/card/Card';
import './styles.scss';
import AudioField from '../../../../components/phoneContainer/audioField/AudioField';


export default function SpeakingView({ question }) {
  const {
    state,
    image,
    isEdited,
    audio,
    handleChange,
    onSave,
    handleImage,
    handleAudio,
  } = useSpeakingView(question);

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
        <TitleEditor
          className='my-3 f-s-description'
          value={state?.description}
          onChange={handleChange}
          name='description'
          placeholder='Descripción (Opcional)'
        />
        <AudioField
          audio={audio}
          name='audio'
          label='Audio (Opcional)'
          onChange={handleAudio}
        />       
        <TitleEditor
          className='my-3 f-size-normal'
          value={state?.validation_text}
          onChange={handleChange}
          name='validation_text'
          placeholder='Texto a pronunciar'
        />
      </PhoneContainer>
      <div className='w-100 ms-4' style={{textAlign: 'justify'}}>
        <Card className='mb-3'>
          <p><b>Notas</b></p>
          <p>Puede cargar un audio para que el estudiante lo repita, procure no subir audios extensos.
          La maxíma duración del audio son 7 segundos.</p>
          <p>Por limitaciones actuales del sistema, el estudiante puede grabar su respuesta solo por 7 segundos.</p>
          <p>El campo <b>Texto a pronunciar</b>  será usado por el sistema para las validaciones, es la respuesta que se espera del estudiante, este campo es obligatorio y <b>NO</b> será visible en la aplicación movil.</p>
        </Card>
      </div>
    </>
  )
}
