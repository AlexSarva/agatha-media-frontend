import PopupWithForm from '../PopupWithForm';
import {useRef, useEffect} from 'react';
import {useAuth} from '../../../hook/useAuth';
import api from '../../../utils/api';

function SaveGraphPopup(props) {

    const {token} = useAuth();

    const description = useRef();

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        let graphInfo = props.graphInfo;
        graphInfo.description = description.current.value;

        api.addNewGraph(graphInfo, token)
            .then((res) => {
                props.onClose();
                props.onSaveYes(res);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
                props.onClose();
                props.onSaveNo();
            })
    }

    useEffect(() => {
        description.current.value = '';
    },[props.graphInfo])

    useEffect(() => {
        function handleEscapeKey(evt) {
            if (evt.key === 'Escape') {
                props.onClose();
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [])

    return (
        <PopupWithForm isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}
                       title="Сохранить граф"
                       saveBtn="Сохранить" name="newGraph" children={
            <fieldset className="popup__field-set">
                <label className="popup__label">
                    <input ref={description}  type="text" className="popup__field"
                           placeholder="Как назовем?"
                           required
                           name="about" minLength="2" maxLength="200"/>
                    <span className="popup__field-error about-error"></span>
                </label>
            </fieldset>}/>
    )
}

export default SaveGraphPopup;