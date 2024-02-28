import React from 'react';
import useNotesView from './hooks/useNotesView';
import PhoneContainer from '../../../../components/phoneContainer/PhoneContainer';
import TitleEditor from '../../../../components/phoneContainer/titleField/TitleField';
import './styles.scss';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


export default function ListeningView({ question }) {
  const {
    state,
    isEdited,
    handleChange,
    onSave,
    handleMarkdownBtn
  } = useNotesView(question);

  return (
    <>
      <PhoneContainer showSaveBtn={isEdited} onSave={onSave}>
        <h2 className='title-render'>
          {state?.title}
        </h2>

        <div className='mark-container'>
          <Markdown remarkPlugins={[remarkGfm]}>{state?.description}</Markdown>
        </div>

      </PhoneContainer>
      <section className='w-100 ms-4 ccard'>
        <p className='mb-4'>
          <b>Estas notas ayudarán al estudiante sobre algunos temas relacionados con el cuestionario.</b>
        </p>
        <div className='row'>
          <div className='mb-3 col'>
            <TitleEditor
              className='my-1'
              value={state?.title}
              onChange={handleChange}
              name='title'
            />

            <span className='mt-1'>Editor de texto Markdown</span>
            <textarea
              className='cmarkdown-editor' 
              onChange={handleChange} 
              name='description' 
              value={state?.description}
              placeholder='Escribe algo ...'
            />
          </div>
          <div className='mb-3 col'>
            <div className='btns-area'>
              <button onClick={() => handleMarkdownBtn('title')}>
                <h1>Títulos</h1>
                <p># Títulos</p>
              </button>
              <button onClick={() => handleMarkdownBtn('title1')}>
                <h2>Subtítulos</h2>
                <p>## Subtítulos</p>
              </button>
              <button onClick={() => handleMarkdownBtn('title2')}>
                <h3>Subtítulos</h3>
                <p>### Subtítulos</p>
              </button>
              <button onClick={() => handleMarkdownBtn('title3')}>
                <h4>Subtítulos</h4>
                <p>#### Subtítulos</p>
              </button>
              <button  onClick={() => handleMarkdownBtn('bold')}>
                <p><b>Negrita</b></p>
                <p> **Negrita**</p>
              </button>
              <button onClick={() => handleMarkdownBtn('italic')}>
                <i>Texto en tálica</i>
                <p>*Texto en tálica*</p>
              </button>
              <button onClick={() => handleMarkdownBtn('bitalic')}>
                <i>Texto en tálica y negrita</i>
                <p>***Texto en tálica y negrita***</p>
              </button>
              <button onClick={() => handleMarkdownBtn('normal')}>
                <p>Texto normal</p>
                <p>Texto normal</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
