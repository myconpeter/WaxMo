import { IoIosMail } from "react-icons/io";
import BackGround from "../assets/welcomePage-backgroundImage.jpg"
import { MdArrowBackIosNew } from "react-icons/md";

import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useResetEmailMutation } from '../slices/userResetSlice'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { toast } from 'react-toastify'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
});



const RecoverEmail = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const res = await resetEmail({ email: values.email });
            if (res.error) {
                console.log(res.error);
                toast.error(res.error.message); // Display error message using toast
            } else {
                navigate('/resetconfirmed');
            }
        },
    });



    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    const [resetEmail, { isLoading }] = useResetEmailMutation()

    const { userInfo } = useSelector((state) => state.auth)






    useEffect(() => {
        if (userInfo) {
            navigate('/home/homepage')
        }
    }, [navigate, userInfo])

    const onSubmit = async (e) => {
        e.preventDefault()

        const res = await resetEmail({ email })
        console.log(email)
        console.log(res)


        if (res.error) {
            console.log(res.error)

        } else {
            navigate('/resetconfirmed')
        }
    }

    return (

        <div className="" >
            <ToastContainer />
            <div className="relative">
                <img className="" src={BackGround} alt="background" />
                <div className="bg-overLay absolute inset-0 opacity-50 w-screen h-36"></div>

            </div>



            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">

                <div className="bg-transparent  h-screen overflow-hidden flex items-center justify-center pt-20">
                    <div className="bg-white w-screen h-full shadow-3xl rounded-t-3xl">
                        <div className="flex flex-col items-center bg-lightGray shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4">
                            <IoIosMail className="text-4xl text-overLay " />

                            <p className="font-bold">Email</p>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="pt-10 p-10 flex flex-col">
                            <div className='flex items-center justify-center mt-10'>
                                <button onClick={() => history(-1)} className=' text-overLay bg-white   mr-4  text-xl   '>{<MdArrowBackIosNew />}
                                </button>
                            </div>

                            <div className="flex flex-col  mt-24 mb-10 border-b-2 border-overLay w-full  items-start text-lg pt-2">
                                <p className="text-overLay mb-5 font-semibold">Email</p>
                                <div className="flex w-screen ">
                                    <input
                                        type='email'
                                        placeholder="Enter your Email Address"
                                        id="email"
                                        className="bg-lightGray border-overLay w-4/6 focus:outline-none"
                                        {...formik.getFieldProps('email')}
                                    />
                                </div>
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-danger text-xs">{formik.errors.email}</div>
                                ) : null}
                            </div>

                            <button type="submit" className="bg-overLay font-medium p-2  text-white uppercase w-full rounded-full">Next</button>
                        </form>



                    </div>
                </div>




            </div>
        </div >

    )
}

export default RecoverEmail