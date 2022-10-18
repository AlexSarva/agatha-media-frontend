import './Sign.css';
import '../../../styles/Button.css'
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../../hook/useAuth';

function Signin(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {signin} =  useAuth();

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

   function handleSubmit(e) {
        e.preventDefault();
        console.log(email, password);
        signin({email, password}, () => navigate('/', {replace: true}));
    }

    return (
        <div className="sign">
            <div className="sign__description">
                <h2 className="sign__subtitle">анализ СМИ и социальных медиа</h2>
                <h1 className="sign__title">AGATHA-Media</h1>
            </div>
            <div className="sign__container">
                <h3 className="sign__welcome">Добро пожаловать!</h3>
                <p className="sign__invite">Введите адрес электронной почты и пароль для входа</p>
                <div className="sign__mini-container sign__mini-container_signin">
                    <form className="sign__form" onSubmit={handleSubmit}>
                        <div className="sign__input-container">
                            <label className="sign__label" htmlFor="email">Почта</label>
                            <input id="email" name="email" type="email" className="sign__input" value={email}
                                   onChange={handleChangeEmail} placeholder="Адрес электронной почты" required minLength="8" maxLength="40"/>
                        </div>
                        <div className="sign__input-container">
                            <label className="sign__label" >Пароль</label>
                            <input id="password" name="password" type="password" className="sign__input" value={password}
                                   onChange={handleChangePassword} placeholder="Введите пароль" required minLength="6" maxLength="40"/>
                        </div>
                        <div className="sign__button-container">
                            <button type="submit" onSubmit={handleSubmit} className="sign__link">Войти</button>
                        </div>
                    </form >
                    <div className="sign__login">
                        <span>Еще не зарегистрированы?</span>
                        <Link to="/register" className="sign__login-link">Регистрация</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin;