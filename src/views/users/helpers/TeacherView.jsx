import React, { useRef } from 'react';
import Card from '../../../components/card/Card';
import './styles.scss';
import useTeachersView from '../hooks/useTeachersView';
import StudentInfo from './StudentInfo';

export default function TeachersView({user}) {
  const ref = useRef();
  const viewProps = useTeachersView(ref, user);
  const { results, filterApplied } = viewProps;

  return (
    <div ref={ref} className='users-view'>
      <div>
        <Card>
          {
            filterApplied.length > 0 && <p className='view-title'>Resultados:  {filterApplied}</p>
          }
          {
            results.map((user, i) =>
              <StudentInfo
                key={i}
                user={user}
                userIndex={i}
                {...viewProps}
              />
            )
          }
        </Card>
      </div>
    </div>
  )
}