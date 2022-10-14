// import Graph from "react-graph-vis";
import React, {useEffect, useRef, useState} from 'react';
// import {v4 as uuidv4} from 'uuid';
import api from '../utils/api';
import { Network } from "vis-network";

// const options = {
//     height: "1000",
//     edges: {
//         color: "rgba(43,44,79,0.75)",
//         width: 1.3,
//         smooth: {
//             enabled: false,
//             type: "continuous",
//         },
//         arrows: {
//             to: {
//                 enabled: true,
//                 type: "arrow",
//             }
//         }
//     },
//     nodes: {
//         shape: "dot",
//         scaling: {
//             min: 10,
//             max: 30,
//         },
//         font: {
//             size: 12,
//             color: "rgb(250,226,217)",
//             // face: "Tahoma",
//         },
//     },
//     // physics: {
//     //     stabilization: {
//     //         iterations: 500,
//     //     },
//     //     barnesHut: {
//     //         gravitationalConstant: -180000,
//     //         springConstant: 0.1,
//     //         springLength: 100,
//     //     },
//     // },
//     physics: {
//         adaptiveTimestep: true,
//         barnesHut: {
//             gravitationalConstant: -80000,
//             springConstant: 0.05,
//             springLength: 95,
//             damping: 1,
//         },
//         stabilization: {
//             iterations: 2000
//         },
//     },
//     layout: {
//         randomSeed: 191006,
//         improvedLayout: false
//     },
//     interaction: {
//         // interaction: { hover: true },
//         tooltipDelay: 200,
//         hideEdgesOnDrag: true,
//     },
// };

// const options = {
//         edges: {
//         color: "rgba(43,44,79,0.75)",
//         width: 1.3,
//         smooth: {
//             enabled: false,
//             type: "continuous",
//         },
//         arrows: {
//             to: {
//                 enabled: true,
//                 type: "arrow",
//             }
//         }
//     },
//     nodes: {
//         shape: "dot",
//         scaling: {
//             min: 10,
//             max: 30,
//         },
//         font: {
//             size: 12,
//             color: "rgb(250,226,217)",
//             // face: "Tahoma",
//         },
//     },
//     physics:{
//         enabled: true,
//         barnesHut: {
//             gravitationalConstant: -80000,
//             centralGravity: 0.3,
//             springLength: 95,
//             springConstant: 0.04,
//             damping: 0.09,
//             avoidOverlap: 0
//         },
//         // forceAtlas2Based: {
//         //     gravitationalConstant: -50,
//         //     centralGravity: 0.01,
//         //     springConstant: 0.08,
//         //     springLength: 100,
//         //     damping: 0.4,
//         //     avoidOverlap: 0
//         // },
//         // repulsion: {
//         //     centralGravity: 0.2,
//         //     springLength: 200,
//         //     springConstant: 0.05,
//         //     nodeDistance: 100,
//         //     damping: 0.09
//         // },
//         // hierarchicalRepulsion: {
//         //     centralGravity: 0.0,
//         //     springLength: 100,
//         //     springConstant: 0.01,
//         //     nodeDistance: 120,
//         //     damping: 0.09
//         // },
//         maxVelocity: 50,
//         minVelocity: 0.1,
//         solver: 'barnesHut',
//         stabilization: {
//             enabled: true,
//             iterations: 2000,
//             updateInterval: 100,
//             onlyDynamicEdges: false,
//             fit: true
//         },
//         timestep: 0.5,
//         adaptiveTimestep: true
//     }
// }

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
        // width: 0.15,
        // color: { inherit: "from" },
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
    console.log("render graph");
    const [allNodes, setAllNodes] = useState([]);
    const [allEdges, setAllEdges] = useState([]);
    const [graph, setGraph] = useState({
        nodes: [],
        edges: []
    });
    const visJsRef = useRef(null);
    const network = useRef(null);
    console.log("New values: ", {allNodes, allEdges});


    function handleNewSource(srcs) {
        props.onNewSource(srcs);
    }

    function handleUpdateGraphInfo(query) {
        Promise.all([api.getGraphByID(query), api.getSourceByID(query)])
            .then(([graphInfo, srcsInfo]) => {
                handleNewSource(srcsInfo);
                console.log(query);
                console.log(graphInfo.nodes, graphInfo.edges)
                console.log({allNodes, allEdges})
                setAllNodes((state) => state.filter((oldNode) => oldNode.id.toString() !== query.toString()));

                let allNodesIds = []
                allNodes.filter((oldNode) => oldNode.id.toString() !== query.toString()).forEach(elem => {
                    allNodesIds.push(elem.id.toString());
                });
                const toRemove = new Set(allNodesIds);

                const difference = graphInfo.nodes.filter( x => !toRemove.has(x.id.toString()) );
                console.log(allNodesIds);
                console.log(difference);

                setAllNodes((allNodes) => [...allNodes, ...difference]);
                setAllEdges((allEdges) => [...allEdges, ...graphInfo.edges]);
                // setGraph({
                //         ...graph,
                //         nodes: allNodes,
                //         edges: allEdges
                //     }
                // );
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
            console.log(e);
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
        console.log("Graph: ", graph);
        network.current = createGraph(graph);
    },[visJsRef, graph, createGraph]);

    return (
        <div className="main__graph" ref={visJsRef} />
    );

}

export default NetworkGraphNew;