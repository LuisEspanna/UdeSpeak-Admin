import React from 'react';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { useSelector } from 'react-redux';
import './dashboard.scss';
import usePermissions from '../../hooks/usePermissions';

//Views
//import LevelsAndGroupsView from '../../views/levelsAndGroups/LevelsAndGroups';
import UsersView from '../../views/users/UsersView';

import { DashboardProvider} from '../../context/dashboard-context';

function Dashboard() {

    const sidebarState = useSelector((state) => state.sidebar.isOpen);
    usePermissions();

    return (
        <div className='dashboard'>
            <Header/>
            <Sidebar isOpen={sidebarState} />
            <div className='view-container'>
              <UsersView/>
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