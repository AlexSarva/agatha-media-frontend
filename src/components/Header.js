import Logo from './Logo';
import sidebarOpenedIcon from '../images/sidebar/sidebar-wide.svg';
import sidebarClosedIcon from '../images/sidebar/sidebar-narrow.svg';
import Search from './Search';
import '../styles/Button.css';
import '../styles/Header.css';
import User from './User';

function Header(props) {

    return (
        <div className={`header`}>
            <button type="button" onClick={props.onClickSidebar} className="header__sidebar-toggle button"
                    value="sidebar" name="sidebar-toggle"
                    style={{backgroundImage: `${props.sidebarState ? `url(${sidebarOpenedIcon})` : `url(${sidebarClosedIcon})`}`}}></button>

            <Logo />
            <Search onSubmitSearch={props.onSubmitSearch}/>
            <User  />
        </div>
    )
}

export default Header