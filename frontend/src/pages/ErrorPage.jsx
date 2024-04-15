
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew } from "react-icons/md";
import { BiSolidError } from "react-icons/bi";

const ErrorPage = () => {
    const history = useNavigate()
    return (
        <div>
            <div className='flex items-center justify-between  p-2  h-fit w-screen'>

                <div className=''>
                    <button onClick={() => history(-1)} className=' text-overLay bg-white   mr-4  text-xl   '>{<MdArrowBackIosNew />}
                    </button>
                </div>

                <div className="">
                    <p className="text-xl font-bold text-center text-overLay">Page not found</p>

                </div>
                <div className=''>
                    <button onClick={() => setNav(!nav)} className=' text-overLay text-xl  bg-white z-10 relative mr-4'></button>
                </div>

            </div>

            <div className='mt-20 flex flex-col items-center'>
                <div>
                    <h2 className='text-2xl font-bold'>Page Not Found</h2>
                </div>

                <div className='mt-5'>
                    <p className='text-lg'> Sorry, this page isn&#x27;t available</p>
                </div>


                <div className="flex items-center justify-center mb-10 mt-5">
                    <BiSolidError className="text-6xl text-overLay" />
                </div>

                <div>
                    <Link
                        class="px-2 py-2 mt-16 text-lg font-light transition duration-200 ease-in bg-brightYellow border-2 border-gray-700 w-36 hover:bg-yellow-400 focus:outline-none"
                        type="button" to='/home/homepage'>
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage