import React, {useState} from 'react';
import '../styles/Search.css';
import api from '../utils/api';
import {navigationMap} from '../utils/constants';
import {NavLink} from 'react-router-dom';
import SearchResult from './SearchResult';


function Search(props) {

    const [active, setActive] = useState(false);
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([{},]);
    const [searchPopup, setSearchPopup] = useState(false);

    function activeSearch() {
        setActive(true);
    }

    function inactiveSearch() {
        setActive(false);
    }

    function handleSearchRes(res) {
        console.log(res);
        setQuery(res.url);
        setSearchPopup(false);
    }

    function handleQuery(e) {
        setQuery(e.target.value);
        if (e.target.value.length >= 3) {
            api.getSearch(e.target.value)
                .then((res) => {
                    console.log(res);
                    console.log(searchResult);
                    setSearchResult(res);
                    setSearchPopup(true);
                })
                .catch((err) => {
                    console.log(err);
                    setSearchPopup(false);
                })
        }
        setSearchPopup(false);
        console.log(e.target.value, e.target.value.length);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onSubmitSearch({
            query: query
        });

        setQuery('');
        setActive(false);
    }

    return (
        <div className={`search search_type_wide`}>
            <div className={`search__icon ${active && 'search__icon_hidden'}`}></div>
            <form onSubmit={handleSubmit}
                  className="search__form"
                  name="search-form" noValidate>
                <fieldset className="search__field-set">
                    <input value={query} type="text" className="search__input" onChange={handleQuery}
                           placeholder="Ссылка на источник"
                           required
                           name="search-input"/>
                </fieldset>
                {(searchPopup && searchResult) && <ul className="search__result-container">
                    {searchResult.map((item) => (
                        <SearchResult key={item.id} item={item} onClick={handleSearchRes}/>
                    ))}
                </ul>}
            </form>
        </div>
    )
}

export default Search;