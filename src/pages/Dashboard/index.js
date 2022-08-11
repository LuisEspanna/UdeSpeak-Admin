import React from 'react';
import './dashboard.scss';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { useSelector } from 'react-redux';
import usePermissions from '../../hooks/usePermissions';
import { DashboardProvider} from '../../context/dashboard-context';
import { useParams } from "react-router-dom";
//Views
//import LevelsAndGroupsView from '../../views/levelsAndGroups/LevelsAndGroups';
import UsersView from '../../views/users/UsersView';



function Dashboard() {

    const sidebarState = useSelector((state) => state.sidebar.isOpen);
    const { view } = useParams();
    usePermissions();

    return (
        <div className='dashboard'>
            <Header/>
            <Sidebar isOpen={sidebarState} />
            <div className='view-container'>
                { view === 'users' && <UsersView/> }
                { view === 'language' && <div>Idiomas</div> }
                { view === 'auth' && <div>Auth</div> }
                { view === 'levelsandgroups' && <div>levelsandgroups</div> }
                { view === 'questionnaires' && <div>questionnaires</div> }
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