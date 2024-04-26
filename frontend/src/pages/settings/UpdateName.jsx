
import Menu from '../../components/menu';

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useUpdateNameMutation } from '../../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../../slices/authSlice'

const UpdateName = () => {

    const [see, setSee] = useState(false)

    const toggle = (i) => {
        i.preventDefault();
        if (see === false) {
            setSee(true)
        }
        else {
            setSee(false)

        }
    }

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [updateName, { isLoading }] = useUpdateNameMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {

        setFirstName(userInfo.data.firstName)
        setLastName(userInfo.data.lastName)


    }, [userInfo.setFirstName, userInfo.setLastName])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!password) {
            toast.error('Enter Account Password')
        } else {
            const res = await updateName({
                _id: userInfo._id,
                firstName,
                lastName,
                password
            })
            console.log(res)
            if (res.error) {
                toast.error(res.error.data.message)
            } else {
                dispatch(setCredentials({ ...res }))
                navigate('/home/homepage')
                toast.success(`Profile Updated Successfully`)
            }
        }
    }
    return (
        <div>
            <Menu PageName='Update Name' />

            <form onSubmit={submitHandler} className="pt-12 p-10 flex flex-col">
                <div className="flex flex-col border-b-2 border-overLay items-start justify-center  text-lg mb-2">

                    <p className="text-overLay text-sm font-semibold">First Name</p>

                    <div className="flex w-full">

                        <input type="text" id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-lightGray  w-5/6  focus:outline-none" />


                    </div>

                </div>
                <div className="flex flex-col border-b-2 border-overLay items-start justify-center  text-lg mb-2">

                    <p className="text-overLay text-sm font-semibold">Last Name</p>

                    <div className="flex w-full">

                        <input type="text" id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-lightGray  w-5/6  focus:outline-none" />


                    </div>

                </div>
                <div className="flex flex-col border-b-2 border-overLay w-full   items-start text-lg  pt-2">

                    <p className="text-overLay text-sm font-semibold">Password</p>

                    <div className="flex w-full">

                        <input type={see === true ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="bg-lightGray border-overLay w-5/6 focus:outline-none  " />
                        <button onClick={toggle}>{see === true ? <IoMdEye className="text-overLay" /> : <IoMdEyeOff className="text-overLay" />}</button>
                    </div>

                </div>

                <div className='p-2'>
                    <p className=' text-danger text-xs'> Note : Name must match with Bank details </p>
                </div>
                <div className='p-2'>
                    <p className=' text-danger text-xs'> Note : Account Name can only be changed once </p>
                </div>


                <button type='submit' className="bg-overLay font-medium p-2 text-sm text-white w-full rounded-full">{isLoading ? 'please wait...' : 'Update Account Name'}</button>
            </form>
        </div>
    )
}

export default UpdateName