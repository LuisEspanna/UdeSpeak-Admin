import React from 'react';
import './dashboard.scss';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { useSelector } from 'react-redux';
import usePermissions from '../../hooks/usePermissions';
import { DashboardProvider} from '../../context/dashboard-context';
import { useParams } from "react-router-dom";
//Views
import UsersView from '../../views/users/UsersView';
import LanguagesView from '../../views/languages/LanguagesView';
import LevelsView from '../../views/levels/LevelsView';
import GroupsView from '../../views/groups/GroupsView';
import QuestionnariesView from '../../views/questionnaries/QuestionnariesView';
import QuestionsView from '../../views/questions/QuestionsView';
import QuestionView from '../../views/question/QuestionView';
import { ROUTES } from '../../constants';
import ProfileView from '../../views/profile/ProfileView';
import DashboardView from '../../views/dashboard/DashboardView';
import NotFound404 from '../NotFound404/NotFound404';
import BugsView from '../../views/bugs/BugsView';

function Dashboard() {

    const sidebarState = useSelector((state) => state.sidebar.isOpen);
    const { view } = useParams();
    const { isAdmin, isTeacher, isStudent} = usePermissions();

    return (
        <div className='dashboard' id='dashboard'>
            <Header/>
            <Sidebar isOpen={sidebarState} />
            <div className='view-container'>
                { view === ROUTES.USERS && <UsersView/> }
                { view === ROUTES.LANGUAGES && <LanguagesView/> }
                { view === ROUTES.LEVELS && <LevelsView/> }
                { view === ROUTES.GROUPS && (isAdmin || isTeacher) && <GroupsView/> }
                { view === ROUTES.QUESTIONNARIES && <QuestionnariesView/> }
                { view === ROUTES.QUESTIONS && (isAdmin || isTeacher) && <QuestionsView/> }
                { view === ROUTES.QUESTION && (isAdmin || isTeacher) && <QuestionView/> }
                { view === ROUTES.PROFILE && <ProfileView/> }
                { view === ROUTES.BUGS && <BugsView/> }
                { (view === undefined && !isStudent) && <DashboardView/> }
                { (view === ROUTES.GROUPS || view === ROUTES.QUESTIONNARIES || view === ROUTES.QUESTIONS || view === ROUTES.QUESTION || view === ROUTES.DASHBOARD || view === undefined) && isStudent && <NotFound404/> }
            </div>
        </div>
    )
}

export default function ContextDashboard () {
    return (
        <DashboardProvider>
            <Dashboard/>
        </DashboardProvider>
    )
}