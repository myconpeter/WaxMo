import { IoIosMail } from "react-icons/io";
import BackGround from "../assets/welcomePage-backgroundImage.jpg"
import { Link } from "react-router-dom";


const RecoverEmail = () => {

    return (
        <div className="" >
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
                        <form action="/home/homepage" className="pt-10 p-10 flex flex-col">


                            <div className="flex flex-col  mt-24 mb-10 border-b-2 border-overLay w-full  items-start text-lg pt-2">

                                <p className="text-overLay font-semibold">Email</p>

                                <div className="flex w-screen ">

                                    <input type='email' placeholder="Enter your Email Address" id="email" className="bg-lightGray border-overLay w-4/6 focus:outline-none  " />
                                </div>

                            </div>

                            <button className="bg-overLay font-medium p-2  text-white uppercase w-full rounded-full">Next</button>
                        </form>


                    </div>
                </div>




            </div>
        </div >

    )
}

export default RecoverEmail