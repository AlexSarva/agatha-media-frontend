import './Sidebar.css';
import './Navi/Navi.css';
import React from 'react';
import Navi from './Navi/Navi';

function SideBar(props) {
    return (
        <div className={`sidebar ${props.sidebarState ? 'sidebar_type_wide' : 'sidebar_type_narrow'}`}>
            <Navi sidebarState={props.sidebarState}/>
        </div>
    )
}

export default SideBar;