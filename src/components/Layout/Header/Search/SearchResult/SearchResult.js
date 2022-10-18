import React from 'react';

function SearchResult(props) {

    function handleClick() {
        props.onClick(props.item);
    }

    return (
        <li className="search__result-element">
            <button type="button" onClick={handleClick} className="search__result-btn" >
                <p className="search__result-title">{props.item.title}</p>
                <p className="search__result-url">{props.item.url}</p>
            </button>
        </li>
    )
}

export default SearchResult