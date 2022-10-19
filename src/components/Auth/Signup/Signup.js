import '../Signin/Sign.css';
import '../../../styles/Button.css'
import {signLogos} from '../../../utils/constants';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../../hook/useAuth';

function Signup(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const {signup} =  useAuth();

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleChangeUsername(e) {
        setUsername(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        signup({username, email, password}, () => navigate('/', {replace:true}));
    }

    return (
        <div className="sign">
            <div className="sign__description">
                <h2 className="sign__subtitle">анализ СМИ и социальных медиа</h2>
                <h1 className="sign__title">AGATHA-Media</h1>
            </div>
            <div className="sign__container">
                <h3 className="sign__welcome">Добро пожаловать!</h3>
                <div className="sign__mini-container">
                    <h3 className="sign__form-title">Регистрация</h3>
                    <ul className="sign__form-alternatives">
                        {signLogos.map((item,n) => (
                            <li key={n} className="sign__type button">
                                <img className="sign__logo" src={item.icon} alt={item.name}></img>
                            </li>
                        ))}
                    </ul>
                    <span className="sign__form-gap">или</span>
                    <form className="sign__form" onSubmit={handleSubmit}>
                        <div className="sign__input-container">
                            <label className="sign__label" htmlFor="username">Логин</label>
                            <input id="username" name="username" type="text" className="sign__input" value={username}
                               onChange={handleChangeUsername} placeholder="Ваше имя пользователя" required minLength="6" maxLength="40"/>
                        </div>
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
                            <button type="submit" onSubmit={handleSubmit} className="sign__link">Зарегистрироваться</button>
                        </div>
                    </form >
                    <div className="sign__login">
                        <span>Уже зарегистрированы?</span>
                        <Link to="/login" className="sign__login-link">Войти</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;