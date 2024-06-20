/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from 'react';
import { StageSpinner } from "react-spinners-kit";
import Suggesstion from './Suggesstion'
import debounce from 'lodash/debounce'
import { useTheme } from './Theme-context';


const SearchBar = ({ fetchData, setDataName, getLoaction }) => {

    const { theme } = useTheme()

    const [input, setInput] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [open, setOpen] = useState(true)
    const suggest = useRef(null)
    const [select, setSelect] = useState(1)
    const [selected, setSelected] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value)
        setOpen(true)
    }

    const getSuggestion = async (input) => {
        setLoading(true)
        try {
            const result = await fetchData(input)
            setSuggestions(result)
        } catch (err) {
            setError(err)
            console.log(error, "error while fetching weather");
            setSuggestions([]);
        } finally {
            setLoading(false)
        }
    }

    const getSuggestionDebounce = useCallback(debounce(getSuggestion, 300), [])

    useEffect(() => {
        input.length > 1 ? getSuggestionDebounce(input) : setSuggestions([])
        const handler = (e) => {
            if (!suggest.current.contains(e.target))
                setOpen(false)
        }
        document.addEventListener("mousedown", handler)
    }, [input])

    const suggestionCLick = (suggestion) => {
        setInput(suggestion)
        setDataName(suggestion)
        setOpen(false)
        setSuggestions([])
    }

    const handleKeyboard = e => {
        if (e.keyCode === 38) { // Up
            select > 0 && select < 5 ?
                setSelect(prev => prev - 1) : select
        } else if (e.keyCode === 40) { // Down
            select < 4 ?
                setSelect(prev => prev + 1) : select
        } else if (e.keyCode === 13) {
            setOpen(false)
            setSelect(0)
            suggestionCLick(selected)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setInput(selected)
    }

    return (
        <div className='relative'>
            <form className="border-2 my-5 flex items-center justify-between rounded-lg" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Location"
                    className="p-2 outline-none md:w-full w-[75%]"
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleKeyboard}
                // onBlur={onBlur}
                // onFocus={onFocus}
                />
                <button className="bg-blue-500 text-white px-4 py-3 md:w-60 w-[25%]  rounded-e-lg">Search</button>
            </form>
            {(suggestions.length > 0 || loading || error) && (
                <div ref={suggest} className={theme === "dark" ? `absolute z-10 -my-5 bg-slate-900 w-full overflow-y-auto md:max-h-44 max-h-40 drop-shadow-xl` : `absolute z-10 -my-5 bg-slate-50 w-full overflow-y-auto md:max-h-44 max-h-40 drop-shadow-xl`}>
                    {error && <p className="text-red-300 font-bold p-2">{error}</p>}
                    {loading && <StageSpinner color="lightblue" size={50} />}
                    {
                        open && <Suggesstion
                            suggestions={suggestions}
                            highlight={input}
                            setValue={setInput}
                            onSuggSelect={suggestionCLick}
                            select={select}
                            setSelected={setSelected} />
                    }
                </div>
            )}
        </div>
    )
};

export default SearchBar;
