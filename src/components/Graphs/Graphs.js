import './../../styles/fade/_type/_in/fade_type_in.css';
import './Graphs.css';
import {useAuth} from '../../hook/useAuth';
import api from '../../utils/api';
import {useEffect, useState} from 'react';
import {signLogos} from '../../utils/constants';
import GraphCard from './GraphCard/GraphCard';

function Graphs(props) {

    const {token} = useAuth();
    const [cards, setCards] = useState([]);

    function handleDeleteCard(graph_id) {
        api.deleteGraphCard(graph_id, token)
            .then((res) => {
                setCards((state) => state.filter((oldCard) => oldCard.graph_id !== graph_id));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleCards() {
        api.getGraphCards(token)
            .then((res) => {
                setCards(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        handleCards();
    },[])

    return (
        <div className={`graphs`} >
            {!cards && <h2 className="graphs__no-data">У вас еще нет ни одного графа</h2>}
            <div className="graphs__container">
                {cards && cards.map((item,n) => (
                        <GraphCard key={n} cardData={item} onDelete={handleDeleteCard} onCardClick={props.onCardClick}/>
                    )) }

            </div>
        </div>
    )
}

export default Graphs;