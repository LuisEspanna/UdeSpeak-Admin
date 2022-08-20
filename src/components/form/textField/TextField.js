import React from 'react';
import './styles.scss';

export default function TextField({placeholder, onChange, name, id, required, value, className}) {
    return (
        <div className={`form__group field ${className ? className : ''}`}>
            <input
                type="input"
                className={`form__field ${(value || value?.lenght > 0) ? 'form__field_active': ''}`}
                name={name} id={id}
                required={required}
                onChange={onChange}    
                value={value}
            />
            <label htmlFor="name" className="form__label">{placeholder}</label>
        </div>
    )
}
