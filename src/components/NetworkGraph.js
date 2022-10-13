import Graph from "react-graph-vis";
import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import api from '../utils/api';

const options = {
    // layout: {
    //     hierarchical: false
    // },
    edges: {
        color: "rgba(43,44,79,0.75)",
        width: 1.3,
        smooth: {
            enabled: false,
            type: "continuous",
        },
        arrows: {
            to: {
                enabled: true,
                type: "arrow",
            }
        }
    },
    // edges: {
    //     // width: 0.15,
    //     color: "rgba(43,44,79,0.75)",
    //     // color: { inherit: "from" },
    //     smooth: {
    //         type: "continuous",
    //     },
    // },

    nodes: {
        shape: "dot",
        // scaling: {
        //     customScalingFunction: function (min, max, total, value) {
        //         return value / total;
        //     },
        //     min: 5,
        //     max: 150,
        // },
        scaling: {
            min: 10,
            max: 30,
        },
        font: {
            size: 12,
            color: "rgb(250,226,217)",
            // face: "Tahoma",
        },
    },
    // physics: {
    //     stabilization: {
    //         iterations: 500,
    //     },
    //     barnesHut: {
    //         gravitationalConstant: -180000,
    //         springConstant: 0.1,
    //         springLength: 100,
    //     },
    // },
    physics: {
        adaptiveTimestep: true,
        barnesHut: {
            gravitationalConstant: -80000,
            springConstant: 0.05,
            springLength: 95
        },
        stabilization: {
            iterations: 2000
        }
    },
    layout: {
        randomSeed: 191006,
        improvedLayout: true
    },
    interaction: {
        // interaction: { hover: true },
        tooltipDelay: 200,
        hideEdgesOnDrag: true,
    },
};

const NetworkGraph = (props) => {
    console.log("render graph");
    const [allNodes, setAllNodes] = useState([]);
    const [allEdges, setAllEdges] = useState([]);
    const [graph, setGraph] = useState({
        nodes: [],
        edges: []
    });
    console.log("New values: ", {allNodes, allEdges})

    function handleUpdateGraphInfo(query) {
        api.getGraphByID(query)
            .then(({nodes, edges}) => {
                console.log(query);
                console.log({nodes, edges})
                console.log({allNodes, allEdges})
                setAllNodes((state) => state.filter((oldNode) => oldNode.id.toString() !== query.toString()));

                let allNodesIds = []
                allNodes.filter((oldNode) => oldNode.id.toString() !== query.toString()).forEach(elem => {
                    allNodesIds.push(elem.id.toString());
                });
                const toRemove = new Set(allNodesIds);

                const difference = nodes.filter( x => !toRemove.has(x.id.toString()) );
                console.log(allNodesIds);
                console.log(difference);

                setAllNodes((allNodes) => [...allNodes, ...difference]);
                setAllEdges((allEdges) => [...allEdges, ...edges]);
            })
            .then((res) => {
                    setGraph({
                            ...graph,
                            nodes: allNodes,
                            edges: allEdges
                        }
                    )
                }

            )
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
        console.log(query);
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

    const graphEvents = {
        select: (e) => {
            console.log(e);
            console.log("Selected nodes:");
            console.log(e.nodes);
            // console.log("Selected edges:");
            // console.log(edges);
        },
        doubleClick: (e) => {
            console.log(e);
            console.log("Selected nodes: ", e.nodes[0]);
            handleUpdateGraphInfo(e.nodes[0]);
            console.log(e.nodes);
            // console.log("Selected edges:");
            // console.log(edges);
        },
    }

    // const [graphEvents, setGraphEvents] = useState()


    return (
        <Graph key={uuidv4()} graph={graph} options={options} events={graphEvents} style={{ height: "inherit" }} />
    );

}

export default NetworkGraph;