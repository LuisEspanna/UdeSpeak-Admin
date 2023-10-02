import React from 'react';
import './styles.scss';
import HeaderIcons from '../icons/HeaderIcons';
import { getHour } from '../../functions'
import NextIcon from '../icons/NextIcon';
import SaveIcon from '../icons/SaveIcon';
import Button from '../button/Button';

export default function PhoneContainer({ onSave, showSaveBtn, children }) {
    return (
        <div className='phone-container'>
            <div className='phone-header'>
                <div>{getHour()}</div>
                <HeaderIcons />
            </div>

            <div className='phone-content'>
                {children}
            </div>

            <div className='d-flex justify-content-end cursor-pointer me-4'>
                {
                    showSaveBtn ? 
                    <Button type='primary' active className='round-btn' onClick={onSave}>
                        <SaveIcon className='icon' />
                    </Button> : 
                    <Button type='primary' active className='round-btn'>
                        <NextIcon className='icon' />
                    </Button>
                }
            </div>
        </div>
    )
}
