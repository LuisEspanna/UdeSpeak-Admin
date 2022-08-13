import React from 'react';
import './styles.scss';

export default function TextField({placeholder, onChange, name, id, required, value}) {
    return (
        <div className="form__group field">
            <input
                type="input"
                className={`form__field ${value ? 'form__field_active': ''}`}
                name={name} id={id}
                required={required}
                onChange={onChange}    
            />
            <label htmlFor="name" className="form__label">{placeholder}</label>
        </div>
    )
}
