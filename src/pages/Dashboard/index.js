import React from 'react'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import LevelsAndGroups from '../../views/LevelsAndGroups'
import { useSelector } from 'react-redux'
import './dashboard.scss'


export default function Dashboard() {

    const sidebarState = useSelector((state) => state.sidebar.isOpen)

    return (
        <div className='dashboard'>
            <Header />
            <Sidebar isOpen={sidebarState} />
            <div className='view-container'>
              <LevelsAndGroups/>
            </div>
        </div>
    )
}
