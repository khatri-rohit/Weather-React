import { useEffect, useState } from "react";

const Weather = ({ dataName }) => {
    const [weather, setWeather] = useState([])
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState('')

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}?location=${dataName}&apikey=${import.meta.env.VITE_API_KEY}`)
            const result = await response.json()
            if (result) {
                setWeather({ ...result.data.values })
                setLoading(false)
            }
        } catch (err) {
            console.error(err + "Error accoured while fetching Data");
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
        const date = new Date();
        setDate(`${date.getDate()} ${date.toLocaleTimeString("en-us", {
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        })}`);
    }, [dataName])

    if (loading)
        return <p className="md:text-3xl text-xl text-center font-semibold">Loading Weather Data ...</p>

    if (dataName === "") {
        return <p className="text-2xl text-center font-semibold">Enter Your Location</p>
    }

    return <>

        {
            weather &&
            <div className="border-2 p-3 px-6">
                <div className="my-2">
                    <p className="text-sm md:text-lg date">{date}</p>
                </div>
                <div className="my-3">
                    <p className="md:text-3xl font-semibold name">{dataName}</p>
                    <p className="md:text-3xl text-xl font-bold temp">{Math.floor(weather?.temperature)}℃</p>
                </div>
                <div className="my-2">
                    <p className="md:text-xl font-semibold text-feel">Feels like {Math.floor(weather?.temperature)}℃, haze. Haze</p>
                </div>
                <div className="md:border-s-4 border-s-2 border-red-700 p-3">
                    <p className="text-xl humidity">Humidity: {weather?.humidity}%</p>
                    <p className="text-xl wind">Wind: {weather?.windSpeed}m/s WSW</p>
                    <p className="text-xl visibility">Visibility: {weather?.visibility}km</p>
                </div>

            </div>
        }
    </>;
};

export default Weather;
