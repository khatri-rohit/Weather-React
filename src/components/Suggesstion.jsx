import { useEffect, useState } from "react";

const Suggesstion = ({ suggestions, highlight, onSuggSelect, select, setSelected }) => {

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

    useEffect(() => {
        suggestions.filter((suggestion, index) => select == index ? setSelected(suggestion.description) : null)
    }, [select])

    return (
        <>
            {
                suggestions.map((suggestion, index) => {
                    return (
                        <p className={select === index ? `md:text-lg text-sm md:p-3 hover:bg-slate-300 bg-slate-300 p-2 ` : `md:text-lg text-sm md:p-3 hover:bg-slate-300 p-2 `}
                            onClick={() => onSuggSelect(suggestion.description)}
                            key={index}
                        >
                            {getHightlight(suggestion.description, highlight)}
                        </p>
                    )
                })
            }
        </>
    )
};

export default Suggesstion;
