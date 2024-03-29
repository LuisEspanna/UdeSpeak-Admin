import React, { useEffect, useState } from 'react';
import './styles.scss';
import Button from '../../button/Button';
import PencilIcon from '../../icons/PencilIcon';
import SaveIcon from '../../icons/SaveIcon';
import DraggableList from '../../draggableList/DraggableList';

/**
 * @param {object} param0
 * @param {string} param0.className
 * @param {string} param0.value
 * @param {string} param0.name
 * @param {[]} param0.dropdowns
 * @param {function} param0.handleEditDropdown
 * @param {function} param0.onDeleteDropdown
 * @returns 
 */
export default function DescriptionField({ className, value, handleEditDropdown, onChange, name, dropdowns, onDeleteDropdown }) {
    const [isEditing, setIsEditing] = useState(false);
    const [arrayText, setArrayText] = useState([]);
    const [dnd, setDnd] = useState({ id: '', index: 0 });
    const [notUsedDropdowns, setNotUsedDropdowns] = useState([]);

    useEffect(() => {
        
        const newArrayText = value.split(' ').map((text, i) => {
            return { text, index: i };
        });

        setArrayText(newArrayText);        

        const getNotUsedDropdowns = (items, localArrayText) => {
            let localDropdowns = [];
            let found = false;
    
            items?.forEach((d) => {
                found = false;
                localArrayText?.forEach((item) => {
                    if (item.text.includes('@') && item.text === `@${d.id}`) {
                        found = true;
                    }
                });
    
                if (!found) {
                    localDropdowns.push(d);
                }
            });
            return localDropdowns;
        }

        setNotUsedDropdowns(getNotUsedDropdowns(dropdowns, newArrayText));
    }, [value, dropdowns]);

    const onDragginOver = (e) => {
        e.target.classList.add('word-drag-over');
        e.preventDefault();
    };

    const onDragLeave = (e) => {
        e.target.classList.remove('word-drag-over');
        e.preventDefault();
    };

    const onDragStart = (item) => {
        setDnd(item);
    };

    const onDrop = (e, item) => {
        // Si ya se encuentra dnd lo quito
        let newState = arrayText.filter((w) => w.text !== dnd.id);

        //Ponerlo en la posición del item actual del vector de state
        newState = [
            ...newState.slice(0, item.index),
            { text: dnd.id, index: item.index },
            ...newState
                .slice(item.index)
                .map((md) => ({ text: md.text, index: md.index + 1 })),
        ];

        newState.forEach((item, i) => (item.index = i));

        setArrayText(newState);
        setDnd({ ...dnd, index: item.index });
        handleEdit(newState);
    };

    const handleEdit = (localArrayText) => {
        let localText = '';

        localArrayText.forEach((item, i) => {
            localText = localText + item.text + ' ';
        });

        localText = localText.slice(0, localText.length - 1);
        onChange({ target: { name: 'description', value: localText } });
    }

    const getOptions = (word) => {
        let options = [];

        dropdowns?.forEach((q) => {
            if (`@${q.id}` === word) {
                options = q.options;
            }
        });

        return options;
    }

    /**
     * 
     * @param {string} idItem 
     */
    const deleteFromDescription = (idItem) => {
        const newState = arrayText.filter(w => w.text !== idItem);
        newState.forEach((item, i) => (item.index = i));
        handleEdit(newState);

        setNotUsedDropdowns([...notUsedDropdowns, dropdowns.find((d) => d.id === idItem.replace('@', ''))]);
    }

    return (
        <div className={`description-field ${className ? className : ''}`}>
            <p className='label'>Descripción</p>
            <div className='dd-content'>
                {
                    !isEditing ?
                        <div className="drag-area">
                            {arrayText.map((item, i) =>
                                !item.text.includes('@') ? (
                                    <div
                                        className="word"
                                        key={i + item.text}
                                        onDrop={(e) => onDrop(e, item)}
                                        onDragOver={onDragginOver}
                                        onDragLeave={onDragLeave}
                                    >
                                        {item.text}
                                    </div>
                                ) : (
                                    (dropdowns.find((d) => d.id === item.text.replace('@', ''))) ?
                                        <DraggableList
                                            key={item.index + item.text}
                                            draggable
                                            onDragStart={() => onDragStart({ id: item.text })}
                                            options={getOptions(item.text)}
                                            onDelete={() => deleteFromDescription(item.text)}
                                            onEdit={() => handleEditDropdown(dropdowns.find((d) => d.id === item.text.replace('@', '')))}
                                        /> :
                                        <div
                                            className="word"
                                            key={item.index + item.text}
                                            onDrop={(e) => onDrop(e, item)}
                                            onDragOver={onDragginOver}
                                            onDragLeave={onDragLeave}
                                        >
                                            {item.text}
                                        </div>
                                )
                            )}
                        </div> :
                        <textarea value={value} className='w-100' rows={5} name={name} onChange={onChange} />
                }


                {
                    
                    (notUsedDropdowns.length > 0 && !isEditing) > 0 &&
                    <div className='my-4'>
                        <hr />
                        <p className='label mb-2'>
                            Las siguientes listas no están siendo usadas, puede arrastrarlas en cualquier parte de la descripción.
                        </p>
                        <p className='label mb-2'>Las listas de la parte inferior se pueden eliminar definitivamente</p>
                        {
                            //Not used dropdowns
                            notUsedDropdowns.map((item, i) =>
                                <DraggableList
                                    key={i}
                                    draggable
                                    onEdit={() => handleEditDropdown(item)}
                                    onDragStart={() => onDragStart({ id: `@${item.id}` })}
                                    options={getOptions(`@${item.id}`)}
                                    onDelete={() => onDeleteDropdown(item)}
                                />
                            )
                        }
                    </div>
                    
                }

                <Button className='action-btn' type='primary' onClick={() => setIsEditing(!isEditing)}>
                    {
                        isEditing ?
                            <SaveIcon className='icon' /> :
                            <PencilIcon className='icon' />
                    }
                </Button>
            </div>
        </div>
    )
}
