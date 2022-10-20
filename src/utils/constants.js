import sun from '../assets/lottie-files/sun-laughing-emoji.json';
import rain from '../assets/lottie-files/rain-icon.json';
import snow from '../assets/lottie-files/snow.json';
import clouds from '../assets/lottie-files/weather-windy.json';
import thunder from '../assets/lottie-files/weather-storm.json';
import winds from '../assets/lottie-files/windy-new-color.json';
import mist from '../assets/lottie-files/weather-day-mist.json';

const weather_items = {
	Clear: {
		items: ['sunglasses', 'sunscreen'],
		lottie: sun,
	},

	Rain: {
		items: ['umbrella', 'coat'],
		lottie: rain,
	},
	Drizzle: {
		items: ['umbrella', 'coat'],
		lottie: rain,
	},
	Clouds: {
		items: ['umbrella', 'coat'],
		lottie: clouds,
	},
	Snow: {
		items: ['coat', 'umbrella'],
		lottie: snow,
	},

	Tornado: {
		items: ['flashlight', 'firstaid'],
		lottie: winds,
	},
	Thunderstorm: {
		items: ['first-aid', 'cannedfood'],
		lottie: thunder,
	},

	Squall: {
		items: ['goggles', 'mask'],
		lottie: clouds,
	},
	Ash: {
		items: ['goggles', 'mask'],
		lottie: mist,
	},
	Dust: {
		items: ['goggles', 'mask'],
		lottie: mist,
	},
	Smoke: {
		items: ['goggles', 'mask'],
		lottie: mist,
	},
	Haze: {
		items: ['goggles', 'mask'],
		lottie: mist,
	},
	Fog: {
		items: ['goggles', 'mask'],
		lottie: mist,
	},
	Mist: {
		items: ['goggles', 'mask'],
		lottie: mist,
	},
	Sand: {
		items: ['goggles', 'mask'],
		lottie: mist,
	},
};

export default weather_items;
