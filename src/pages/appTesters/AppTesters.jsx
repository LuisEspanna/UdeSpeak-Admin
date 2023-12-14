import React from 'react';
import './styles.scss';
import UdespeakLogo from './icons/UdespeakLogo';
import useAppTesters from './helper/useAppTesters';
import ArrowIcon from '../../components/icons/ArrowIcon';
import DownloadIcon from './icons/DownloadIcon';
import FLoatDot from './icons/FLoatDot';

export default function AppTesters() {
  const { item, data, apkLink, handlePrev, handleNext } = useAppTesters();

  return (
    <div className='my-body'>
      <FLoatDot size={20} posX={'-7em'} posY={'-10em'} type='ligth'/>
      <FLoatDot size={4} posX={'17em'} posY={'2em'} type='ligth'/>
      <FLoatDot size={1} posX={'27em'} posY={'1em'} type='ligth'/>
      <FLoatDot size={2} posX={'17em'} posY={'10em'} type='ligth'/>

      <FLoatDot size={13} posX={'25%'} posY={'90%'} type='dark'/>
      <FLoatDot size={4} posX={'2em'} posY={'83%'} type='dark'/>
      <FLoatDot size={2} posX={'-1em'} posY={'70%'} type='dark'/>

      <div className='title'>
        <UdespeakLogo />
      </div>
      <div className='btn-prev' onClick={handlePrev}>
        <ArrowIcon/>
      </div>
      <div className='btn-next' onClick={handleNext}>
        <ArrowIcon/>
      </div>
      <div className='slider-container'>
        <div className='text'>
          {item.text}
        </div>
        <img src={item.image} alt='img' className='image'/>
      </div>
      <div className='download-btn'>
          <a rel="noreferrer" href={apkLink} target='_blank'>
            <DownloadIcon/>
          </a>
      </div>
      <div className='slider-indicator'>
        {
          data.map((data, i) => 
            <div key={i} className={data.id === item.id ? 'ind-active' : 'ind-inactive'}/>
          )
        }
      </div>
    </div> 
  )
}