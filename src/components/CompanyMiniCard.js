import {Link, useLocation} from 'react-router-dom';
import React from 'react';

function CompanyMiniCard(props) {

    const location = useLocation();

    const handleDelete = () => {
        props.onDelete(props.item);
    }

    return (
        <li key={props.item.inn} className="companies__element">
            <button type="button" onClick={handleDelete} className="companies__delete-btn button"
                    value="delete" name="delete-btn"></button>
            <Link className="companies__link" to={location.pathname + "/" + props.item.inn} state={{from: location}} >
                <img className="companies__icon" src={props.item.icon} alt="dash"/>
                <div className="companies__block">
                    <span className={`companies__inn`}>{props.item.inn}</span>
                    <span className={`companies__text`}>{props.item.title}</span>
                </div>
            </Link>
        </li>
    )
}

export default CompanyMiniCard;