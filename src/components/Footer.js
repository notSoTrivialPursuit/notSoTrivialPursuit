import React from 'react';

const Footer = () => {
	return (
		<footer>
			<p>
				&copy; 2019{' '}
				<a
					href='https://www.alexandralim.dev'
					target='_blank'
					rel='noopener noreferrer'
				>
					Alex
					</a>
				,{' '}
				<a
					href='https://anamorales.dev/'
					target='_blank'
					rel='noopener noreferrer'
				>
					Ana
					</a>
				,{' '}
				<a
					href='https://www.danielfitz.com'
					target='_blank'
					rel='noopener noreferrer'
				>
					Dan
					</a>
				, and{' '}
				<a
					href='http://www.pujacodes.com/'
					target='_blank'
					rel='noopener noreferrer'
				>
					Puja
					</a>
			</p>
			<p>
				Powered by{' '}
				<a
					href='https://opentdb.com/api_config.php'
					target='_blank'
					rel='noopener noreferrer'
				>
					Open Trivia Database API
					</a>
			</p>
		</footer >
	);
}

export default Footer;