import weather_items from './utils/constants';

const Items = (props) => {
	const k = props.ok;
	return (
		<div className='Items-to-bring'>
			<h2> Items you should bring </h2>
			<div className='Items-box'>
				{weather_items[k].items.map((item) => (
					<img
						className='item'
						key={item}
						src={require(`./assets/${item}.png`)}
						alt={`${item}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Items;
