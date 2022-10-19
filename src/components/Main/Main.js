import './Main.css';
import React from 'react';
import NetworkGraphNew from './NetworkGraph/NetworkGraphNew';
import List from '../List/List';

function Main(props) {

    return (
        <div className={`main`} >
            <div className="main__container">
                {!props.srcsData.length && <h3 className={"main_title"}>Введите в поле поиска Наименование источника или ссылку</h3>}
                {props.srcsData.length > 0 &&
                    <>
                        <List srcsData={props.srcsData}
                              onAddNewGraph={props.onAddNewGraph}
                              onClearData={props.onClearData}
                        />
                        {/*<NetworkGraph graphData={props.graphData} />*/}
                        <NetworkGraphNew graphData={props.graphData} onNewSource={props.onNewSource}/>
                    </>
                }
            </div>
            {/*<Link to="/company" >Переход</Link>*/}
        </div>
    )
}

export default Main;