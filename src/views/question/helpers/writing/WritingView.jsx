import React from 'react';
import Button from '../../../../components/button/Button';
import TextField from '../../../../components/form/textField/TextField';
import './styles.scss';
import TrashIcon from '../../../../components/icons/TrashIcon';
import useWritingView from './hooks/useWritingView';
import PreviewWriting from './helper/PreviewWriting';
import Card from '../../../../components/card/Card';
import ProgressBar from '../../../../components/progressbar/ProgressBar';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import QuestionItem from './helper/QuestionItem';
import SaveIcon from '../../../../components/icons/SaveIcon';

export default function WritingView({ question }) {
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
    getWords,
    handleDeleteQuestion
  } = useWritingView(question);

  return (
    <>
      <Card className='w-100'>
        <div className='writing-view'>
          <h5><b>Writing</b></h5>
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

          <div className='desc-container'>
            <div>
              <span className='my-4 w-100'>Descripción</span>
            </div>

            <TextInput
              className='w-100 '
              trigger={["@"]}
              options={{ "@": getWords() }}
              onChange={text => handleChange({ target: { name: 'description', value: text } })}
              value={state?.description || ''}
            />
            <p className='my-4 m-0 p-0 w-100'>Con @ puedes insertar un espacio writing</p>
          </div>
          {/*-------------------------------------------------------------------------------------------------------------  OPCIONES DESPLEGABLES*/}
          <div className='mt-4 '>
            <div className='mb-4'><b>Espacios writing</b></div>

            {
              state?.questions && state?.questions.map((questionItem, i) =>
                <QuestionItem
                  key={i}
                  index={i}
                  questionItem={questionItem}
                  onChange={handleEditQuestion}
                  onDelete={handleDeleteQuestion}
                />
              )
            }
            <Button type='primary' title='Agregar espacio writing' className='px-2 my-4' onClick={() => handleAddQuestion('blank-space')} />
          </div>
        </div>
        <ProgressBar isLoading={isLoading} />
      </Card>
      <PreviewWriting
        image={image}
        question={state}
      />

      {
        (isEdited && !isLoading) &&
        <Button type='primary' active={true} className='floatbtn' onClick={onSave}>
          <SaveIcon className='icon' />
        </Button>
      }
    </>
  )
}
