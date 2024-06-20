import { useEffect } from "react";
import { useTheme } from "./Theme-context";

const Suggesstion = ({ suggestions, highlight, onSuggSelect, select, setSelected }) => {

    const { theme } = useTheme()

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

    const isdark = theme === "dark" ? "bg-slate-800" : "bg-slate-300"

    return (
        <>
            {
                suggestions.map((suggestion, index) => {
                    return (
                        <p className={select === index ?
                            `cursor-pointer bg-slate-800 md:text-lg text-sm md:p-3 hover:${isdark} p-2`
                            : `cursor-pointer md:text-lg text-sm md:p-3 hover:${isdark} p-2`}
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
