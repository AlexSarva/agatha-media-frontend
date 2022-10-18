import '../../../styles/User.css';
import '../../../styles/Button.css'
import {useEffect, useState} from 'react';
import {firstLetter} from '../../../utils/constants';
import {useAuth} from '../../../hook/useAuth';
import {useNavigate} from 'react-router-dom';

function User() {
    const [initial, setInitial] = useState('');
    const {user, signout} = useAuth();
    const navigate = useNavigate();

    function handleExit() {
        signout(() => navigate('/login', {replace:true}))
    }

    useEffect(()=> {
        const letter = firstLetter(user ? user.username : null);
        setInitial(letter);
    },[user])

    return (
        <div className="user">
            <div className="user__avatar">
                <span className="user__initial">{initial}</span>
            </div>
            <div className="user__container">
                <p className="user__name">{ user ? user.username : ''}</p>
                <button onClick={handleExit} type="button" className="user__exit-btn button"
                        value="Выйти" name="exit-btn">Выйти
                </button>
            </div>
        </div>
    )
}

export default User;