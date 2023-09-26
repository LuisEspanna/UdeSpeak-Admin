import React, { useEffect, useState } from 'react';
import { toDateFormat } from '../../../../functions';
import useUsers from '../../../../hooks/useUsers';
import './styles.scss';


export default function BugDetails({ bug }) {
    const [user, setUser] = useState({});
    const { getUser } = useUsers();

    useEffect(() => {
        async function fetchItem() {
            //setIsLoading(true);
            let localItem = await getUser(bug.uid);
            setUser(localItem);
            //setIsLoading(false);
        }
        fetchItem();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <div className='bug-details'>
            <div className='row'>
                <div className='col-4'>
                    <b>Reportado por</b>
                </div>
                <div className='col'>
                    {user?.displayName}
                </div>
            </div>
            <div className='row'>
                <div className='col-4'>
                    <b>Fecha</b>
                </div>
                <div className='col'>
                    {toDateFormat(bug.created_at)}
                </div>
            </div>
            <div className='row'>
                <div className='col-4'>
                    <b>Descripción</b>
                </div>
                <div className='col'>
                    <div className='description-container'>
                        {bug.descripcion || ''}
                    </div>                    
                </div>
            </div>
            <div className='w-100 image-container'>
                {
                    bug?.image && <img src={bug?.image} alt="img" className='image'/>
                }
            </div>
        </div>
    )
}
