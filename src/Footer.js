import React from 'react';

const Footer = () => {
    return (
			<footer>
				<p>
					Built in 2019 by{" "}
					<a
						href='https://www.alexandralim.dev'
						target='_blank'
						rel='noopener noreferrer'
					>
						Alexandra Lim
					</a>
					,{" "}
					<a
						href='https://anamorales.dev/'
						target='_blank'
						rel='noopener noreferrer'
					>
						Ana Morales
					</a>
					,{" "}
					<a
						href='https://www.danielfitz.com'
						target='_blank'
						rel='noopener noreferrer'
					>
						Dan Fitz
					</a>
					, and{" "}
					<a
						href='http://http://www.pujacodes.com/'
						target='_blank'
						rel='noopener noreferrer'
					>
						Puja Neupane
					</a>
				</p>
				<p>
					Powered by{" "}
					<a
						href='https://opentdb.com/api_config.php'
						target='_blank'
						rel='noopener noreferrer'
					>
						Open Trivia Database API
					</a>
				</p>
			</footer>
		);
}

export default Footer;