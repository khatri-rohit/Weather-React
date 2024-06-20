import { useEffect, useState } from "react";

const Weather = ({ dataName }) => {
    const [weather, setWeather] = useState([])
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState('Jan 1, 1:00am')

    // https://api.tomorrow.io/v4/weather/realtime?location=toronto&apikey=xauunvDe8N05BUCjZLPVgywDQh0FnsxT
    // K4bouBhk9LCjqpsGp4Rrtl9VOliv14ka
    // xauunvDe8N05BUCjZLPVgywDQh0FnsxT
    // m3NQQU9F2ZxcZH7GShheQcUBxBqPQGPD

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
        setInterval(() => {
            const date = new Date();
            setDate(`${date.getDate()} ${date.toLocaleTimeString("en-us", {
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
            })}`);
        });
    }, [dataName])



    if (loading)
        return <p className="md:text-3xl text-xl text-center font-semibold">Loading Weather Data ...</p>

    return <>

        {
            weather &&
            <div className="border-2 p-3 px-6">
                <div className="my-2">
                    <p className="text-red-500 text-sm md:text-lg">{date}</p>
                </div>
                <div className="my-3">
                    <p className="md:text-3xl font-semibold">{dataName}</p>
                    <p className="md:text-3xl text-xl font-bold">{Math.floor(weather?.temperature)}℃</p>
                </div>
                <div className="my-2">
                    <p className="md:text-xl font-semibold">Feels like {Math.floor(weather?.temperature)}℃, haze. Haze</p>
                </div>
                <div className="md:border-s-4 border-s-2 border-red-700 p-3">
                    <p className="text-xl">Humidity: {weather?.humidity}%</p>
                    <p className="text-xl">Wind: {weather?.windSpeed}m/s WSW</p>
                    <p className="text-xl">Visibility: {weather?.visibility}km</p>
                </div>

            </div>
        }
    </>;
};

export default Weather;
