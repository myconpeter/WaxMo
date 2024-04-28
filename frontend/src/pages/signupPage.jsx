import { FaUserPlus } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import BackGround from "../assets/welcomePage-backgroundImage.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRegisterMutation } from '../slices/userApiSlice';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../loaders/Spinner";
const SignupPage = () => {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/home/homepage');
        }
    }, [navigate, userInfo]);

    const initialValues = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAndConditions: false
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        termsAndConditions: Yup.boolean().oneOf([true], 'Terms and Conditions must be accepted')
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const res = await register({
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                phoneNumber: values.phoneNumber,
                password: values.password
            });

            if (res.error) {
                // Handle error

                toast.error(res.error.data.message);
            } else {
                // Handle success
                navigate('/emailconfirmed');
            }
        } catch (error) {
            toast.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const [see, setSee] = useState(false);

    const togglePasswordVisibility = () => {
        setSee(!see);
    };

    return (
        <div className="">
            <ToastContainer />
            <div className="">
                <img className="" src={BackGround} alt="background" />
                <div className="bg-overLay absolute inset-0 opacity-50 w-screen h-36"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 top-0 bg-fixed">
                <div className="bg-transparent h-screen overflow-hidden flex items-center justify-center pt-20">
                    <div className="bg-white w-screen h-full shadow-3xl rounded-t-3xl">
                        <div className="flex flex-col items-center bg-lightGray shadow absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4">
                            <FaUserPlus className="text-4xl text-overLay" />
                            <p className="font-bold">Sign Up</p>
                        </div>

                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            {({ isSubmitting }) => (
                                <Form className="pt-5 p-10 flex flex-col">
                                    {/* First Name */}
                                    <div className="flex flex-col border-b-2 border-overLay items-start justify-center text-lg mb-2">
                                        <p className="text-overLay text-sm font-semibold">First Name</p>
                                        <Field type="text" name="firstName" className="bg-lightGray w-5/6 focus:outline-none" />
                                        <ErrorMessage name="firstName" component="div" className="text-danger text-xs" />
                                    </div>

                                    {/* Last Name */}
                                    <div className="flex flex-col border-b-2 border-overLay items-start justify-center text-lg mb-2">
                                        <p className="text-overLay text-sm font-semibold">Last Name</p>
                                        <Field type="text" name="lastName" className="bg-lightGray w-5/6 focus:outline-none" />
                                        <ErrorMessage name="lastName" component="div" className="text-danger text-xs" />
                                    </div>

                                    {/* Phone Number */}
                                    <div className="flex flex-col border-b-2 border-overLay items-start justify-center text-lg mb-2">
                                        <p className="text-overLay text-sm font-semibold">Phone Number</p>
                                        <Field type="text" name="phoneNumber" className="bg-lightGray w-5/6 focus:outline-none" />
                                        <ErrorMessage name="phoneNumber" component="div" className="text-danger text-xs" />
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col border-b-2 border-overLay items-start justify-center text-lg mb-2">
                                        <p className="text-overLay text-sm font-semibold">Email</p>
                                        <Field type="email" name="email" className="bg-lightGray w-5/6 focus:outline-none" />
                                        <ErrorMessage name="email" component="div" className="text-danger text-xs" />
                                    </div>

                                    {/* Password */}
                                    <div className="flex flex-col border-b-2 border-overLay items-start justify-center text-lg mb-2">
                                        <p className="text-overLay text-sm font-semibold">Password</p>
                                        <div className="flex flex-row w-full">
                                            <Field type={see ? "text" : "password"} name="password" className="bg-lightGray w-5/6 focus:outline-none" />
                                            <button type="button" onClick={togglePasswordVisibility}>{see ? <IoMdEye className="text-overLay" /> : <IoMdEyeOff className="text-overLay" />}</button>
                                        </div>
                                        <ErrorMessage name="password" component="div" className="text-danger text-xs" />


                                    </div>

                                    {/* Confirm Password */}
                                    <div className="flex flex-col border-b-2 border-overLay items-start justify-center text-lg mb-2">
                                        <p className="text-overLay text-sm font-semibold">Confirm Password</p>
                                        <div className="flex flex-row w-full">
                                            <Field type={see ? "text" : "password"} name="confirmPassword" className="bg-lightGray w-5/6 focus:outline-none" />
                                            <button type="button" onClick={togglePasswordVisibility}>{see ? <IoMdEye className="text-overLay" /> : <IoMdEyeOff className="text-overLay" />}</button>

                                        </div>

                                        <ErrorMessage name="confirmPassword" component="div" className="text-danger text-xs" />
                                    </div>

                                    {/* Terms and Conditions */}
                                    <div>
                                        <Field type="checkbox" name="termsAndConditions" id="termsAndConditions" className="text-overLay bg-overLay" />
                                        <label htmlFor="termsAndConditions" className="mx-2 text-sm text-gray-600">I accept the <Link to='/termandcondition' className="text-overLay">Terms and Conditions</Link></label>
                                        <ErrorMessage name="termsAndConditions" component="div" className="text-danger text-xs" />
                                    </div>

                                    <button type="submit" className="bg-overLay font-medium p-2 text-white w-full rounded-full" disabled={isSubmitting}>{isSubmitting ? <Spinner /> : 'Sign Up'}</button>

                                    <div className="flex flex-col px-4 mt-4 items-end space-y-1">
                                        <p className="text-sm">Already have an account ? </p>
                                        <Link to="/login" className="text-lg font-bold text-overLay">Login</Link>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
