import '../styles/Main.css';
import {Link} from 'react-router-dom';
import NetworkGraph from './NetworkGraph';
import {useState} from 'react';

function Main(props) {

    console.log(props.graphData)

    return (
        <div className={`main`} >
            <div className="main__container">
                {/*<button onClick={props.onLoadBnt} type="button" className=" button"*/}
                {/*        value="loadGraph" name="loadGraph-btn">Загрузить</button>*/}
                <NetworkGraph graphData={props.graphData} />
            </div>
            <Link to="/company" >Переход</Link>
        </div>
    )
}

export default Main;