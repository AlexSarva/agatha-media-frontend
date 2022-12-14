import React, {useRef, useState} from 'react';
import './Search.css';
import api from '../../../../utils/api';
import {useNavigate} from 'react-router-dom';
import SearchResult from './SearchResult/SearchResult';


function Search(props) {
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([{},]);
    const [searchPopup, setSearchPopup] = useState(false);
    const searchValue = useRef();

    function handleSearchRes(res) {
        setQuery(res.url);
        setSearchPopup(false);
        searchValue.current.focus();
    }

    function handleQuery(e) {
        setQuery(e.target.value);
        if (e.target.value.length >= 3) {
            api.getSearch(e.target.value)
                .then((res) => {
                    setSearchResult(res);
                    setSearchPopup(true);
                })
                .catch((err) => {
                    console.log(err);
                    setSearchPopup(false);
                })
        }
        setSearchPopup(false);
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
        setSearchPopup(false);
        navigate('/', {replace: true});

    }

    return (
        <div className={`search search_type_wide`}>
            <div className={`search__icon ${active && 'search__icon_hidden'}`}></div>
            <form onSubmit={handleSubmit}
                  className="search__form"
                  name="search-form" noValidate>
                <fieldset className="search__field-set">
                    <input ref={searchValue} value={query} type="text" className="search__input" onChange={handleQuery}
                           placeholder="Наименование источника или ссылка"
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