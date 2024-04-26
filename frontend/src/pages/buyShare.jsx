import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import Menu from '../components/menu';
import { useNavigate } from "react-router-dom";

const BuyShare = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Menu PageName='Buy Share' />

            <Formik
                initialValues={{ amount: '' }}
                validationSchema={Yup.object().shape({
                    amount: Yup.number()
                        .min(10000, 'Minimum amount is ₦10,000')
                        .max(1000000, 'Maximum amount is ₦10,000,000')
                        .required('Amount is required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        
                        navigate('/home/makePayment');
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting, values }) => (
                    <Form className="mt-7 p-2 w-screen h-screen" >
                        <div className="flex flex-col justify-center items-center h-1/2">
                            <div>
                                <p className="text-3xl text-overLay font-semibold">Input Share Amount</p>
                            </div>
                            <div className="mt-8 flex justify-center items-center">
                            <Field name="amount">
  {({ field, form }) => (
    <input
      {...field}
      className="h-16 text-3xl border-b-2 text-center w-1/2 focus:outline-none"
      type="text"
      id="amount"
      placeholder="₦0.00"
      value={`₦${Number(field.value).toLocaleString()}`} // Format amount with commas
      onChange={(e) => {
        const numericValue = e.target.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
        form.setFieldValue(field.name, numericValue); // Update field value with parsed numeric value
      }}
    />
  )}
</Field>


                            </div>
                            <ErrorMessage name="amount" component="div" className="text-danger" />
                            <p className='text-xl text-overLay'>= {values.amount ? (values.amount / 10000).toFixed(2) : '0.00'}%</p>
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

                        <div className="mt-6 flex justify-center items-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="rounded-lg px-12 font-semibold py-3 bg-overLay text-3xl text-white"
                            >
                                {isSubmitting ? 'Please wait...' : 'Buy'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BuyShare;
