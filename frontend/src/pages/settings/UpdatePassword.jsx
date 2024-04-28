import Menu from '../../components/menu';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../../slices/authSlice';
import { useUpdatePasswordMutation } from '../../slices/userApiSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Spinner from '../../loaders/Spinner'

const UpdatePassword = () => {
    const [see, setSee] = useState(false);
    const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Old Password is required'),
        newPassword: Yup.string()
            .required('New Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            ),
        confirmNewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm New Password is required')
    });

    const onSubmit = async (values, { setSubmitting }) => {
        const { oldPassword, newPassword, confirmNewPassword } = values;

        try {
            const res = await updatePassword({
                _id: userInfo._id,
                oldPassword,
                newPassword,
                confirmNewPassword
            });

            if (res.error) {
                toast.error(res.error.data.message);
            } else {
                dispatch(setCredentials({ ...res }));
                navigate('/home/homepage');
                toast.success(`Password Updated Successfully`);
            }
        } catch (error) {
            console.error('Error updating password:', error);
            toast.error('An error occurred while updating the password');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Menu PageName='Update Password' />

            <Formik
                initialValues={{ oldPassword: '', newPassword: '', confirmNewPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="pt-12 p-10 flex flex-col items-center justify-center">
                        <div className="flex flex-col items-start justify-center text-lg mb-6">
                            <label htmlFor="oldPassword" className="text-overLay text-sm font-semibold">Old Password</label>
                            <div className="flex border-b-2 border-overLay">
                                <Field
                                    type={see ? "text" : "password"}
                                    id="oldPassword"
                                    name="oldPassword"
                                    className="bg-lightGray border-overLay py-2 w-full focus:outline-none"
                                />
                                <button onClick={() => setSee(prev => !prev)}>
                                    {see ? <IoMdEye className="text-overLay" /> : <IoMdEyeOff className="text-overLay" />}
                                </button>
                            </div>
                            <ErrorMessage name="oldPassword" component="div" className="text-danger text-xs" />
                        </div>

                        <div className="flex flex-col items-start justify-center text-lg mb-6">
                            <label htmlFor="newPassword" className="text-overLay text-sm font-semibold">New Password</label>
                            <div className="flex border-b-2 border-overLay">
                                <Field
                                    type={see ? "text" : "password"}
                                    id="newPassword"
                                    name="newPassword"
                                    className="bg-lightGray border-overLay py-2 w-full focus:outline-none"
                                />
                                <button onClick={() => setSee(prev => !prev)}>
                                    {see ? <IoMdEye className="text-overLay" /> : <IoMdEyeOff className="text-overLay" />}
                                </button>
                            </div>
                            <ErrorMessage name="newPassword" component="div" className="text-danger text-xs" />
                        </div>

                        <div className="flex flex-col items-start justify-center text-lg mb-6">
                            <label htmlFor="confirmNewPassword" className="text-overLay text-sm font-semibold">Confirm New Password</label>
                            <div className="flex border-b-2 border-overLay">
                                <Field
                                    type={see ? "text" : "password"}
                                    id="confirmNewPassword"
                                    name="confirmNewPassword"
                                    className="bg-lightGray border-overLay py-2 w-full focus:outline-none"
                                />
                                <button onClick={() => setSee(prev => !prev)}>
                                    {see ? <IoMdEye className="text-overLay" /> : <IoMdEyeOff className="text-overLay" />}
                                </button>
                            </div>
                            <ErrorMessage name="confirmNewPassword" component="div" className="text-danger text-xs" />
                        </div>

                        <button
                            type="submit"
                            className="bg-overLay font-medium p-2 md:p-4 text-white w-full rounded-full"
                            disabled={isSubmitting}
                        >
                            {isLoading ?<Spinner/> : 'Change Password'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default UpdatePassword;
