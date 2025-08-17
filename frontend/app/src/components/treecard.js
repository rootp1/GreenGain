import React from "react";

export default function Treecard(props) {
    return (
        <div className="flex h-64 w-64 flex-col items-center justify-center rounded-2xl border-4 border-black bg-white p-3 shadow">
            <img className="h-3/5 w-11/12 rounded-xl object-cover" src={props.imageurl} alt={props.treename} />
            <div className="mt-2 flex flex-col items-center text-sm">
                <div className="font-semibold">{props.treename}</div>
                <div>{props.species}</div>
                <div>{props.date}</div>
                <div className="text-emerald-600 font-medium">{props.co2} kg/year</div>
            </div>
        </div>
    );
}
