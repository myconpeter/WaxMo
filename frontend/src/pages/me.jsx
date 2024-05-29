import Menu from '../components/menu';
import { useState } from 'react';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlice';

import Modal from '../components/ErrorPopUp';
import { FcCancel } from 'react-icons/fc';

const me = () => {
	const [open, setOpen] = useState(false);

	const { userInfo } = useSelector((state) => state.auth);
	const { firstName, lastName, isBankChanged } = userInfo.data;
	const fullName = firstName + ' ' + lastName;

	const [logoutApiCall] = useLogoutMutation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	// const handleClick = ()=>{
	//     console.log('lol')
	// }

	const [showModal, setShowModal] = useState(false);
	return (
		<div className='mt-3 p-2 '>
			<Menu PageName={fullName} />

			<div className='mt-8'>
				<Link
					to='/home/myAccount'
					className=' flex items-center justify-between h-8 w-full bg-darkGray rounded-md  p-3 '>
					<p className='text-overLay font-semibold text-sm '>
						My Account
					</p>

					<IoIosArrowDroprightCircle className='text-overLay' />
				</Link>
				<div className='mt-2'>
					<p className='text-black text-sm'>Settings</p>
				</div>
				<Link
					to='/home/settings'
					className=' flex items-center justify-between h-8 w-full bg-darkGray rounded-md  p-3 '>
					<p className='text-overLay font-semibold text-sm '>
						Account Setting
					</p>

					<IoIosArrowDroprightCircle className='text-overLay' />
				</Link>
				{isBankChanged ? (
					<>
						<Link
							onClick={() => setOpen(true)}
							className=' flex items-center justify-between h-8 w-full bg-darkGray mt-1 rounded-md  p-3 '>
							<p className='text-overLay font-semibold text-sm '>
								Add Bank Details
							</p>
							<IoIosArrowDroprightCircle className='text-overLay' />
						</Link>

						<main className='App'>
							<Modal
								open={open}
								onClose={() => setOpen(false)}>
								<div className='text-center w-56'>
									<FcCancel
										size={56}
										className='mx-auto text-danger'
									/>
									<div className='mx-auto my-4 w-48'>
										<h3 className='text-lg font-black text-darkGray'>
											{' '}
											Bank Details has already been added{' '}
										</h3>
										<Link
											to='/home/contact'
											className='text-sm text-overLay mt-6'>
											Contact Admin
										</Link>
									</div>
									<div className='flex gap-4'>
										<button
											className='btn btn-light w-full'
											onClick={() => setOpen(false)}>
											Cancel
										</button>
									</div>
								</div>
							</Modal>
						</main>
					</>
				) : (
					<>
						<Link
							to='/home/updateaccountdetails'
							className=' flex items-center justify-between h-8 w-full bg-darkGray mt-1 rounded-md  p-3 '>
							<p className='text-overLay font-semibold text-sm '>
								Add Bank Details
							</p>
							<IoIosArrowDroprightCircle className='text-overLay' />
						</Link>
					</>
				)}

				<div className='mt-2'>
					<p className='text-black text-sm'>Links</p>
				</div>

				<Link
					to='/home/notifications'
					className=' flex items-center justify-between h-8 w-full bg-darkGray  mt-1 rounded-md  p-3 '>
					<p className='text-overLay font-semibold text-sm '>
						Notifications
					</p>

					<IoIosArrowDroprightCircle className='text-overLay' />
				</Link>

				<Link
					to='/home/analysis'
					className=' flex items-center justify-between h-8 w-full bg-darkGray  mt-1 rounded-md  p-3 '>
					<p className='text-overLay font-semibold text-sm '>
						Analysis
					</p>

					<IoIosArrowDroprightCircle className='text-overLay' />
				</Link>

				<Link
					to='/home/infomation'
					className=' flex items-center justify-between h-8 w-full bg-darkGray  mt-1 rounded-md  p-3 '>
					<p className='text-overLay font-semibold text-sm '>
						Information
					</p>

					<IoIosArrowDroprightCircle className='text-overLay' />
				</Link>

				{/* Still Working here */}
				<Link
					to='/termandcondition'
					className=' flex items-center justify-between h-8 w-full bg-darkGray  mt-1 rounded-md  p-3 '>
					<p className='text-overLay font-semibold text-sm '>
						Transaction History
					</p>

					<IoIosArrowDroprightCircle className='text-overLay' />
				</Link>

				<Link
					to='/home/faq'
					className=' flex items-center justify-between h-8 w-full bg-darkGray  mt-1 rounded-md  p-3 '>
					<p className='text-overLay font-semibold text-sm '>
						Frequently Asked Questions
					</p>

					<IoIosArrowDroprightCircle className='text-overLay' />
				</Link>

				<Link
					to='/home/about'
					className=' flex items-center justify-between h-8 w-full bg-darkGray  mt-1 rounded-md  p-3 '>
					<p className='text-overLay font-semibold text-sm '>
						About Us
					</p>

					<IoIosArrowDroprightCircle className='text-overLay' />
				</Link>

				<Link
					to='/home/contact'
					className=' flex items-center justify-between h-8 w-full bg-darkGray  mt-1 rounded-md  p-3 '>
					<p className='text-overLay font-semibold text-sm '>
						Contact Us
					</p>

					<IoIosArrowDroprightCircle className='text-overLay' />
				</Link>

				<div
					onClick={logoutHandler}
					className='flex items-center justify-between h-8 w-full bg-danger  mt-4 mb-16 rounded-md p-3 '>
					<p className='text-black font-semibold text-sm'>Logout</p>

					<IoLogOut className='text-black' />
				</div>
			</div>
		</div>
	);
};

export default me;
