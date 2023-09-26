import React from 'react';
import './styles.scss';
import Button from '../button/Button';

export default function Dialog({
        handleAcceptDialog,
        handleCancelDialog,
        isVisibleDialog,
        contentDialog,
        showAcceptBtn,
        showCancelBtn,
        className
    }) {

    return (
        <div className='dialog_overlay' id='dialog_overlay' 
             style={{visibility: isVisibleDialog ? 'visible' : 'hidden'}}>
            <div className={`dialog_container ${className ? className : ''}`}>
                <div className='dialog_content'>
                    {
                        contentDialog
                    }
                </div>
                <div className='dialog_action_buttons'>
                    {
                        showAcceptBtn && <Button title='Aceptar' type='primary' onClick={handleAcceptDialog}/>
                    }                    
                    {
                        showCancelBtn && <Button title='Cancelar' type='danger' onClick={handleCancelDialog}/>
                    }
                </div>
            </div>
        </div>
    )
}
