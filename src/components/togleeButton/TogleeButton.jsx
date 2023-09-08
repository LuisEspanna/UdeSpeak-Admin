import React, { useState } from 'react';
import './styles.scss';

export default function TogleeButton({styles, state1, state2, isActive, onChange, name}) {
    const [active, setActive] = useState(isActive);

    const handleClick = () => {
        setActive(!active);
        if(onChange)
          onChange({target: {name, value: !active}});
    }

  return (
    <div style={styles} className='togleeBtn'>
        {
            active 
            ? <p className='active' onClick={handleClick}>{state1}</p> 
            : <p className='inactive' onClick={handleClick}>{state2}</p>
        }
    </div>
  )
}
