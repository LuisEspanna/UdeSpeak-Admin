import React from 'react';
import Button from '../button/Button';
import ArrowIcon from '../icons/ArrowIcon';
import './styles.scss';
import useNavigationButtons from '../../hooks/useMyNavigation';

export default function NavigationButtons() {
    const {handleNext, handlePrevius, index, routes} = useNavigationButtons();
    console.log(index, routes);
  return (
    <div className='navigation-buttons'>
        <div className='row'>
            <div className='col'>
                {
                    index > 0 &&
                    <Button type='primary' active={true} onClick={handlePrevius}>
                        <ArrowIcon className='arrow-left'/>
                    </Button>
                }                
            </div>
            <div className='col'>
                {
                    index < routes.length-1 &&
                    <Button type='primary' active={true} onClick={handleNext}>
                        <ArrowIcon className='arrow-right'/>
                    </Button>
                }
            </div>
        </div>      
    </div>
  )
}
