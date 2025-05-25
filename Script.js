const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            weatherFnByCoords(lat, lon); // Fetch weather by coordinates
        }, () => {
            alert("Geolocation permission denied. Please enter a city name.");
            weatherFn('Nairobi'); // Default to a city if geolocation fails
        });
    } else {
        alert("Geolocation is not supported by this browser.");
        weatherFn('Nairobi'); // Default to a city if geolocation is not supported
    }
});

// Fetch weather by city name
async function weatherFn(cName) {
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    fetchWeather(temp);
}

// Fetch weather by coordinates
async function weatherFnByCoords(lat, lon) {
    const temp = `${url}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetchWeather(temp);
}

// Common function to fetch weather data
async function fetchWeather(temp) {
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${Math.round(data.main.temp)}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    $('#weather-info').fadeIn();
}