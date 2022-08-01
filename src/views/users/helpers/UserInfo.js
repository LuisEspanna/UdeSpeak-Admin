import React, { useState } from 'react';
import Avatar from '../../../components/avatar/Avatar';
import Button from '../../../components/button/Button';
import './styles.scss';

export default function UserInfo({ user }) {

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
                        <div className='col-3'>
                            <Button
                                type='danger'
                                className={'w-100'}
                                title={'Reportar'} />
                        </div>
                    </div>
                    <p className='my-4'>Permisos</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Tipo</th>
                                <th scope="col">Codigo</th>
                                <th scope="col">Fecha de vencimiento</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}
