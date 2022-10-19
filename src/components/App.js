import React, {useState} from 'react';
import Main from './Main/Main';
import api from '../utils/api';
import '../styles/Page.css'
import Signup from './Auth/Signup/Signup';
import Signin from './Auth/Signin/Signin';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Layout from './Layout/Layout';
import {RequireAuth} from '../hoc/RequireAuth';
import {AuthProvider} from '../hoc/AuthProvider';
import SaveGraphPopup from './Popup/SaveGraphPopup/SaveGraphPopup';
import {v4 as uuid} from 'uuid';
import InfoTooltip from './Popup/InfoTooltip/InfoTooltip';
import Graphs from './Graphs/Graphs';

function App() {
    const navigate = useNavigate();
    const [isSaveGraphPopup, setIsSaveGraphPopup] = useState({
        show: false,
        sources: null
    });
    const [isGraphTooltipOpen, setIsGraphTooltipOpen] = useState({
        show: false,
        correct: false
    });
    const [sidebarOpened, setSidebarOpened] = useState(true);
    const [srcsList, setSrcsList] = useState([]);
    const [graph, setGraph] = useState({
        nodes: [],
        edges: []
    });

    function closePopup() {
        setIsSaveGraphPopup({
            show: false,
            sources: null
        });
        setIsGraphTooltipOpen({
            show: false,
            correct: false
        })
    }

    function clearGraphData() {
        setGraph({
            nodes: [],
            edges: []
        });
        setSrcsList([]);
    }

    function handleGraphTooltipOpenYes(data) {
        setIsGraphTooltipOpen({...isGraphTooltipOpen,
            show: true,
            correct: true,
            data: data})
        clearGraphData();
    }

    function handleGraphTooltipOpenNo() {
        setIsGraphTooltipOpen({...isGraphTooltipOpen, show: true, correct: false})
    }

    function handleNewGraph(graphInfo) {
        console.log("Открывает попап");
        console.log(graphInfo);
        setIsSaveGraphPopup({
            show: true,
            sources: graphInfo,
            uuid: uuid(),
        });
    }

    function handleSidebar() {
        setSidebarOpened(!sidebarOpened);
    }

    function handleNewSource(srcs) {
        if (!srcsList.some(elem => elem.id === srcs.id)) {
            setSrcsList([...srcsList, srcs]);
        }
    }

    function handleGetGraphInfo({query}) {
        Promise.all([api.getGraphByURL(query), api.getSourceByURL(query)])
            .then(([graphData, srcsInfo]) => {
                setGraph({
                        ...graph,
                    nodes: graphData.nodes,
                    edges: graphData.edges,
                    }
                );
                setSrcsList([srcsInfo]);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
        console.log(query);
    }

    function handleGetGraphByUUID(graph_id, token) {
        api.getGraphByUUID(graph_id, token)
            .then((graphData) => {
                setGraph({
                        ...graph,
                        nodes: graphData.nodes,
                        edges: graphData.edges,
                    }
                );
                setSrcsList(graphData.nodes_list);
            })
            .then(() => {
                navigate('/', {replace: true})
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    return (
        <AuthProvider>
            <div className="page">
                <Routes>
                    <Route path="/" element={<RequireAuth />}>
                        <Route path="/" element={
                            <Layout sidebarOpened={sidebarOpened}
                                    onClickSidebar={handleSidebar}
                                    onSubmitSearch={handleGetGraphInfo}
                            />
                        }>
                            <Route index element={<Main
                                                        graphData={graph}
                                                        srcsData={srcsList}
                                                        onNewSource={handleNewSource}
                                                        onAddNewGraph={handleNewGraph}
                                                        onClearData={clearGraphData}
                            />}/>
                            <Route path="graphs" element={<Graphs onCardClick={handleGetGraphByUUID}/>}/>
                            {/*<Route path="company/:id" element={<Company />}/>*/}
                            {/*<Route path="govs" element={<Companies orgsList={govsList} />}/>*/}
                            {/*<Route path="govs/:id" element={<Company />}/>*/}
                        </Route>
                    </Route>
                    <Route path="/register" element={<Signup />} />
                    <Route path="/login" element={<Signin />} />
                </Routes>
            </div>
            <SaveGraphPopup isOpen={isSaveGraphPopup.show}
                            onClose={closePopup}
                            graphInfo={isSaveGraphPopup}
                            onSaveYes={handleGraphTooltipOpenYes}
                            onSaveNo={handleGraphTooltipOpenNo}
            />
            <InfoTooltip
                         isOpen={isGraphTooltipOpen.show}
                         name={"tooltip"}
                         onClose={closePopup}
                         correct={isGraphTooltipOpen.correct}
                         data={isGraphTooltipOpen}
            />
        </AuthProvider>
    );
}

export default App;
