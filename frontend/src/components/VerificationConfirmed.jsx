import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import BackGround from "../assets/welcomePage-backgroundImage.jpg"
import logo from "../assets/logo.svg"

import { MdCheckCircle } from "react-icons/md";
import { BiSolidError } from "react-icons/bi";


const VerificationConfirmed = () => {


    const { userId, uniqueString } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isError = queryParams.get('error') === 'true';
    const errorMessage = isError ? queryParams.get('message') : null;


    // 

    return (

        <div className="">
            {isError ? (<>
                <div className='mt-20 flex flex-col items-center'>
                    <div>
                        <h2 className='text-2xl font-bold'>Hmm... can't reach this page</h2>
                    </div>

                    <div className='mt-5'>
                        <p className='text-lg'>{errorMessage}</p>
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
            </>) : (<>

                <div className="relative">
                    <img className="" src={BackGround} alt="background" />
                    <div className="bg-overLay absolute inset-0 opacity-50 w-screen h-full"></div>

                </div>

                <div className="bg-overLay bg-opacity-75 relative overflow-hidden bg-cover h-full w-screen"></div>
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                >

                    <img className='m-auto h-60 w-60 items-center ' src={logo} alt="micheal" />



                    <div className="bg-white h-full rounded-t-3xl pt-10">


                        <section>
                            <div>
                                <div>
                                    <p className="m-4 text-center text-2xl font-semibold">
                                        Your Account has been successfully verified
                                    </p>


                                    <div className="flex items-center justify-center mb-10 mt-5">
                                        <MdCheckCircle className="text-6xl text-overLay" />
                                    </div>

                                    <div className="w-screen flex flex-col items-center">
                                        <div className=' border-2 border-overLay mb-2  items-center justify-center bg-transparent rounded-full flex flex-col  w-4/6 h-11 '>
                                            <Link
                                                to="/login"
                                                className=' items-center p-3  text-overLay   text-2xl font-semibold rounded-lg flex '
                                            >
                                                LOG IN
                                            </Link>
                                        </div>

                                    </div>



                                </div>


                            </div>

                        </section>

                    </div>



                </div>

            </>)}


        </div >


    )
}

export default VerificationConfirmed