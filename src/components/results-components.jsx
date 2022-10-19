import { useAutoAnimate } from '@formkit/auto-animate/react';
import Loader from './loader';

export default function Results({ results, isLoaded }) {
	const [parent] = useAutoAnimate();

	return (
		<div className='Results'>
			<div className='result-container' ref={parent}>
				{!isLoaded && <Loader />}
				{isLoaded && results && (
					<>
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
		</div>
	);
}
