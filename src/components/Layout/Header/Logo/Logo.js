import './Logo.css';
import {useNavigate} from 'react-router-dom';

function Logo(props) {

    const navigate = useNavigate();

    function handleClick() {
        navigate('/', {replace: true});
    }

    return (
        <div onClick={handleClick} className="logo"></div>
    )
}

export default Logo;