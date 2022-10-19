import React, {useEffect, useRef, useState} from 'react';
import api from '../../../utils/api';
import { Network } from "vis-network";

const options = {
    height: "calc(100vh - 110px)",
    nodes: {
        shape: "dot",
        scaling: {
            min: 10,
            max: 30,
        },
        font: {
            size: 18,
            face: "Tahoma",
            color: "rgb(250,226,217)",
        },
    },
    edges: {
        color: "rgba(43,44,79,0.75)",
        width: 1.3,
        arrows: {
            to: {
                enabled: true,
                type: "arrow",
            }
        },
        smooth: {
            type: "continuous",
        },
    },
    physics: {
        stabilization: false,
        barnesHut: {
            gravitationalConstant: -80000,
            springConstant: 0.04,
            springLength: 150,
            // damping: 0.1,
        },
    },
    interaction: {
        tooltipDelay: 200,
        hideEdgesOnDrag: true,
    },
};



const NetworkGraphNew = (props) => {
    const [allNodes, setAllNodes] = useState([]);
    const [allEdges, setAllEdges] = useState([]);
    const [graph, setGraph] = useState({
        nodes: [],
        edges: []
    });
    const visJsRef = useRef(null);
    const network = useRef(null);

    function handleNewSource(srcs) {
        props.onNewSource(srcs);
    }

    function handleUpdateGraphInfo(query) {
        Promise.all([api.getGraphByID(query), api.getSourceByID(query)])
            .then(([graphInfo, srcsInfo]) => {
                handleNewSource(srcsInfo);
                setAllNodes((state) => state.filter((oldNode) => oldNode.id.toString() !== query.toString()));

                let allNodesIds = []
                allNodes.filter((oldNode) => oldNode.id.toString() !== query.toString()).forEach(elem => {
                    allNodesIds.push(elem.id.toString());
                });
                const toRemove = new Set(allNodesIds);

                const difference = graphInfo.nodes.filter( x => !toRemove.has(x.id.toString()) );

                setAllNodes((allNodes) => [...allNodes, ...difference]);
                setAllEdges((allEdges) => [...allEdges, ...graphInfo.edges]);

            })
            .then((res) => {
                network.current = createGraph(graph);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
        console.log(query);
    }

    function createGraph(data) {
        const curNetwork =
            visJsRef.current &&
            new Network(visJsRef.current, data, options);
        curNetwork.on("doubleClick", (e) => {
            handleUpdateGraphInfo(e.nodes[0]);
        })
        return curNetwork
    }

    useEffect(() => {
        setAllNodes(props.graphData.nodes);
        setAllEdges(props.graphData.edges);
        setGraph({
            ...graph,
            nodes: props.graphData.nodes,
            edges: props.graphData.edges,
        });
    },[props.graphData])

    useEffect(() => {
        setGraph({
            ...graph,
            nodes: allNodes,
            edges: allEdges,
        })
    },[allNodes, allEdges])

    useEffect(() => {
        network.current = createGraph(graph);
    },[graph]);

    return (
        <div className="main__graph" ref={visJsRef} />
    );

}

export default NetworkGraphNew;