import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';

import { logout } from '../slices/authSlice'


// menu icons
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";
import { BiSolidContact } from "react-icons/bi";
import { IoExit } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";







const Menu = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth)


    const [nav, setNav] = useState(false);
    const history = useNavigate()

    const links = [
        {
            id: 1,
            link: "Home",
            ref: "/home/homepage",
            tabIcon: <FaHome />
        },
        {
            id: 2,
            link: "Dashboard",
            ref: "/home/dashboard",
            tabIcon: <MdDashboard />
        },

        {
            id: 3,
            link: "Information",
            ref: "/home/infomation",
            tabIcon: <IoMdInformationCircle />
        },
        {
            id: 4,
            link: "Settings",
            ref: "/home/settings",
            tabIcon: <IoSettingsSharp />
        },
        {
            id: 5,
            link: "FAQ",
            ref: "/home/faq",
            tabIcon: <FaQuestionCircle />
        },

        {
            id: 6,
            link: "About Us",
            ref: "/home/about",
            tabIcon: <CgMoreO />
        },
        {
            id: 7,
            link: "Contact Us",
            ref: "/home/contact",
            tabIcon: <BiSolidContact />
        }


    ]
    const [logoutApiCall] = useLogoutMutation()
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
        <div className='fixed z-50 w-fit h-8 max-w-screen -translate-x-1/2  top-0 left-1/2 bg-lightGray'>


            <div className='flex items-center justify-between  p-2  h-fit w-screen'>

                <div className=''>
                    <button onClick={() => history(-1)} className=' text-overLay bg-white   mr-4  text-xl   '>{<MdArrowBackIosNew />}
                    </button>
                </div>

                <div className="">
                    <p className="text-xl font-bold text-center text-overLay">{props.PageName}</p>

                </div>
                <div className=''>
                    <button onClick={() => setNav(!nav)} className=' text-overLay text-xl  bg-white z-10 relative mr-4'>{nav ? <FaTimes /> : <GiHamburgerMenu />}</button>
                </div>

            </div>


            {nav && (
                <div className='flex  absolute top-0 left-0 text-white h-36 w-full  '>

                    <div onClick={() => setNav(!nav)} className='w-2/3   h-screen '></div>
                    <ul className=' flex  flex-col  w-1/3 bg-white text-black h-screen items-start mt-5'>
                        {links.map(({ id, link, ref, tabIcon }) => (
                            <li key={id} className='text-sm capitalize text-overLay py-4 px-4'>

                                <Link className='flex items-center ' to={ref} > <span className='mx-1'>{tabIcon}</span> {link}</Link>


                            </li>
                        ))}
                        <li className='text-sm text-danger py-4 px-4'>

                            <div className='flex items-center ' onClick={logoutHandler} > <span className='mx-1'><IoExit /></span> Logout </div>


                        </li>
                        {userInfo.data.isAdmin ? (<>
                            <li className='text-sm text-overLay py-4 px-4'>

                                <Link className='flex items-center ' to='/admin' >  <span className='mx-1'><MdAdminPanelSettings /></span> Admin Panel</Link>


                            </li>

                        </>) : (<> </>)}


                    </ul>
                </div>
            )}
        </div>
    )
}

export default Menu