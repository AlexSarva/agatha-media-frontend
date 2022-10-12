import '../styles/Companies.css';
import '../styles/Button.css';
import React, {useEffect, useState} from 'react';
import CompanyMiniCard from './CompanyMiniCard';
import PopupWithForm from './PopupWithForm';

function Companies(props) {

    const [orgs, setOrgs] = useState([]);
    const [isDeleteCardPopup, setIsDeleteCardPopup] = useState({
        show: false,
        card: null
    });

    useEffect(() => {
        setOrgs(props.orgsList)
    },
        [orgs])

    const handleDeleteConfirm = (card) => {
        console.log({
            show: true,
            card: card,
        });
        setIsDeleteCardPopup({
            show: true,
            card: card,
        });
    }

    const handleDeleteSubmit = (e) => {
        e.preventDefault();

        if (isDeleteCardPopup.show) {
            setOrgs((state) => state.filter((oldCard) => oldCard.inn !== isDeleteCardPopup.card.inn));
            setIsDeleteCardPopup({
                show: false,
                card: null,
            });
        }
    };

    function closeAllPopups() {
        setIsDeleteCardPopup({
            show: false,
            card: null
        });
    }

    return (
        <section className="companies">
            <ul className="companies__list">
                {orgs.map((item,n) => (
                    <CompanyMiniCard key={n} item={item} onDelete={handleDeleteConfirm}/>
                ))}
            </ul>
            <PopupWithForm isOpen={isDeleteCardPopup.show}
                           onClose={closeAllPopups}
                           onSubmit={handleDeleteSubmit}
                           title="Вы уверены?"
                           saveBtn="Да"
                           name="delete-card"/>
        </section>
    )
}

export default Companies;