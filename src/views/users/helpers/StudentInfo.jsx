import React, { useState } from 'react'
import MyDoughnutChart from '../../dashboard/helpers/MyDoughnutChart';
import ProgressGraph from '../../../components/progressGraph/ProgressGraph';
import ArrowIcon from '../../../components/icons/ArrowIcon';
import Avatar from '../../../components/avatar/Avatar';

export default function StudentInfo({
    user,
    getDonutValues,
    questionsMapToArray
}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <div className='userInfo'>
            <div className='row'>
                <div className='col'>
                    <span className='nickname' onClick={handleOpen}>{user?.displayName}</span>
                </div>
                <div className='col'>
                    {!open && <p className='email'>{user?.email}</p>}
                </div>
                <div className='col-1 arrow-btn' onClick={handleOpen}>
                    <ArrowIcon className={`${open ? 'open' : 'closed'}`} />
                </div>
            </div>
            <hr className='hr' />
            {
                open &&
                <div>
                    <div className='row'>
                        <div className='col d-flex justify-content-start align-items-center'>
                            <Avatar photoURL={user?.photoURL} />
                            <span className='email'>{user?.email}</span>
                        </div>
                        {
                            /*
                            TODO: Report user
        
                            <div className='col-3'>
                            <Button
                                type='danger'
                                className={'w-100'}
                                title={'Reportar'} />
                            </div>
                            */
                        }
                    </div>
                    <div>
                    <div className='my-4'>
                            Cuestionarios cursados:
                            {
                                user?.progress?.map((questionnary) => 
                                    <div className='my-4' key={questionnary.id}>
                                        <ProgressGraph
                                            value={( questionnary?.counter/questionnary?.questions?.length)} 
                                            labelRight={`${questionnary?.counter}/${questionnary?.questions?.length}`}
                                            labelLeft={`${questionnary?.name}`}
                                        />
                                    </div>
                                )
                            }
                        </div>
                        <div className='graph'>
                            <MyDoughnutChart values={getDonutValues(user?.coursed?.questions)} />
                        </div>
                        <p className='my-4'>
                            Ejercicios resueltos
                        </p>
                        <table className="table my-4">
                            <thead>
                                <tr>
                                    <th scope="col">Título</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    questionsMapToArray(user?.coursed?.questions).map((q, i) =>
                                        <tr key={i}>
                                            <td style={{ textTransform: 'capitalize' }}>{q.title}</td>
                                            <td style={{ textTransform: 'capitalize' }}>{q.type}</td>
                                            <td style={{ textTransform: 'capitalize' }}>{(q?.description) && q?.description?.substring(0, 10) + "..."}</td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}
