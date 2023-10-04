import React from 'react';
import './styles.scss';
import Button from '../button/Button';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';


export default function DraggableList({ onDragStart, o2ptions, handleEdit, handleDelete }) {

    const options = [
        { description: 'option1', isValid: false },
        { description: 'option2', isValid: false },
        { description: 'option3', isValid: true },
        { description: 'option4', isValid: false }
    ];

    return (
        <div className='draggable-list-container' draggable onDragStart={onDragStart}>
            <div className='draggable-content'>
                <span className='drag-label'>

                </span>
                <select className="form-select me-2" aria-label="Default select example" draggable='true' onDragStart={onDragStart}>
                    {
                        options.map((opt, j) =>
                            <option key={j}>
                                {opt?.description}
                            </option>)
                    }
                </select>
                <Button type='primary' className='c-btn'>
                    <PencilIcon className='icon'/>
                </Button>
                <Button type='danger' className='c-btn'>
                    <TrashIcon className='icon'/>
                </Button>
            </div>
        </div>
    )
}
