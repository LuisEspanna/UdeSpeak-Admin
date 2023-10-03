import React from 'react';
import useReadingView from './hooks/useReadingView';
import PhoneContainer from '../../../../components/phoneContainer/PhoneContainer';
import './styles.scss';
import TitleEditor from '../../../../components/phoneContainer/titleField/TitleField';
import ImageField from '../../../../components/phoneContainer/imageField/ImageField';
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
  const {
    state,
    /*
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
    */
  } = useReadingView(question);

  console.log(state);

  return (
    <>
      <PhoneContainer>
          <TitleEditor className='my-1'/>
          <ImageField className='my-3'/>
      </PhoneContainer>
    </>
  )
}
