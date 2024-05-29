import { useState } from 'react';
import Menu from '../components/menu';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';

const ShareInfo = () => {
	const [selected, setSelected] = useState(null);

	const toggle = (i) => {
		if (selected === i) {
			return setSelected(null);
		}

		setSelected(i);
	};

	return (
		<div className='mt-2 p-2 '>
			<Menu PageName='Shares Information' />
			<div className='mt-8 relative'></div>

			<div className=' flex  text-md justify-center items-center h-screen'>
				<div className=' '>
					<p className=''>
						<span className='text-overLay ml-6 font-bold'>
							WaxMo{' '}
						</span>
						is a financial technology investment company that
						diversified its investment in different portfolio to
						reduce risk and maximize profits.
					</p>

					<p>
						<span className='text-overLay ml-6 font-bold'>
							Shares{' '}
						</span>
						are issued to members who wishes to be part of WaxMo
						Investors, simply visit the "Buy a Share" page on your
						dashboard to buy your preferred share amount at a
						percentage.
					</p>
					<p>Please note: shares are issued in the ratio of 10</p>
					<p>i.e 10,000,20,000,30,000 etc</p>
					<p>
						<span className='text-overLay ml-6 font-bold'>
							All{' '}
						</span>
						individuals who Sign up on WaxMo does not have an active
						share, until share is purchased with any of our
						financial team. Buying a share on WaxMo enable our
						investors earn dividend.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ShareInfo;
