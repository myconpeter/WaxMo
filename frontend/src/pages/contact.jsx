import Menu from "../components/menu"
import { IoMdMail } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";



const Contact = () => {
    return (
        <div>
            <Menu PageName='Contact Us' />
            <div className="mt-10 px-3">
                <div>
                    <p className="text-black text-md font-semibold">
                        Hello there! Need help ? Message our Support team
                    </p>
                    <hr />
                </div>

                <div className="mt-2">
                    <div className="flex space-x-3 px-3">
                        <IoMdMail className="bg-white text-overLay text-xl" />
                        <div className="bg-darkGray w-screen rounded-xl pb-4 p-3 ">
                            <a href="mailto:contactwaxmo@gmail.com" target="_blank" className="text-sm font-semibold">
                                contactwaxmo@gmail.com
                            </a>
                        </div>

                    </div>

                </div>
                <div className="mt-2">
                    <div className="flex space-x-3 px-3">
                        <FaFacebookSquare className="bg-white text-overLay text-xl" />
                        <div className="bg-darkGray  w-screen  rounded-xl pb-4 p-3 ">
                            <a href="https://www.facebook.com/ThetallestboYOfficial" target="_blank" className="text-sm font-semibold">
                                WaxMo
                            </a>
                        </div>

                    </div>

                </div>
                <div className="mt-2">
                    <div className="flex space-x-3 px-3">
                        <IoLogoWhatsapp className="bg-white text-overLay text-xl" />
                        <div className="bg-darkGray w-screen rounded-xl pb-4 p-3 ">
                            <a href="https://chat.whatsapp.com/B966BJQfiSGDUbHNLbAPyx" target="_blank" className="text-sm font-semibold">
                               WaxMo

                            </a>
                        </div>

                    </div>

                </div>

                <div className="mt-2">
                    <div className="flex space-x-3 px-3">
                        <FaXTwitter className="bg-white text-overLay text-xl" />
                        <div className="bg-darkGray w-screen rounded-xl pb-4 p-3 ">
                            <a href="https://x.com/waxmo_/" target="_blank" className="text-sm font-semibold">
                               WaxMo

                            </a>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Contact