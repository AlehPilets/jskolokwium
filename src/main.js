import { fetchExchangeRates } from "./app/app.js";

const ctx = document.getElementById('currencyChart').getContext('2d');
let chart = null;

function renderChart(rates, selectedCurrencies){
	const labels = selectedCurrencies;
	const data = selectedCurrencies.map(currency => rates[currency]);
	
	if (chart) {
		chart.destroy();		
	}

	chart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				label: 'Kurs względem waluty bazowej',
				data: data,
				backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
			}]
		},
		options: {
		responsive: true,
		scales: {
			y: {
				beginAtZero: true
			}
		}
		}
	})
}

async function updateChart() {
	const base = document.getElementById('baseCurrency').value;
	
	const checkboxes = document.querySelectorAll('input[type="checkbox"]');
	const selectedCurrencies = Array.from(checkboxes)
		.filter(checkbox => checkbox.checked && checkbox.value !== base)
		.map(checkbox => checkbox.value);

	const rates = await fetchExchangeRates(base);
	if(rates){
		const filteredRates = {};
		selectedCurrencies.forEach(currency => {
			filteredRates[currency] = rates[currency];
		});

		renderChart(filteredRates, selectedCurrencies);
	}
}

document.getElementById('baseCurrency').addEventListener('change', updateChart);

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', updateChart);
});

updateChart();