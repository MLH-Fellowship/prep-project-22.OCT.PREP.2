const apiKey =  process.env.GEO_API_KEY;
export const geoApiOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6a70f37b5dmsh66ea700b1675d79p13405djsn02ef84b46652',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";