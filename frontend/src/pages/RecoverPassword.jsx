import { FaKey } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BackGround from "../assets/welcomePage-backgroundImage.jpg";
import { useChangePasswordMutation } from "../slices/userApiSlice";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify'


const RecoverPassword = () => {
    const { userId, resetString } = useParams();
    const navigate = useNavigate();
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const [see, setSee] = useState(false);

    const initialValues = {
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required")
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                "Password must contain at least one uppercase letter and one number"
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
    });

    const onSubmit = async (values) => {
        const { password, confirmPassword } = values;
        console.log(password, confirmPassword, userId, resetString)

        try {
            const res = await changePassword({
                password,
                confirmPassword,
                userId,
                resetString,
            });
            if (res.error) {
                toast.error(res.error.data.message);
                console.log(res.error.data.message)
            } else {
                navigate('/login');
                toast.success('Password Reset Successful, Please Log In To Continue');
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message)
        }
    }

    return (
        <div className="">
            <ToastContainer />
            {/* Your JSX */}
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
                <div className="bg-transparent  h-screen overflow-hidden flex items-center justify-center pt-20">
                    <div className="bg-white w-screen h-full shadow-3xl rounded-t-3xl">
                        <div className="flex flex-col items-center bg-lightGray shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4">
                            <FaKey className="text-4xl text-overLay " />
                            <p className="font-bold">Recover Password</p>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {(formik) => (
                                <Form className="pt-10 p-10 flex flex-col">
                                    <div className="flex flex-col border-b-2 border-overLay w-full  items-start text-lg mb-2 pt-2">
                                        <p className="text-overLay font-semibold">Password</p>
                                        <div className="flex w-screen ">
                                            <Field
                                                type={see ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                className="bg-lightGray border-overLay w-4/6 focus:outline-none  "
                                            />
                                            <button onClick={() => setSee(!see)}>
                                                {see ? (
                                                    <IoMdEye className="text-overLay" />
                                                ) : (
                                                    <IoMdEyeOff className="text-overLay" />
                                                )}
                                            </button>
                                        </div>
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className="flex flex-col  border-b-2 border-overLay w-full items-start text-lg mb-8 pt-2">
                                        <p className="text-overLay font-semibold">
                                            Confirm Password
                                        </p>
                                        <div className="flex w-screen ">
                                            <Field
                                                type={see ? "text" : "password"}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                className="bg-lightGray border-overLay w-4/6 focus:outline-none  "
                                            />
                                            <button onClick={() => setSee(!see)}>
                                                {see ? (
                                                    <IoMdEye className="text-overLay" />
                                                ) : (
                                                    <IoMdEyeOff className="text-overLay" />
                                                )}
                                            </button>
                                        </div>
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-overLay font-medium p-2  text-white uppercase w-full rounded-full"
                                    >
                                        Change Password
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecoverPassword;
