import React, { useEffect, useState } from 'react';
import './styles.scss';
import Button from '../../button/Button';
import PencilIcon from '../../icons/PencilIcon';
import DraggableList from '../../draggableList/DraggableList';

export default function DescriptionField({className}) {

    const [isEditing, setIsEditing] = useState(false);

    const data =
        'Este es un texto de @btn1 prueba el cual será usado para este ejemplo';
    const [state, setState] = useState([]);
    const [dnd, setDnd] = useState({ id: '', index: 0 });

    useEffect(() => {
        setState(
            data.split(' ').map((text, i) => {
                return { text, index: i };
            })
        );
    }, []);

    const onDragginOver = (e) => {
        e.target.classList.add('word-drag-over');
        e.preventDefault();
    };

    const onDragLeave = (e) => {
        e.target.classList.remove('word-drag-over');
        e.preventDefault();
    };

    const onDragStart = (e, item) => {
        setDnd(item);
    };

    const onDrop = (e, item) => {
        // Si ya se encuentra dnd lo quito
        let newState = state.filter((w) => w.text !== dnd.id);

        //Ponerlo en la posición del item actual del vector de state
        newState = [
            ...newState.slice(0, item.index),
            { text: dnd.id, index: item.index },
            ...newState
                .slice(item.index)
                .map((md) => ({ text: md.text, index: md.index + 1 })),
        ];

        newState.forEach((item, i) => (item.index = i));

        setState(newState);
        setDnd({ ...dnd, index: item.index });
        //console.log(newState);
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    }

    return (
        <div className={`description-field ${className ? className : ''}`}>
            <p className='label'>Descripción</p>
            <div className='dd-content'>
                <div className="drag-area">
                    {state.map((item) =>
                        !item.text.includes('@') ? (
                            <div
                                className="word"
                                key={item.index}
                                onDrop={(e) => onDrop(e, item)}
                                onDragOver={onDragginOver}
                                onDragLeave={onDragLeave}
                            //droppable="true"
                            >
                                {item.text}
                            </div>
                        ) : (
                            <DraggableList
                                draggable
                                onDragStart={(e) => onDragStart(e, { id: item.text })}
                            />
                        )
                    )}
                </div>

                <Button className='action-btn' type='primary' onClick={handleEdit}>
                    <PencilIcon className='icon' />
                </Button>
            </div>
        </div>
    )
}
