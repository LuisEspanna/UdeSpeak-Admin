import React, { useState } from 'react';
import Avatar from '../../../components/avatar/Avatar';
import Button from '../../../components/button/Button';
import './styles.scss';
import { toDateFormat, toISOFormat } from '../../../functions';
import TrashIcon from '../../../components/icons/TrashIcon';
import SaveIcon from '../../../components/icons/SaveIcon';
import PencilIcon from '../../../components/icons/PencilIcon';
import ArrowIcon from '../../../components/icons/ArrowIcon';

export default function UserInfo({
    user,
    handleUser,
    isEditing,
    handleDate,
    handleDelete,
    handleSave,
    handleEdit,
    handleType,
    currentUser,
    handleCreate,
    currentPermission
}) {

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
                <div className='col-1 arrow-btn' onClick={handleOpen}>
                    <ArrowIcon className={`${open?'open':'closed'}`}/>
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
                        currentUser?.permissions &&
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
                                        currentUser?.permissions?.map((p, i) => (
                                            (isEditing && i === currentPermission) ?
                                                <tr key={i}>
                                                    <td>
                                                        <select onChange={(e) => handleType(e, p, i)} className="form-select" defaultValue={p.name}>
                                                            <option value={'Administrador'}>Administrador</option>
                                                            <option value={'Docente'}>Docente</option>
                                                            <option value={'Estudiante'}>Estudiante</option>                                                            
                                                        </select>
                                                    </td>
                                                    <td>{p.key}</td>
                                                    <td>
                                                        <p style={{ fontSize: '0.67em', marginBottom: 0 }}>{toDateFormat(p.expires)}</p>
                                                            <input
                                                                type="datetime-local"
                                                                onChange={(e) => handleDate(e, p, i)}
                                                                min={toISOFormat(new Date())} 
                                                        />
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <SaveIcon  onClick={() => handleSave(i)} className='icon mx-2' />
                                                        </div>
                                                    </td>
                                                </tr>
                                                : <tr key={i}>
                                                    <td>{p.name}</td>
                                                    <td>{p.key}</td>
                                                    <td>{toDateFormat(p.expires)}</td>
                                                    <td>
                                                        <PencilIcon onClick={() => handleEdit(i)} />
                                                        <TrashIcon onClick={() => handleDelete(i)} className='mx-2' />
                                                    </td>
                                                </tr>
                                        )
                                        )
                                    }
                                </tbody>
                            </table>
                            <div className='d-flex justify-content-end'>
                                <Button title='Agregar permisos' onClick={handleCreate} type='primary' style={{width: '10em'}}/>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}
