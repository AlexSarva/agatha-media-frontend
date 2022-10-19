import React from 'react';

function ListElement(props) {

    return (
        <li className="list-element">
            <div className={"list-element__label"}>{props.description.label}</div>
            <div className={"list-element__title"}>{props.description.title}</div>
        </li>
    )
}

export default ListElement;