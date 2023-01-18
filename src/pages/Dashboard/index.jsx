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




function Dashboard() {

    const sidebarState = useSelector((state) => state.sidebar.isOpen);
    const { view } = useParams();
    usePermissions();

    return (
        <div className='dashboard'>
            <Header/>
            <Sidebar isOpen={sidebarState} />
            <div className='view-container'>
                { view === ROUTES.USERS && <UsersView/> }
                { view === ROUTES.LANGUAGES && <LanguagesView/> }
                { view === ROUTES.LEVELS && <LevelsView/> }
                { view === ROUTES.GROUPS && <GroupsView/> }
                { view === ROUTES.QUESTIONNARIES && <QuestionnariesView/> }
                { view === ROUTES.QUESTIONS && <QuestionsView/> }
                { view === ROUTES.QUESTION && <QuestionView/> }
                { view === ROUTES.PROFILE && <ProfileView/> }
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