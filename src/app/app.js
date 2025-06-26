export async function fetchExchangeRates(base = 'PLN') {
	const url = `https://api.frankfurter.app/latest?from=${base}&to=EUR,USD,PLN`;

	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error('Error');
		const data = await response.json();
		return data.rates;
	} catch (error) {
		console.error('API Error: ', error);
		return null;
	}
}