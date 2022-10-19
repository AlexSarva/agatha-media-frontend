import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../../hook/useAuth';

function GraphCard(props) {

    const {token} = useAuth();
    const dateOptions = {year: 'numeric', month: 'short', day: 'numeric' };
    const created = new Date(Date.parse(props.cardData.created));

    function handleCardClick(e) {
        if (e.target.value !== "Удалить") {
            props.onCardClick(props.cardData.graph_id, token);
        }
    }

    function deleteCard(e) {
        if (e.target.value === "Удалить") {
            props.onDelete(props.cardData.graph_id);
        }
    }

    return (
        <div onClick={handleCardClick} className="graph fade fade_type_in" id={props.cardData.graph_id}>
            <h3 className="graph__description">{props.cardData.description}</h3>
            <p className="graph__nodes-cnt">Количество узлов: {props.cardData.cnt}</p>
            <p className="graph__created">Дата сохранения: </p>
            <p className="graph__created">{created.toLocaleDateString('ru-RU', dateOptions)}</p>
            <button onClick={deleteCard} type="button" value="Удалить"
                    className={`graph__delete button`}
                    name="delete-btn"></button>
        </div>
    )
}

export default GraphCard