import { useState } from 'react';
import Menu from '../components/menu';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';

const MakePayment = () => {
	const [selected, setSelected] = useState(null);

	const toggle = (i) => {
		if (selected === i) {
			return setSelected(null);
		}

		setSelected(i);
	};

	return (
		<div className='mt-2 p-2  '>
			<Menu PageName='Make Payment' />
			<div className='mt-8 relative mb-20'>
				<p className='text-2xl text-black'>
					Kindly Message Our Financial Team
				</p>
				<p className='text-overLay'>To proceed to payment</p>
			</div>

			{data.map((item) => (
				<div
					className='mt-1 ml-1 bg-overLay p-1 rounded-lg'
					key={item.id}>
					<div className='flex  font-medium  justify-center items-center'>
						<a
							href={item.link}
							target='_blank'
							className='text-white text-sm p-3 text-center'>
							{item.title}
						</a>
					</div>
				</div>
			))}

			<p className='mt-4 text-xl text-danger'>
				Payment will be verified in less than 1 hour
			</p>
		</div>
	);
};

const data = [
	{
		id: 1,
		title: ' Udofa Michael -Financial administrator',
		link: 'https://wa.me/message/EAVJIMQTENVHP1',
	},

	{
		id: 2,
		title: ' Peter Ekanem -Financial administrator',
		link: 'https://wa.me/message/EAVJIMQTENVHP1',
	},

	{
		id: 3,
		title: ' Chris Victor -Financial administrator',
		link: 'https://wa.me/message/EAVJIMQTENVHP1',
	},

	{
		id: 4,
		title: ' Udofa Michael -Financial administrator',
		link: 'https://wa.me/message/EAVJIMQTENVHP1',
	},
];

export default MakePayment;
