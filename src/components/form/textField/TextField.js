import React, {useState, useEffect} from 'react';
import './styles.scss';

export default function TextField({placeholder, onChange, name, id, required, value, className, maxLength}) {
    const [state, setState] = useState(value || '');

    useEffect(() => {
        setState(value || '');
    }, [value])
    

    const handleChange = (e) => {
        setState(e.target.value);
        if(onChange) onChange(e);
    }

    return (
        <div className={`form__group field ${className ? className : ''}`}>
            <input
                type="input"
                className={`form__field ${(state.length > 0) ? 'form__field_active': ''}`}
                name={name} id={id}
                required={required}
                onChange={handleChange}
                value={state}
                maxLength={maxLength}
                autoComplete='off'
            />
            <label htmlFor="name" className="form__label">{placeholder}</label>
        </div>
    )
}
