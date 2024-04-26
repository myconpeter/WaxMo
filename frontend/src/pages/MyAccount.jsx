
import BackGround from "../assets/welcomePage-backgroundImage.jpg"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'


import 'react-toastify/dist/ReactToastify.css';

import { FaUser } from "react-icons/fa6";
import { MdArrowBackIosNew } from "react-icons/md";


const MyAccount = () => {

    const history = useNavigate()

    const { userInfo } = useSelector((state) => state.auth)



    return (
        <div className="">

            <div className="">
                <img className="" src={BackGround} alt="background" />
                <div className="bg-overLay absolute inset-0 opacity-50 w-screen h-36"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 top-0 bg-fixed">
                <div className="bg-transparent h-screen overflow-hidden flex items-center justify-center pt-20">
                    <div className="bg-white w-screen h-full shadow-3xl rounded-t-3xl">
                        <div className="flex flex-col items-center bg-lightGray shadow absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4">
                            <FaUser />
                            <p className="font-bold">My Account</p>
                        </div>




                        <form className="pt-5 p-10 flex flex-col">
                            <div className='flex justify-center items-center mt-12'>
                                <Link to='/home/me' className=' text-overLay bg-white   mr-4  text-xl   '>{<MdArrowBackIosNew />}
                                </Link>
                            </div>
                            {/* First Name */}
                            <div className="flex flex-col border-b-2 border-overLay items-start justify-center text-lg mb-2">
                                <p className="text-overLay text-sm font-semibold">First Name</p>
                                <input type="text" defaultValue={userInfo.data.firstName} name="firstName" className="bg-lightGray w-5/6 focus:outline-none" />
                            </div>

                            {/* Last Name */}
                            <div className="flex flex-col border-b-2 border-overLay items-start justify-center text-lg mb-2">
                                <p className="text-overLay text-sm font-semibold">Last Name</p>
                                <input type="text" defaultValue={userInfo.data.lastName} name="lastName" className="bg-lightGray w-5/6 focus:outline-none" />
                            </div>

                            {/* Phone Number */}
                            <div className="flex flex-col border-b-2 border-overLay items-start justify-center text-lg mb-2">
                                <p className="text-overLay text-sm font-semibold">Phone Number</p>
                                <input type="text" defaultValue={userInfo.data.phoneNumber} name="phoneNumber" className="bg-lightGray w-5/6 focus:outline-none" />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col border-b-2 border-overLay items-start justify-center text-lg mb-2">
                                <p className="text-overLay text-sm font-semibold">Email</p>
                                <input type="email" defaultValue={userInfo.data.email} name="email" className="bg-lightGray w-5/6 focus:outline-none" />
                            </div>

                            <div className="flex flex-col border-b-2 border-overLay items-start justify-center text-lg mb-2">
                                <p className="text-overLay text-sm font-semibold">Account Number</p>
                                <input type="text" name="accountNumber" defaultValue={userInfo.data.bankAccountNumber} className="bg-lightGray w-5/6 focus:outline-none" />
                            </div>

                            <div className="flex flex-col border-b-2 border-overLay items-start justify-center text-lg mb-2">
                                <p className="text-overLay text-sm font-semibold">Account Name</p>
                                <input type="text" name="accountName" defaultValue={userInfo.data.bankAccountName} className="bg-lightGray w-5/6 focus:outline-none" />
                            </div>

                            <div className="flex flex-col border-b-2 border-overLay items-start justify-center text-lg mb-2">
                                <p className="text-overLay text-sm font-semibold">Bank Name</p>
                                <input type="text" name="bankName" defaultValue={userInfo.data.bankBankName} className="bg-lightGray w-5/6 focus:outline-none" />
                            </div>

                        </form>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
