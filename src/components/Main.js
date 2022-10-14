import '../styles/Main.css';
import {Link, NavLink} from 'react-router-dom';
import NetworkGraph from './NetworkGraph';
import React, {useState} from 'react';
// import ReGraphTest from './ReGraphTest';
import NetworkGraphNew from './NetworkGraphNew';
import {navigationMap} from '../utils/constants';

function Main(props) {

    console.log(props.graphData)

    return (
        <div className={`main`} >
            <div className="main__container">
                <ul className="main__list">
                    {props.srcsData.map((item,n) => (
                        <li key={n} className="main__element">
                            <div>{item.id}</div>
                            <div>{item.title}</div>
                            <div>{item.label}</div>
                        </li>
                    ))}
                </ul>
                {/*<NetworkGraph graphData={props.graphData} />*/}
                <NetworkGraphNew graphData={props.graphData} onNewSource={props.onNewSource}/>
            </div>
            {/*<Link to="/company" >Переход</Link>*/}
        </div>
    )
}

export default Main;