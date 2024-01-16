import React from 'react';
import './styles.scss';
import ChatImg from './helper/ChatImg';
import Button from '../../components/button/Button';

export default function HelpPage() {
    const handleClick = () => {
        console.log('Redirect to: 3163361987');
    }

    return (
        <div className='help-page'>
            <ChatImg />
            <Button
                active={true}
                onClick={handleClick}
                type='primary'
                className='nf-action-btn'
            >
                <a target='_blank' rel='noopener noreferrer' href='https://wa.me/3163361987'>Ir a WhatsApp</a>
            </Button>
        </div>
    )
}
