import '../styles/Sidebar.css';
import '../styles/Navi.css';
import React from 'react';
import Navi from './Navi';

function SideBar(props) {
    return (
        <div className={`sidebar ${props.sidebarState ? 'sidebar_type_wide' : 'sidebar_type_narrow'}`}>
            <Navi sidebarState={props.sidebarState}/>
        </div>
    )
}

export default SideBar;