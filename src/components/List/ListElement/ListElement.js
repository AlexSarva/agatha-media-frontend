import React from 'react';
import {Link} from 'react-router-dom';

function ListElement(props) {

    function handleClickElement() {
        console.log(props.description);
    }

    return (
        <li onClick={handleClickElement} className="list-element">
            <div className={"list-element__label"}>{props.description.label}</div>
            <div className={"list-element__title"}>{props.description.title}</div>
        </li>
    )
}

export default ListElement;