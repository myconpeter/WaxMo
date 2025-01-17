import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import Spinner from '../loaders/Spinner'




// toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { toast } from 'react-toastify'

import { FaUser } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import BackGround from "../assets/welcomePage-backgroundImage.jpg"


const loginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth)

    const [see, setSee] = useState(false)

    const toggle = (i) => {
        i.preventDefault();
        if (see === false) {
            setSee(true)
        }
        else {
            setSee(false)
        }
    }



    useEffect(() => {
        if (userInfo) {
            navigate('/home/homepage')

        }
    }, [navigate, userInfo])

    const onSubmit = async (e) => {
        e.preventDefault()

        const res = await login({ email, password })


        if (res.error) {
            toast.error(res.error.data.message)


        } else {

            dispatch(setCredentials({ ...res }))
            navigate('/home/homepage')
            toast.success(`Welcome ${res.data.name}`)

        }

    }

    // 

    return (

        <div className="">
            <div className=''>
                <ToastContainer />
                <div className="relative">
                    <img className="w-screen h-screen" src={BackGround} alt="background" />
                    <div className="bg-overLay absolute inset-0 opacity-50 w-screen h-full"></div>

                </div>

                <div className="bg-overLay bg-opacity-75 relative overflow-hidden"></div>
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
                    <div className="bg-transparent  h-screen overflow-hidden flex items-center justify-center pt-20">
                        <div className="bg-white w-screen h-full shadow-3xl rounded-t-3xl md:w-1/2">
                            <div className="flex flex-col items-center bg-lightGray shadow shadow-darkGray absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4">
                                <FaUser className="text-4xl text-overLay " />

                                <p className="font-bold">Login</p>
                            </div>
                            <form onSubmit={onSubmit} className="pt-14 p-10 flex flex-col md:flex">
                                <div className="flex flex-col border-b-2 border-overLay md:items-center md:justify-center  text-lg mb-2">

                                    <p className="text-overLay text-sm font-semibold">Email</p>

                                    <div className="flex  w-screen md:w-full">
                                        <input type="email" className="bg-lightGray  w-5/6  focus:outline-none" value={email} onChange={(e) => (setEmail(e.target.value))} />




                                    </div>

                                </div>
                                <div className="flex flex-col border-b-2 border-overLay items-start justify-center  text-lg mb-2">

                                    <p className="text-overLay text-sm font-semibold">Password</p>

                                    <div className="flex  w-screen md:w-full">


                                        <input value={password} onChange={(e) => (setPassword(e.target.value))} type={see === true ? "text" : "password"} id="password" className="bg-lightGray border-overLay   py-2 focus:outline-none w-4/6  " />
                                        <button onClick={toggle}>{see === true ? <IoMdEye className="text-overLay" /> : <IoMdEyeOff className="text-overLay" />}</button>

                                    </div>

                                </div>


                                <div className="pb-5 flex  justify-end">
                                    <Link to="/recoveremail" className="text-sm">Forgotten Password ? </Link>
                                </div>
                                <button type='submit' to='/home/homepage' className="bg-overLay font-medium p-2 text-white text-center w-full rounded-full justify-center items-center  md:w-1/3">{isLoading ? <Spinner/> : 'Login'}</button>

                                {/* the sign up function */}
                                <div className="flex flex-col items-end pt-2 mt-5 space-y-1 ">

                                    <p className="text-sm">Dont't have an account ? </p>
                                    <Link to="/signup" className="text-lg font-bold text-overLay">Sign Up</Link>

                                </div>
                            </form>


                        </div>
                    </div>



                </div>
            </div>

        </div >


    )
}

export default loginPage