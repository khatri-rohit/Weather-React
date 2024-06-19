/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <>
            <div className="container flex items-center justify-center flex-col">
                <p className="text-3xl text-center py-5">Page Doesn't Exists</p>
                <Link to='/'
                    className='text-white text-center text-xl font-semibold p-3 py-2 bg-blue-600 rounded-xl'>
                    Back To Home
                </Link>
            </div>
        </>
    );
};

export default Error;
