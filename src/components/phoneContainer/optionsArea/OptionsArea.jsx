import React from 'react';
import './styles.scss';
import OptionField from '../../form/optionField/OptionField';

export default function OptionsArea({questions}) {
  return (
    <div className='questions-area'>
        <p className='label'>Preguntas de selección única</p>
        {
            questions?.map((q, i) => 
                <div className='question-container' key={i}>
                    <p className='question-title'>{q.title}</p>
                    {
                        q?.options?.map((o, j)=> 
                            <OptionField key={j} letter='A' option={o}/>
                        )
                    }
                </div>
            )
        }
    </div>
  )
}

