import './InfoTooltip.css';
import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

function InfoTooltip(props) {

    const className = `popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`;
    const dateOptions = {year: 'numeric', month: 'short', day: 'numeric' };
    const [date, setDate] = useState('говно');
    const navigate = useNavigate()

    function handleGoToGraphs() {
        props.onClose();
        navigate('graphs', {replace: true});
    }

    useEffect(() => {
        if (props.data.hasOwnProperty("data")) {
            let savedDate = new Date(Date.parse(props.data.data.created));
            const stringDate = savedDate.toLocaleDateString('ru-RU', dateOptions);
            setDate(stringDate);
        }
        function handleEscapeKey(evt) {
            if (evt.key === 'Escape') {
                props.onClose();
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [props.data])

    return (
        <div className={className}>
            <div className={`popup__container popup__container_type_${props.name}`}>
                <div
                    className={`popup__tooltip-image ${props.correct ? 'popup__tooltip-image_type_yes' : 'popup__tooltip-image_type_no'}`}></div>
                <h3 className="popup__tooltip-text">{props.correct ? `"${props.data.data.description || ''}" успешно сохранен ${date}` : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
                <Link to={"graphs"} onClick={handleGoToGraphs} className="popup__tooltip-link">перейти в Мои Графы</Link>
                <button type="button" onClick={props.onClose} className="popup__close-btn button" value="Закрыть"
                        name="close-btn"></button>
            </div>
        </div>
    )
}

export default InfoTooltip;