import Menu from '../components/menu'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { logout } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/userApiSlice';

import { toast } from 'react-toastify'


const me = () => {

    const { userInfo } = useSelector((state) => state.auth)
    const { firstName, lastName } = userInfo.data
    const fullName = firstName + ' ' + lastName


    const [logoutApiCall] = useLogoutMutation()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout())
            navigate('/')


        } catch (err) {
            console.log(err)

        }
    }
    return (
        <div className='mt-3 p-2 '>
            <Menu PageName={fullName} />


            <div className='mt-8'>
                <Link to='/home/settings' className=' flex items-center justify-between h-8 w-full bg-darkGray rounded-md  p-3 '>
                    <p className='text-overLay font-semibold text-sm '>Account Setting</p>

                    <IoIosArrowDroprightCircle className='text-overLay' />


                </Link>
                <Link to='/home/updateaccountdetails' className=' flex items-center justify-between h-8 w-full bg-darkGray mt-1 rounded-md  p-3 '>
                    <p className='text-overLay font-semibold text-sm '>Add Bank Details</p>

                    <IoIosArrowDroprightCircle className='text-overLay' />


                </Link>
                <div className='mt-2'>
                    <p className='text-black text-sm'>Links</p>
                </div>

                <Link to='/home/faq' className=' flex items-center justify-between h-8 w-full bg-darkGray  mt-1 rounded-md  p-3 '>
                    <p className='text-overLay font-semibold text-sm '>Frequently Asked Questions</p>

                    <IoIosArrowDroprightCircle className='text-overLay' />


                </Link>
                <Link to='/home/infomation' className=' flex items-center justify-between h-8 w-full bg-darkGray  mt-1 rounded-md  p-3 '>
                    <p className='text-overLay font-semibold text-sm '>Information</p>

                    <IoIosArrowDroprightCircle className='text-overLay' />


                </Link>

                <Link to='/home/contact' className=' flex items-center justify-between h-8 w-full bg-darkGray  mt-1 rounded-md  p-3 '>
                    <p className='text-overLay font-semibold text-sm '>Contact Us</p>

                    <IoIosArrowDroprightCircle className='text-overLay' />


                </Link>
                <Link to='/home/analysis' className=' flex items-center justify-between h-8 w-full bg-darkGray  mt-1 rounded-md  p-3 '>
                    <p className='text-overLay font-semibold text-sm '>Analysis</p>

                    <IoIosArrowDroprightCircle className='text-overLay' />


                </Link>
                <Link to='/home/about' className=' flex items-center justify-between h-8 w-full bg-darkGray  mt-1 rounded-md  p-3 '>
                    <p className='text-overLay font-semibold text-sm '>About Us</p>

                    <IoIosArrowDroprightCircle className='text-overLay' />


                </Link>

                <div onClick={logoutHandler} className='flex items-center justify-between h-8 w-full bg-danger  mt-4 mb-16 rounded-md p-3 '>
                    <p className='text-black font-semibold text-sm'>Logout</p>

                    <IoLogOut className='text-black' />


                </div>
            </div>
        </div >
    )
}

export default me