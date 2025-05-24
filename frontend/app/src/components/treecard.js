import React from "react";

export default function Treecard(props) {
    return (
        <div className="outertreecard">
            <img className="treecardimage" src={props.imageurl} alt={props.treename} />
            <div className="innertreecarddesc">
                <div>{props.treename}</div>
                <div>{props.species}</div>
                <div>{props.date}</div>
                <div>{props.co2} kg/year</div>
            </div>
        </div>
    );
}
