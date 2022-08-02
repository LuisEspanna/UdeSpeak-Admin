import React, { useState } from 'react';
import Avatar from '../../../components/avatar/Avatar';
import Button from '../../../components/button/Button';
import './styles.scss';
import { toDateFormat, toISOFormat } from '../../../functions';
import TrashIcon from '../../../components/icons/TrashIcon';
import SaveIcon from '../../../components/icons/SaveIcon';
import PencilIcon from '../../../components/icons/PencilIcon';

export default function UserInfo({ user, handleUser, isEditing, handleDate, handleDelete, handleSave, handleEdit, handleType }) {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
        if (!open && handleUser) handleUser(user);
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
                    {
                        user?.permissions &&
                        <div className='table-container'>
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
                                    {
                                        user?.permissions?.map((p, i) =>
                                            <tr key={i}>
                                                <td>
                                                    {
                                                        isEditing ?
                                                        <select onChange={handleType} className="form-select" defaultValue={p.name}>
                                                            <option value={'Administrador'}>Administrador</option>
                                                            <option value={'Docente'}>Docente</option>                                                            
                                                        </select> : p.name
                                                    }
                                                    
                                                </td>
                                                <td>{p.key}</td>
                                                <td>
                                                    {
                                                        isEditing ?
                                                            <input
                                                                type="datetime-local"
                                                                onChange={(e) => handleDate(e, p, i)}
                                                                min={toISOFormat(new Date())}
                                                            //placeholder={toDateFormatted(p.expires).substring(0, 16)}
                                                            /> : toDateFormat(p.expires)
                                                    }
                                                </td>
                                                <td>
                                                    <div>
                                                        {
                                                            isEditing ? <SaveIcon onClick={handleSave} className='mx-2' /> :
                                                                <div>
                                                                    <PencilIcon onClick={handleEdit} />
                                                                    <TrashIcon onClick={handleDelete} className='mx-2' />
                                                                </div>
                                                        }

                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            }
        </div>
    )
}
