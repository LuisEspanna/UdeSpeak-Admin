import React from 'react';
import useReadingView from './hooks/useReadingView';
import PhoneContainer from '../../../../components/phoneContainer/PhoneContainer';
import './styles.scss';
import TitleEditor from '../../../../components/phoneContainer/titleField/TitleField';
import ImageField from '../../../../components/phoneContainer/imageField/ImageField';
import DescriptionField from '../../../../components/phoneContainer/descriptionField/DescriptionField';
import useDialog from '../../../../hooks/useDialog';
import Dialog from '../../../../components/Dialog/Dialog';
import QuestionsArea from '../../../../components/phoneContainer/questionsArea/QuestionsArea';
import Card from '../../../../components/card/Card';
import imgExampleDD from './assets/example-dropdown.png';
import imgExampleQ from './assets/example-question.png';
import Button from '../../../../components/button/Button';
/*
import Button from '../../../../components/button/Button';
import TextField from '../../../../components/form/textField/TextField';
import TrashIcon from '../../../../components/icons/TrashIcon';
import PreviewReading from './helper/PreviewReading';

import ProgressBar from '../../../../components/progressbar/ProgressBar';
import TextInput from 'react-autocomplete-input';
import QuestionItem from './helper/QuestionItem';
import SaveIcon from '../../../../components/icons/SaveIcon';
import 'react-autocomplete-input/dist/bundle.css';
*/

export default function Reading({ question }) {
  const dialogProps = useDialog();

  const {
    state,
    image,
    isLoading,
    isEdited,
    handleChange,
    onSave,
    handleImage,
    handleAddQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleEditDropdown
  } = useReadingView(question, dialogProps);

  //console.log(state);

  return (
    <>
      <PhoneContainer showSaveBtn={isEdited} onSave={onSave} isLoading={isLoading}>
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
        <DescriptionField
          value={state?.description || ''}
          onChange={handleChange}
          name='description'
          dropdowns={state?.questions?.filter(q => q.type === 'dropdown') || []}
          onDeleteDropdown={handleDeleteQuestion}
          handleEditDropdown={handleEditDropdown}
        />

        <QuestionsArea
          questions={state?.questions?.filter(q => q.type === 'question') || []}
          onDeleteQuestion={handleDeleteQuestion}
          onEditQuestion={handleEditQuestion}
        />
      </PhoneContainer>
      <div className='w-100 ms-4'>
        <Card className='mb-3'>
          <p><b>Creación de listas desplegables</b></p>
          <p>Una lista desplegable permite al estudiante seleccionar una opción, es obligatorio que al menos una de las opciones definidas sea correcta, puede insertar una lista desplegable, puedes mover la lista desplegable con el mouse.</p>
          <div className='d-flex justify-content-center my-3'>
            <img src={imgExampleDD} alt='' />
          </div>
          <div className='d-flex justify-content-center'>
            <Button className='px-3' title='Nueva lista desplegable' type='primary' onClick={() => handleAddQuestion('dropdown')} />
          </div>
        </Card>
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
      <Dialog {...dialogProps} />
    </>
  )
}
