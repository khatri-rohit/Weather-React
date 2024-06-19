import { useState } from 'react';
import Dark from './Dark'
import SearchBar from './SearchBar'
import Weather from './Weather'

const Home = () => {

    const [dataName, setDataName] = useState("Ajmer, Rajasthan, India")

    async function fetchData(input) {
        const myHeaders = new Headers();
        myHeaders.append("X-RapidAPI-Key", import.meta.env.VITE_API_PLACE_KEY);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        const response = await fetch(`${import.meta.env.VITE_API_PLACE}?input=${input}&radius=500`, requestOptions)
        if (!response.ok)
            throw new Error("Network response Error was not ok")
        const result = await response.json()
        return result.predictions
    }

    return (
        <div className="container mx-auto p-3">
            <Dark />
            <SearchBar
                fetchData={fetchData}
                setDataName={setDataName}
                onSelect={(suggestion) => console.log(suggestion)}
                onChange={(input) => { console.log(input) }}
            // onBlur={(e) => { }}
            // onFocus={(e) => { }}
            />
            <Weather dataName={dataName} />
        </div>
    )
};

export default Home;