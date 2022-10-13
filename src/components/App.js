import React, {useState} from 'react';
import Main from './Main';
import api from '../utils/api';
import '../styles/Page.css'
import Signup from './Signup';
import Signin from './Signin';
import {Link, Route, Routes} from 'react-router-dom';
import Layout from './Layout';
import {RequireAuth} from '../hoc/RequireAuth';
import {AuthProvider} from '../hoc/AuthProvider';
import {myGraphData} from '../utils/constants';

function App() {
    const [sidebarOpened, setSidebarOpened] = useState(true);
    const [searchValue, setSearchValue] = useState({query: ''});
    const [graph, setGraph] = useState({
        nodes: [],
        edges: []
    });



    function handleSidebar() {
        setSidebarOpened(!sidebarOpened);
    }

    function handleGetGraphInfo({query}) {
        api.getGraphByURL(query)
            .then(({nodes, edges}) => {
                setGraph({
                        ...graph,
                    nodes,
                    edges
                    }
                )
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
        console.log(query);
    }

    return (
        <AuthProvider>
            <div className="page">
                <Routes>
                    <Route path="/" element={<RequireAuth />}>
                        <Route path="/" element={
                            <Layout sidebarOpened={sidebarOpened}
                                    onClickSidebar={handleSidebar}
                                    onSubmitSearch={handleGetGraphInfo}/>
                        }>
                            <Route index element={<Main searchValue={searchValue}
                                                        graphData={graph}
                            />}/>
                            {/*<Route path="company" element={<Companies orgsList={companiesList} />}/>*/}
                            {/*<Route path="company/:id" element={<Company />}/>*/}
                            {/*<Route path="govs" element={<Companies orgsList={govsList} />}/>*/}
                            {/*<Route path="govs/:id" element={<Company />}/>*/}
                        </Route>
                    </Route>
                    <Route path="/register" element={<Signup />} />
                    <Route path="/login" element={<Signin />} />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
