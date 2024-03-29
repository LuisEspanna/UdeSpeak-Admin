import React, { useState, useEffect } from 'react';
import PencilIcon from '../../../components/icons/PencilIcon';
import TrashIcon from '../../../components/icons/TrashIcon';
import LanguageInput from './LanguageInput';
import usePermissions from '../../../hooks/usePermissions';
import Button from '../../../components/button/Button';

export default function LanguageItem({ language, onSave, onDelete, className, onClick }) {
    const [state, setState] = useState({ ...language });
    const [isEditing, setIsEditing] = useState(false);
    const { isAdmin } = usePermissions();

    useEffect(() => {
        setState({ ...language });
    }, [language]);


    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleCancel = () => {
        setIsEditing(false);
        setState({ ...language });
    }

    const handleSave = (editedLanguage) => {
        setIsEditing(false);
        const newLanguage = {
            ...editedLanguage,
            id: language.id,
            prevImage: typeof (language.image) === 'string' ? language.image : null
        };

        if (newLanguage.image === language?.image) {
            delete newLanguage['prevImage'];
        }

        setState(newLanguage);
        if (onSave) onSave(newLanguage);
    }

    const handleDelete = () => {
        if (onDelete) onDelete(state);
    }

    const handleClick = () => {
        if (onClick) onClick(state);
    }

    if (isEditing) {
        return (
            <LanguageInput
                onSave={handleSave}
                language={state}
                onCancel={handleCancel}
                className='mb-3'
            />)
    } else {
        return (
            <div className={`language-item ${className ? className : ''}`}>
                <div className='row align-items-center'>
                    <div className='col' onClick={handleClick}>
                        <div className='row align-items-center'>
                            <div className='image-container'>
                                <img src={typeof (state.image) === 'string' ? state.image :
                                    URL.createObjectURL(state.image)} alt='' />
                            </div>
                            <div className='col align-items-center'>
                                <div>{state.name}</div>
                            </div>
                        </div>
                    </div>
                    {
                        isAdmin &&
                        <div className='col-sm-2 d-flex justify-content-end'>
                            <Button type='primary'>
                                <PencilIcon className={'icon'} onClick={handleEdit} />
                            </Button>
                            <Button type='danger' className='ms-2'>
                                <TrashIcon className={'icon'} onClick={handleDelete} />
                            </Button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}