import { FaMoon } from 'react-icons/fa'
import { LuSunMedium } from "react-icons/lu";
import { useTheme } from './Theme-context';

const Dark = () => {
    const { theme, toggleTheme } = useTheme()
    const bgStyle = "w-[5.8em] flex items-center justify-around px-3 py-2 rounded-lg"

    return (
        <>
            <div onClick={toggleTheme} className={theme === "dark" ? `bg-slate-900 ${bgStyle}` : `bg-slate-500 ${bgStyle}`}>
                <button
                    className={theme === "dark" ? `text-white font-bold` : `text-gray-200 font-bold`}>{theme === "dark" ? "Light" : "Dark"}</button>
                {theme === "dark" ? <LuSunMedium className='text-yellow-500 mx-1' /> : <FaMoon className='text-yellow-500 mx-1' />}
            </div>
        </>
    )
};

export default Dark;
