import './Main.css';
import {Link, NavLink} from 'react-router-dom';
import React, {useState} from 'react';
import NetworkGraphNew from './NetworkGraph/NetworkGraphNew';
import List from '../List/List';

function Main(props) {

    return (
        <div className={`main`} >
            <div className="main__container">
                <List srcsData={props.srcsData}
                      onAddNewGraph={props.onAddNewGraph}/>
                {/*<NetworkGraph graphData={props.graphData} />*/}
                {props.srcsData.length > 0 && <NetworkGraphNew graphData={props.graphData} onNewSource={props.onNewSource}/>}
            </div>
            {/*<Link to="/company" >Переход</Link>*/}
        </div>
    )
}

export default Main;