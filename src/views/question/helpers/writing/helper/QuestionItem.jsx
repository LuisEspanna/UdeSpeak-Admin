import React
, { useState, useEffect }
    from 'react';
import Button from '../../../../../components/button/Button';
import TextField from '../../../../../components/form/textField/TextField';
import TrashIcon from '../../../../../components/icons/TrashIcon';
import { idGenerator } from '../../../../../functions';
import RowQuestionOption from './RowQuestionOption';
import useDialog from '../../../../../hooks/useDialog';
import DialogOptionElement from './Dialogs/DialogOptionElement';
import Dialog from '../../../../../components/Dialog/Dialog';

export default function QuestionItem({ questionItem, onChange, onDelete }) {

    const [state, setState] = useState(questionItem);
    const dialogProps = useDialog();

    useEffect(() => {
        setState(questionItem);
    }, [questionItem]);


    const handleChange = (e) => {
        let newState = {};
        newState = { ...state, [e.target.name]: e.target.value.replaceAll(' ', '') };
        setState(newState);
        onChange(newState);
    }

    const handleAddOption = () => {
        const options = state?.options || [];
        const newOption = { description: '', isValid: false, id: idGenerator(7) };

        dialogProps.setOnAcceptDialog({
            fn: (e) => {
                options.push(e);
                let newState = { ...state, options };
                setState(newState);
                onChange(newState);
            }
        });

        dialogProps.setContentDialog(
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
            <div className='row my-2' style={{ backgroundColor: 'inherit' }}>
                <div className='col' style={{ backgroundColor: 'inherit' }}>
                    <TextField
                        onChange={handleChange}
                        className='my-2'
                        placeholder='Nombre espacio writing'
                        name='title'
                        value={state?.title}
                    />
                </div>
                <div className='col-2 pt-4'>
                    <Button type='danger' onClick={() => onDelete(questionItem)}>
                        <TrashIcon className='icon' />
                    </Button>
                </div>
            </div>

            {
                state?.options &&
                <table className="table">
                    <thead>
                        <tr>
                            {questionItem.type === 'question' && <th scope="col">Opción</th>}
                            <th scope="col">Posibles respuestas</th>
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
            <Button type='primary' title='Agregar posible respuesta' className='px-2' onClick={handleAddOption} />
            <Dialog {...dialogProps} />
        </div>
    )
}
