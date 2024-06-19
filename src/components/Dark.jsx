import { useState } from 'react';
import { FaMoon, FaRegMoon } from 'react-icons/fa'

const Dark = () => {
    const [dark, setDark] = useState(false)

    return (
        <>
            <div className="bg-blue-950 w-[5.8em] flex items-center justify-around px-3 py-2 rounded-lg">
                <button className="text-white font-bold">Dark</button>
                {dark ? <FaRegMoon /> : <FaMoon className='text-yellow-500 mx-1' />}
            </div>
        </>
    )
};

export default Dark;
