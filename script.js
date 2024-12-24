document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeather = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const errorDisplay = document.getElementById("error-message");

    const API_KEY = "b5c063d731eaeca7d8d2ed92ab951223";

    getWeather.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if(!city) return;
        
        // it may throw an error
        // server/database is always in another continent

        try {
            const weatherData = await fetchWeather(city);
            displayWeather(weatherData);
            
        } catch (error) {
            errorMessage();
        }

    })

    async function fetchWeather(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        console.log(typeof(response));
        console.log("Response", response);

        if(!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json();
        return data;
    }

    function displayWeather(data){
        console.log(data);
        const {name, main, weather} = data;
        cityName.textContent = name;
        temperature.textContent = `Temperature: ${main.temp}`;
        description.textContent = `Weather: ${weather[0].description}`;
        
        // unlock the display
        weatherInfo.classList.remove("hidden");
        errorDisplay.classList.add("hidden");
    }

    function errorMessage(){
        weatherInfo.classList.add("hidden");
        errorDisplay.classList.remove("hidden");
        cityName.textContent = "";
        temperature.textContent = "";
        description.textContent = "";
    }
    

})