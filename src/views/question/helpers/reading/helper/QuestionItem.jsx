import React
, { useState, useEffect }
    from 'react';
import Button from '../../../../../components/button/Button';
import TextField from '../../../../../components/form/textField/TextField';
import TrashIcon from '../../../../../components/icons/TrashIcon';
import { idGenerator } from '../../../../../functions';
import RowQuestionOption from './RowQuestionOption';
import useDialog from '../../../../../hooks/useDialog';
import DialogListElement from './Dialogs/DialogListElement';
import DialogOptionElement from './Dialogs/DialogOptionElement';
import Dialog from '../../../../../components/Dialog/Dialog';

export default function QuestionItem({ questionItem, onChange, index, onDelete }) {

    const [state, setState] = useState(questionItem);
    const dialogProps = useDialog();

    useEffect(() => {
        setState(questionItem);
    }, [questionItem]);


    const handleChange = (e) => {
        if (questionItem.type === 'question') {
            setState({ ...state, [e.target.name]: e.target.value });
        } else {
            setState({ ...state, [e.target.name]: e.target.value.replaceAll(' ', '') });
        }
    }

    const handleAddOption = () => {
        const options = state?.options || [];
        const newOption = { description: '', isValid: false, id: idGenerator(7) };
        if (questionItem.type === 'question') {
            newOption.letter = '';
        }

        dialogProps.setOnAcceptDialog({
            fn: (e) => {
                options.push(e);
                setState({ ...state, options });

                let newState = { ...state, options };

                setState(newState);
                onChange(newState);
            }
        });

        dialogProps.setContentDialog(
            questionItem.type !== 'question' ?
                <DialogListElement option={newOption} setChanges={dialogProps.setChanges} /> :
                <DialogOptionElement option={newOption} setChanges={dialogProps.setChanges} />
        );
        dialogProps.setVisibleDialog(true);
    }

    const onEditOption = (option) => {
        dialogProps.setOnAcceptDialog({
            fn: (e) => {
                const indexOption = state.options.findIndex(op => op.id === option.id);

                const newOptions = [
                    ...state.options.slice(0, indexOption),
                    e,
                    ...state.options.slice(indexOption + 1)
                ];

                let newState = { ...state, options: newOptions };

                setState(newState);
                onChange(newState);
            }
        });

        dialogProps.setContentDialog(
            questionItem.type !== 'question' ?
                <DialogListElement option={option} setChanges={dialogProps.setChanges} /> :
                <DialogOptionElement option={option} setChanges={dialogProps.setChanges} />
        );
        dialogProps.setVisibleDialog(true);
    }

    const handleDeleteOption = (option) => {
        const options = state.options.filter(op => op.id !== option.id);
        let newState = { ...state, options };

        setState(newState);
        onChange(newState);
    }

    return (
        <div className={`my-2 r-container`}>
            <div className='row my-2'>
                <div className='col-8'>
                    {questionItem.type === 'question' ? 'Pregunta ' : 'Lista '} {index + 1}
                </div>
                <div className='col d-flex justify-content-end'>
                    <Button type='danger' onClick={() => onDelete(questionItem)}>
                        <TrashIcon className='icon' />
                    </Button>
                </div>
            </div>
            {
                questionItem.type === 'question' ?
                    <textarea
                        onChange={handleChange}
                        name='title' value={state?.title}
                        placeholder='Texto / pregunta'
                    />
                    : <TextField
                        onChange={handleChange}
                        className='my-2'
                        placeholder='Nombre lista desplegable'
                        name='title'
                        value={state?.title}
                    />
            }

            {
                state?.options &&
                <table className="table">
                    <thead>
                        <tr>
                            {questionItem.type === 'question' && <th scope="col">Opción</th>}
                            <th scope="col">Descripción</th>
                            <th scope="col">Respuesta válida</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state?.options.map((option, i) =>
                                <RowQuestionOption
                                    key={i}
                                    option={option}
                                    onEdit={() => onEditOption(option)}
                                    onDelete={() => handleDeleteOption(option)}
                                    type={questionItem.type}
                                />
                            )
                        }
                    </tbody>
                </table>
            }
            <Button type='primary' title='Agregar opción' className='px-2' onClick={handleAddOption} />
            <Dialog {...dialogProps} />
        </div>
    )
}
