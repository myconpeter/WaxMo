import { useState } from "react";
import Menu from '../components/menu'
import { useNavigate } from "react-router-dom";



const BuyShare = () => {

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('HANDLE')
        navigate('/home/makePayment')
    }




    return (
        <div >
            <Menu PageName='Buy Share' />

            <form className='mt-7 p-2 w-screen h-screen ' onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center items-center h-1/2">
                    <div>
                        <p className="text-3xl text-overLay font-semibold">Input Share Amount</p>
                    </div>
                    <div className="mt-8 flex justify-center items-center">
                        <input className="h-16 text-3xl border-b-2 text-center w-1/2 focus:outline-none" placeholder="₦0.00" type="text" id="amount" />
                    </div>
                    <p>=0.00%</p>
                </div>

                <div className="flex flex-col mx-3">
                    <div className="flex justify-between border-b-2 border-darkGray ">
                        <p className="text-xl">Price Per Share:</p>
                        <p className="text-xl">₦10,000</p>
                    </div>

                    <div className="flex justify-between mt-8 border-b-2 border-darkGray ">
                        <p className="text-xl"> Share Percent:</p>
                        <p className="text-xl">1%</p>
                    </div>
                </div>

                <div className="mt-6 flex justify-center items-center" >
                    <button type="submit" className=" rounded-lg px-12 font-semibold py-3 bg-overLay text-3xl text-white">Buy</button>
                </div>

            </form>



        </div>
    )
}




export default BuyShare