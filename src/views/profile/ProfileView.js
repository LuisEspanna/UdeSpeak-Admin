import React, { useRef } from 'react';
import Card from '../../components/card/Card';
import useDrawerView from './hooks/useProfileView';
import './styles.scss';

export default function ProfileView() {
  const ref = useRef();
  const viewProps = useDrawerView(ref);

  return (
    <div ref={ref}>
      <div className='row g-3 mb-3'>
        
      </div>
      <div>
        <Card>          
        </Card>
      </div>
    </div>
  )
}
