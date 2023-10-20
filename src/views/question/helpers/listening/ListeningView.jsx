import React from 'react';
import useReadingView from './hooks/useListeningView';
import PhoneContainer from '../../../../components/phoneContainer/PhoneContainer';
import TitleEditor from '../../../../components/phoneContainer/titleField/TitleField';
import ImageField from '../../../../components/phoneContainer/imageField/ImageField';
import QuestionsArea from '../../../../components/phoneContainer/questionsArea/QuestionsArea';
import Card from '../../../../components/card/Card';
import imgExampleQ from './assets/example-question.png';
import Button from '../../../../components/button/Button';
import './styles.scss';
import AudioField from '../../../../components/phoneContainer/audioField/AudioField';


export default function ListeningView({ question }) {
  const {
    state,
    image,
    isEdited,
    audio,
    handleChange,
    onSave,
    handleImage,
    handleAudio,
    handleAddQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
  } = useReadingView(question);

  return (
    <>
      <PhoneContainer showSaveBtn={isEdited} onSave={onSave}>
        <TitleEditor
          className='my-1'
          value={state?.title}
          onChange={handleChange}
          name='title'
        />
        <AudioField
          audio={audio}
          name='audio'
          onChange={handleAudio}
        />
        <ImageField
          className='my-3'
          image={image}
          onChange={handleImage}
        />
        <TitleEditor
          className='my-1 f-size-normal'
          value={state?.description}
          onChange={handleChange}
          name='description'
          placeholder='Descripción (Opcional)'
        />
        <QuestionsArea
          questions={state?.questions?.filter(q => q.type === 'question') || []}
          onDeleteQuestion={handleDeleteQuestion}
          onEditQuestion={handleEditQuestion}
        />
      </PhoneContainer>
      <div className='w-100 ms-4' style={{textAlign: 'justify'}}>
        <Card className='mb-3'>
          <p><b>Creación de preguntas de selección única</b></p>
          <p>Permite al estudiante seleccionar una opción, es obligatorio que al menos una de las opciones definidas sea correcta, las preguntas con sus respectivas opciones aparecerán después de la descripción.</p>
          <div className='d-flex justify-content-center my-3'>
            <img src={imgExampleQ} alt='' />
          </div>
          <div className='d-flex justify-content-center'>
            <Button className='px-3 ' title='Nueva pregunta de selección única' type='primary' onClick={() => handleAddQuestion('question')} />
          </div>
        </Card>
      </div>
    </>
  )
}
