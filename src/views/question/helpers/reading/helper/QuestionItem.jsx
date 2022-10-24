import React
//,  { useState, useEffect } 
from 'react';
import Button from '../../../../../components/button/Button';
import RowQuestionOption from './RowQuestionOption';

export default function QuestionItem({questionItem, onChange, handleAddOption, index}) {
    /*
    const [state, setState] = useState(questionItem);

    useEffect(() => {
        setState(questionItem);
    }, [questionItem]);
    */
    
    const handleChange = (e) => {
        if(onChange) {
            if(e.target.name === 'option'){
                onChange({target: {
                    name: 'option', 
                    value: {option: e.target.value, parent: questionItem}
                }});
            } else {
                onChange(e, questionItem);
            }            
        }
    }

    return (
        <div className='my-2 r-container'>
            <div className='my-2'>Pregunta {index + 1}</div>
            <textarea onChange={handleChange} name='title' value={questionItem?.title}/>
            {
                questionItem?.options &&
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Opción</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Respuesta válida</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            questionItem?.options.map((option, i) =>
                                <RowQuestionOption
                                    key={i}
                                    option={option}
                                    onChange={handleChange}
                                    //onDelete={handleDeleteQuestion}
                                />
                            )
                        }
                    </tbody>
                </table>
            }
            <Button type='primary' title='Agregar opción' className='px-2' onClick={() => handleAddOption(questionItem, index)}/>
        </div>
    )
}
