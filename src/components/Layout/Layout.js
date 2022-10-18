import {Outlet} from 'react-router-dom';
import SideBar from './Sidebar/SideBar';
import React from 'react';
import Header from './Header/Header';

function Layout(props) {
    return(
        <>
            <Header sidebarState={props.sidebarState}
                    onClickSidebar={props.onClickSidebar}
                    onSubmitSearch={props.onSubmitSearch}
            />
            <SideBar sidebarState={props.sidebarOpened} />
            <main className={`page__content ${props.sidebarOpened ? 'page__content_type_narrow' : 'page__content_type_wide'}`}>
                <Outlet />
            </main>
        </>
    )
}

export default Layout;