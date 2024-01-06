import React, { useState } from 'react';
import Avatar from '../../../components/avatar/Avatar';
import Button from '../../../components/button/Button';
import './styles.scss';
import { toDateFormat, toISOFormat } from '../../../functions';
import TrashIcon from '../../../components/icons/TrashIcon';
import SaveIcon from '../../../components/icons/SaveIcon';
import PencilIcon from '../../../components/icons/PencilIcon';
import ArrowIcon from '../../../components/icons/ArrowIcon';
import ReloadIcon from '../../../components/icons/ReloadIcon';
import { PERMISSIONS } from '../../../constants';
import MyDoughnutChart from '../../dashboard/helpers/MyDoughnutChart';

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
    currentPermission,
    isLoading, 
    getQuestionsValues
}) {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
        if (!open && handleUser) handleUser(user);
    }

    const handleReload = () => {
        if (handleUser) handleUser(user);
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
                {
                    (user?.uid !== currentUser?.uid && open && !isLoading) ?
                        <div className='col-1 arrow-btn' onClick={handleReload}>
                            <ReloadIcon className='icon' />
                        </div> :
                        <div className='col-1 arrow-btn' onClick={handleOpen}>
                            <ArrowIcon className={`${open ? 'open' : 'closed'}`} />
                        </div>
                }
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
                    <p className='my-4'>
                        {
                            user.permission === PERMISSIONS.ADMIN ? 'Permisos' : 'Ejercicios resueltos'
                        }
                    </p>
                    {
                        (currentUser?.permissions && user?.uid === currentUser?.uid && user.permission === PERMISSIONS.ADMIN) &&
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
                                                            <SaveIcon onClick={() => handleSave(i)} className='icon mx-2' />
                                                        </div>
                                                    </td>
                                                </tr>
                                                : <tr key={i}>
                                                    <td>{p.name}</td>
                                                    <td>{p.key}</td>
                                                    <td>{toDateFormat(p.expires)}</td>
                                                    <td>
                                                        <PencilIcon onClick={() => handleEdit(i)} className='icon ' />
                                                        <TrashIcon onClick={() => handleDelete(i)} className='icon mx-2 ' />
                                                    </td>
                                                </tr>
                                        )
                                        )
                                    }
                                </tbody>
                            </table>
                            <div className='d-flex justify-content-end'>
                                {
                                    currentUser?.permissions?.length === 0 &&
                                    <Button title='Agregar permiso' onClick={handleCreate} type='primary' style={{ width: '10em' }} />
                                }
                            </div>
                            <hr className='hr mb-4' />
                        </div>
                    }

                    {
                        user.permission === PERMISSIONS.TEACHER &&
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Título</th>
                                        <th scope="col">Tipo</th>
                                        <th scope="col">Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        user?.coursed?.questions?.map((q, i) => 
                                        <tr key={i}>
                                            <td>{q.title}</td>
                                            <td>{q.type}</td>
                                            <td>{q?.description?.substring(0, 10) + "..."}</td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                            <MyDoughnutChart values={getQuestionsValues(user?.coursed?.questions)}/>
                        </div>                        
                    }
                </div>
            }
        </div>
    )
}
