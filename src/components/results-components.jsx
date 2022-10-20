import { useAutoAnimate } from '@formkit/auto-animate/react';
import Loader from './loader';
import Lottie from 'lottie-react';
import React from 'react';
import weather_items from '../utils/constants';

export default function Results({ results, isLoaded }) {
	const [parent] = useAutoAnimate({
		easing: 'ease-in-out',
	});

	return (
		<div className='Results' ref={parent}>
			{!isLoaded && <Loader />}
			{isLoaded && results && (
				<>
					<Lottie
						style={{ width: 250, height: 250 }}
						animationData={weather_items[results.weather[0].main].lottie}
						loop
					/>
					<h3>{results.weather[0].main}</h3>
					<p>Feels like {results.main.feels_like}°C</p>
					<i>
						<p>
							{results.name}, {results.sys.country}
						</p>
					</i>
				</>
			)}
		</div>
	);
}
