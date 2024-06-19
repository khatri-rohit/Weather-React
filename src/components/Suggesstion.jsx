import { useState } from "react";

const Suggesstion = ({ suggestions, highlight, onSuggSelect, select }) => {

    const getHightlight = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, "gi"))
        return (
            <span>
                {parts.map((part, index) => {
                    return part.toLowerCase() === highlight.toLowerCase() ?
                        (<p className="text-blue-500 font-medium inline-flex" key={index}>{part}</p>) : (part)
                })}
            </span>
        )
    }


    return (
        <>
            {
                suggestions.map((suggestion, index) => {
                    return (
                        <p className={select === index ? `text-lg p-3 hover:bg-slate-300 bg-slate-300` : `text-lg p-3 hover:bg-slate-300 `}
                            onClick={() => onSuggSelect(suggestion.description)}
                            key={index}>
                            {getHightlight(suggestion.description, highlight)}
                        </p>
                    )
                })
            }
        </>
    )
};

export default Suggesstion;
