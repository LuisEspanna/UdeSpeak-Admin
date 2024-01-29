import React from 'react';
import './styles.scss';
import { PERMISSIONS } from '../../constants';
import { useSelector } from 'react-redux';
import AdminView from './helpers/AdminView';
import TeacherView from './helpers/TeacherView';

export default function Users() {

  const user = useSelector(state => state.user);

  if(user.permission === PERMISSIONS.ADMIN)
  return (<AdminView user={user}/>)

  if(user.permission === PERMISSIONS.TEACHER)
  return (<TeacherView user={user}/>)
}
