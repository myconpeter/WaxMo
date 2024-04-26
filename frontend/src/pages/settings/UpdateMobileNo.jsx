
import Menu from '../../components/menu';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../../slices/authSlice'
import { useUpdateMobileMutation } from '../../slices/userApiSlice';

const UpdateMobileNO = () => {

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

    const [oldMobile, setOldMobile] = useState('')
    const [newMobile, setNewMobile] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [updateMobile, { isLoading }] = useUpdateMobileMutation()

    const { userInfo } = useSelector((state) => state.auth)


    useEffect(() => {

        setOldMobile(userInfo.data.phoneNumber)

    }, [userInfo.setOldMobile])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!password) {
            toast.error('Password is required')
        } else {

            const res = await updateMobile({
                _id: userInfo._id,
                oldMobile,
                newMobile,
                password
            })

            if (res.error) {
                toast.error(res.error.data.message)
            } else {
                dispatch(setCredentials({ ...res }))
                navigate('/home/homepage')
                toast.success(`Mobile Number Updated Successfully`)
            }

        }


    }
    return (
        <div>
            <Menu PageName='Update Phone' />

            <form onSubmit={submitHandler} className="pt-8 p-10 flex flex-col items-center justify-center">
                <div className="flex flex-col border-b-2 border-overLay w-full mt-2 items-start text-lg mb-2 pt-2">

                    <p className="text-overLay text-sm font-semibold">Old Mobile Number</p>

                    <div className="flex w-full">

                        <input type="text" id="oldnumber" value={oldMobile} onChange={(e) => setOldMobile(e.target.value)} className="bg-lightGray border-overLay py-2  w-5/6  focus:outline-none" />

                    </div>

                </div>
                <div className="flex flex-col border-b-2 border-overLay w-full mt-2  items-start text-lg mb-2 pt-2">

                    <p className="text-overLay text-sm font-semibold">New Mobile Number</p>

                    <div className="flex w-full">

                        <input type="text" id="newnumber" value={newMobile} onChange={(e) => setNewMobile(e.target.value)} className="bg-lightGray border-overLay py-2  w-5/6  focus:outline-none" />

                    </div>

                </div>
                <div className="flex flex-col border-b-2 border-overLay w-full mt-2  items-start text-lg mb-2 pt-2">

                    <p className="text-overLay text-sm font-semibold">Confirm Password</p>

                    <div className="flex w-full">

                        <input type={see === true ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-lightGray border-overLay w-5/6 focus:outline-none  " />
                        <button onClick={toggle}>{see === true ? <IoMdEye className="text-overLay" /> : <IoMdEyeOff className="text-overLay" />}</button>
                    </div>
                </div>
                <button type='submit' className="bg-overLay font-medium p-2 md:p-4 text-white w-full rounded-full">{isLoading ? 'Please wait...' : 'Update Mobile Number'}</button>
            </form>
        </div>
    )
}

export default UpdateMobileNO