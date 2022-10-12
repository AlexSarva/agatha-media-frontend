import '../styles/Company.css';
import '../styles/Button.css';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

function Company(props) {

    const location = useLocation();
    const {id} = useParams();
    const navigate = useNavigate();
    console.log(id);
    const fromPage = location.state?.from?.pathname || '';
    console.log(fromPage);

    const handleBack = () => navigate(fromPage);

    return (
        <section className="company">
            <div className="company__element company__element_type_card">Карточка организации {id}</div>
            <div className="company__element company__element_type_map">Карта</div>
            <div className="company__element company__element_type_dynamic">Динамика</div>
            <div className="company__element company__element_type_donut">Пайчарт</div>
            <div className="company__element company__element_type_graph">График</div>
            <div className="company__element company__element_type_coub">Куб графика</div>
            <button type="button" className="company__element company__element_type_button button"
                    value="add-or-remove" name="company-toggle">Добавить в мой список</button>
            <button type="button" onClick={handleBack} className="company__element company__element_type_back button"
                    value="back" name="back-btn">Назад</button>
        </section>
    )
}

export default Company;