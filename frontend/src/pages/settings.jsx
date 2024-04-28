import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Menu from '../components/menu'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Link } from 'react-router-dom';


import Modal from "../components/ErrorPopUp"
import { FcCancel } from "react-icons/fc";



const settings = () => {
    const [open, setOpen] = useState(false)
    const { userInfo } = useSelector((state) => state.auth)

    return (
        <div className='bg-white w-full h-screen p-2 pt-12'>
            <Menu PageName='Settings' />

            <div className=''>

                {userInfo.data.accountNameUpdated ? (<>
                    <Link  onClick={() => setOpen(true)} >
<div className=' flex items-center justify-between h-8 w-full bg-darkGray rounded-md p-3 '>
    <p className='text-overLay font-semibold text-sm'>Update Name</p>

    <IoIosArrowDroprightCircle className='text-overLay' />

</div>
</Link>

<main className="App">
     

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-56">
          <FcCancel  size={56} className="mx-auto text-danger" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-darkGray">   Account Name has already been updated </h3>
            <Link to="/home/contact"  className="text-sm text-overLay mt-6">
              Contact Admin
            </Link>
          </div>
          <div className="flex gap-4">
          
            <button
              className="btn btn-light w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </main>
                </>):(<>
                    <Link to='/home/updatename' >

<div className=' flex items-center justify-between h-8 w-full bg-darkGray rounded-md p-3 '>
    <p className='text-overLay font-semibold text-sm'>Update Name</p>

    <IoIosArrowDroprightCircle className='text-overLay' />

</div>
</Link>

                </>)}
               
               
                <Link to='/home/updatepassword' className=' flex items-center justify-between  h-8 w-full bg-darkGray mt-1 rounded-md p-3 '>
                    <p className='text-overLay font-semibold text-sm '>Update Password</p>

                    <IoIosArrowDroprightCircle className='text-overLay' />


                </Link>
                <Link to='/home/updatemobileno' className=' flex items-center justify-between  h-8 w-full bg-darkGray  mt-1 rounded-md  p-3 '>
                    <p className='text-overLay font-semibold text-sm '>Update Moblile Number</p>

                    <IoIosArrowDroprightCircle className='text-overLay' />
                </Link>
                {userInfo.data.isBankChanged ? (<>
                    <Link  onClick={() => setOpen(true)} >
<div className=' flex items-center justify-between h-8 w-full bg-darkGray mt-1 rounded-md p-3 '>
    <p className='text-overLay font-semibold text-sm'>Add Bank Details</p>

    <IoIosArrowDroprightCircle className='text-overLay' />

</div>
</Link>

<main className="App">
     

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-56">
          <FcCancel  size={56} className="mx-auto text-danger" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-darkGray">   Bank Details has already been added </h3>
            <Link to="/home/contact"  className="text-sm text-overLay mt-6">
              Contact Admin
            </Link>
          </div>
          <div className="flex gap-4">
          
            <button
              className="btn btn-light w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </main>
                </>):(<>
                    <Link to='/home/updateaccountdetails' >

<div className=' flex items-center justify-between h-8 w-full mt-1 bg-darkGray rounded-md p-3 '>
    <p className='text-overLay font-semibold text-sm'>Add Bank Details</p>

    <IoIosArrowDroprightCircle className='text-overLay' />

</div>
</Link>

                </>)}
            </div>
        </div>
    )
}


export default settings