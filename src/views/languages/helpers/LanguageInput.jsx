import React, { useState } from 'react';
import defaultImage from '../../../assets/images/photo.png';
import Button from '../../../components/button/Button';
import TextField from '../../../components/form/textField/TextField';
import CloseIcon from '../../../components/icons/CloseIcon';
import SaveIcon from '../../../components/icons/SaveIcon';
import Swal from 'sweetalert2';

export default function LanguageInput({onSave, language, onCancel, className}) {
    const [state, setState] = useState({
        name: language ? language.name : '',
        image: language ? language.image : ''
    });

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: (e.target.value) });
    }

    const loadFile = (e) => {
        setState({...state, [e.target.name]: e.target.files[0]});
    }

    const handleSave = () => {
        if(state.image && state.name.length > 0){
            if(onSave)onSave(state);
            if(language?.id === null || language?.id === undefined) setState({name: '', image: ''});
        }else{
            Swal.fire(
                'Error!',
                'La imagen es obligatoria',
                'error'
            )
        }
    }

    const handleCancel = () => {
        if(onCancel)onCancel();
    }

    return (
        <div className={`language-item ${className? className: ''}`}>
            <div className='row align-items-center'>
                <div className='image-container'>
                    {
                        state.image && typeof(state.image) === 'object'? 
                        <img src={URL.createObjectURL(state.image)} id="output" alt='' /> : 
                        <img src={language?.image || defaultImage} alt='' />
                    }
                </div>
                <input type='file' accept='image/*' onChange={loadFile} placeholder='imagen' name='image' />
                
                <div className='col align-items-center'>
                    <TextField placeholder='Idioma' onChange={handleChange} name='name' value={state.name}/>
                </div>
                <div className='d-flex justify-content-end mt-2'>
                    <Button type='primary' className='p-1 me-2' onClick={handleSave}>
                        <SaveIcon className='icon'/>
                        <span className='mx-1'>Guardar</span>
                    </Button>
                    <Button type='danger' className='p-1' onClick={handleCancel}>
                        <CloseIcon className='icon'/>
                        <span className='mx-1'>Cancelar</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
