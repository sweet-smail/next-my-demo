'use client';
import { useEffect, useState } from 'react';
const BroadcastChannelPage = () => {
	const [state, setState] = useState();
	useEffect(() => {
		const channel = new BroadcastChannel('test_channel');
	}, []);
	return (
		<div>
			<input
				type='text'
				placeholder='John Doe'
				className='block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300'
			/>
			<button className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>
				Primary
			</button>
		</div>
	);
};
export default BroadcastChannelPage;
