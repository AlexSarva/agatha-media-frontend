import {navigationMap} from '../utils/constants';
import {NavLink} from 'react-router-dom';
import React from 'react';

function Navi(props) {

    const isActive = ({isActive}) => isActive ? 'navigation__link navigation__link_active' : 'navigation__link';

    return (
        <nav className="navigation">
            <ul className="navigation__container">
                {navigationMap.map((item,n) => (
                    <li key={n} className="navigation__element">
                        <NavLink className={isActive} to={item.path}>
                            <img className="navigation__icon" src={item.icon} alt="dash"/>
                            <span className={`navigation__text ${!props.sidebarState && 'navigation__text_hidden'}`}>{item.title}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navi;