
const apiKey = 'b438e216c6538eabde5fc556a9a19826';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const city = 'Tucson,AZ';
const units = 'metric'; 
async function fetchWeather() {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&units=${units}&appid=${apiKey}`);
        const data = await response.json();
        displayForecast(data.list);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayForecast(forecastData) {
    const forecastContainer = document.getElementById('forecast-container');

    forecastData.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = item.main.temp;
        const description = item.weather[0].description;

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        forecastCard.innerHTML = `
            <p>${day}</p>
            <p>${temp}°C</p>
            <p>${description}</p>
        `;

        forecastContainer.appendChild(forecastCard);
    });
}

fetchWeather();