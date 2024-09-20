import React from 'react';
import './App.scss';

const App = () => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4'>
			<div className='bg-white rounded-lg shadow-xl p-8 max-w-md w-full'>
				<h1 className='text-4xl font-bold text-center mb-6 text-gray-800'>
					Base React App
				</h1>
				<p className='text-center text-lg text-gray-600 mb-6'>
					Implemented features include:
				</p>
				<ul className='space-y-2'>
					{[
						'Tailwind CSS Implementation',
						'CSS preprocessor (SASS)',
						'Gzip Compression',
						'Webpack Bundler',
					].map((feature, index) => (
						<li key={index} className='flex items-center space-x-2'>
							<svg
								className='w-5 h-5 text-green-500'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M5 13l4 4L19 7'
								></path>
							</svg>
							<span className='text-gray-700'>{feature}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;
