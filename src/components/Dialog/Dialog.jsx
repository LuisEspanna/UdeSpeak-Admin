import React from 'react';
import './styles.scss';
import Button from '../button/Button';

export default function Dialog({
        handleAcceptDialog,
        handleCancelDialog,
        isVisibleDialog,
        contentDialog,
    }) {

    return (
        <div className='dialog_overlay' id='dialog_overlay' 
             style={{visibility: isVisibleDialog ? 'visible' : 'hidden'}}>
            <div className='dialog_container'>
                <div className='dialog_content'>
                    {
                        contentDialog
                    }
                </div>
                <div className='dialog_action_buttons'>
                    <Button title='Aceptar' type='primary' onClick={handleAcceptDialog}/>
                    <Button title='Cancelar' type='danger' onClick={handleCancelDialog}/>
                </div>
            </div>
        </div>
    )
}
