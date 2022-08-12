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
import Languages from '../../views/languages/Languages';
import LevelsAndGroupsView from '../../views/levelsAndGroups/LevelsAndGroups';




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
                { view === 'languages' && <Languages/> }
                { view === 'auth' && <div>Auth</div> }
                { view === 'levelsandgroups' && <LevelsAndGroupsView/> }
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