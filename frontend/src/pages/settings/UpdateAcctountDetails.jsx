
import Menu from '../../components/menu';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useUpdateBankMutation } from '../../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../../slices/authSlice'

const UpdateAccountDetails = () => {

    const [bankAccountNumber, setBankAccountNumber] = useState('')
    const [bankBankName, setBankBankName] = useState('')
    const [bankAccountName, setBankAccountName] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [updateBank, { isLoading }] = useUpdateBankMutation()

    const { userInfo } = useSelector((state) => state.auth)
    const password = userInfo.data.password
   

    useEffect(() => {
        setBankAccountNumber(userInfo.data.bankAccountNumber || '');
        setBankBankName(userInfo.data.bankBankName || '');
        setBankAccountName(userInfo.data.bankAccountName || '');


    }, [userInfo.setFirstName, userInfo.setLastName])

    useEffect(() => {
        if (userInfo.data.isBankChanged) {
            navigate('/home/me')
        }
    }, [navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        const res = await updateBank({
            _id: userInfo._id,
            bankAccountNumber,
            bankBankName,
            bankAccountName,
            password
        })
        console.log(res)
        if (res.error) {
            toast.error(res.error.data.message)
        } else {
            dispatch(setCredentials({ ...res }))
            navigate('/home/homepage')
            toast.success(`Bank Details Added Successfully`)
        }
    }
    return (
        <div>
            <Menu PageName='Add Account' />

            <form onSubmit={submitHandler} className="pt-8 p-10 flex flex-col items-center justify-center">
                <div className="flex flex-col border-b-2 border-overLay w-full mt-2  items-start text-lg mb-2 pt-2">

                    <p className="text-overLay text-sm font-semibold">Account Name</p>

                    <div className="flex w-full ">
                        <input type="text" id="accountname" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} className="bg-lightGray border-overLay py-2  w-5/6  focus:outline-none" />

                    </div>

                </div>
                <div className="flex flex-col border-b-2 border-overLay w-full mt-2  items-start text-lg mb-2 pt-2">

                    <p className="text-overLay text-sm font-semibold">Account Number</p>

                    <div className="flex w-full">

                        <input type="text" id="accountnumber" value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)} className="bg-lightGray border-overLay py-2  w-5/6  focus:outline-none" />

                    </div>

                </div>
                <div className="flex flex-col border-b-2 border-overLay w-full mt-2  items-start text-lg mb-2 pt-2">

                    <p className="text-overLay text-sm font-semibold">Bank Name</p>

                    <div className="flex w-full">

                        <input type="text" id="bankname" value={bankBankName} onChange={(e) => setBankBankName(e.target.value)} className="bg-lightGray border-overLay py-2  w-5/6  focus:outline-none" />

                    </div>

                </div>

                <div className='p-2'>
                    <p className=' text-danger text-xs'> Note : Name must match with Bank details </p>
                    <p className=' text-danger text-xs'> Note : Bank detatails can be updated once </p>
                </div>


                <button type='submit' className="bg-overLay font-medium p-2 md:p-4 text-white w-full rounded-full">{isLoading ? 'Please wait...' : 'Update Bank Details'}</button>
            </form>
        </div>
    )
}

export default UpdateAccountDetails