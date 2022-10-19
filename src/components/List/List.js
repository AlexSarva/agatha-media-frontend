import ListElement from './ListElement/ListElement';
import React from 'react';
import './List.css';

function List(props) {

    function handleClearData() {
        props.onClearData();
    }

    function handleAddNewGraph() {
        let data = [];
        props.srcsData.forEach((item, num) => {
            const elem = {
                id: item.id,
                num: num
            }
            data.push(elem);
        })
        props.onAddNewGraph(data);
    }

    return (
        <div className="list">
            <div className={"list__buttons-container"}>
                {props.srcsData.length > 0 && <button type="button" onClick={handleAddNewGraph} className="list-elements__save-btn">Сохранить</button>}
                {props.srcsData.length > 0 && <button type="button" onClick={handleClearData} className="list-elements__clear-btn"></button>}
            </div>
            <ul className="list-elements">
                {props.srcsData.map((item,n) => (
                    <ListElement key={n} description={item} />
                ))}
            </ul>
        </div>
    )
}

export default List;