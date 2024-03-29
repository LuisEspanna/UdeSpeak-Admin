import React from 'react';
import './styles.scss';
import defaultImage from '../../../assets/images/image.png';
import TrashIcon from '../../icons/TrashIcon';
import ImageIcon from '../../icons/ImageIcon';
import Button from '../../button/Button';


export default function ImageField({ className, image, onChange }) {
    return (
        <div className={`image-field ${className ? className : ''}`}>
            <div>
                <p className='label'>Imagen (Opcional)</p>
            </div>
            {
                image && ((typeof (image) === 'object') ?
                    <img className='img' src={URL.createObjectURL(image)} id="output" alt='' /> :
                    <img className='img' src={image || defaultImage} alt='' />)
            }
            {
                !image ?
                    <div className='img'>
                        <ImageIcon />
                        <input type='file' accept='image/*' onChange={onChange} name='image' className='mt-1 d-inline-block' />
                    </div>
                    :
                    <Button className='action-btn' type='danger' onClick={onChange}>
                        <TrashIcon className='icon' />
                    </Button>
            }
        </div>
    )
}
