import React from 'react';
import useReadingView from './hooks/useReadingView';
import PhoneContainer from '../../../../components/phoneContainer/PhoneContainer';
import './styles.scss';
import TitleEditor from '../../../../components/phoneContainer/titleField/TitleField';
import ImageField from '../../../../components/phoneContainer/imageField/ImageField';
import DescriptionField from '../../../../components/phoneContainer/descriptionField/DescriptionField';
import useDialog from '../../../../hooks/useDialog';
import Dialog from '../../../../components/Dialog/Dialog';
import OptionsArea from '../../../../components/phoneContainer/optionsArea/OptionsArea';
/*
import Button from '../../../../components/button/Button';
import TextField from '../../../../components/form/textField/TextField';
import TrashIcon from '../../../../components/icons/TrashIcon';
import PreviewReading from './helper/PreviewReading';
import Card from '../../../../components/card/Card';
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
    //isLoading,
    isEdited,
    handleChange,
    //onSave,
    handleImage,
    //handleAddQuestion,
    //handleEditQuestion,
    //getWords,
    handleDeleteQuestion,
    handleEditDropdown
  } = useReadingView(question, dialogProps);

  //console.log(state);

  return (
    <>
      <PhoneContainer showSaveBtn={isEdited}>
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

        <OptionsArea questions={state?.questions?.filter(q => q.type === 'question') || []}/>
      </PhoneContainer>
      <Dialog {...dialogProps} />
    </>
  )
}
