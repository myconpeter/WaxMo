import { Link } from "react-router-dom";
import BackGround from "../assets/welcomePage-backgroundImage.jpg"
import logo from "../assets/logo.svg"

import { IoIosMail } from "react-icons/io";


const EmailConfirmed = () => {




    // 

    return (

        <div className="">

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
                                    Thank you for Registering on
                                </p>
                                <p className="m-4 text-center text-2xl font-semibold">WaxMo!</p>

                                <p className="m-4 mt-10 text-center text-xl">
                                    We've sent you an email. Please check your inbox and click the verification link.
                                </p>
                                <div className="flex items-center justify-center">
                                    <IoIosMail className="text-6xl text-overLay" />
                                </div>

                            </div>


                        </div>

                    </section>

                </div>



            </div>
        </div >


    )
}

export default EmailConfirmed