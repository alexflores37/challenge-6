document.addEventListener('DOMContentLoaded', function () {
    
    async function fetchWeather(city, units) {
        const apiKey = 'b438e216c6538eabde5fc556a9a19826';
        const apiUrl = 'http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}';

        try {
            const response = await fetch(`${apiUrl}?q=${city}&units=${units}&appid=${apiKey}`);
            const data = await response.json();
            displayForecast(data.list);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }


    function handleFormSubmit(event) {
        event.preventDefault();
        const cityInput = document.getElementById('city-input');
        const unitsSelect = document.getElementById('units-select');

        const city = cityInput.value;
        const units = unitsSelect.value;

       
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = '';

      
        fetchWeather(city, units);
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

   
    const form = document.getElementById('forecast-form');
    form.addEventListener('submit', handleFormSubmit);

   
    fetchWeather('Tucson_Az', 'imperial'); 
})