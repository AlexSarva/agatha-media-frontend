import Graph from "react-graph-vis";
import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const options = {
    layout: {
        hierarchical: false
    },
    edges: {
        color: "#000000"
    },
    nodes: {
        shape: "dot",
        size: 10
    },
    interaction: { hover: true },
    manipulation: {
        enabled: true,
    },
    physics: {
        forceAtlas2Based: {
            gravitationalConstant: -26,
            centralGravity: 0.005,
            springLength: 230,
            springConstant: 0.18,
        },
        maxVelocity: 146,
        stabilization: { iterations: 100 },
    },
};

const NetworkGraph = (props) => {

    const [graphEvents, setGraphEvents] = useState({
            select: (e) => {
                console.log(e);
                console.log("Selected nodes:");
                console.log(e.nodes);
                // console.log("Selected edges:");
                // console.log(edges);
            },
        })


    return (
        <Graph key={uuidv4()} graph={props.graphData} options={options} events={graphEvents} style={{ height: "inherit" }} />
    );

}

export default NetworkGraph;