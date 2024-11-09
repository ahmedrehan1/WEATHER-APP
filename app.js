// Event listener for 'Send' button in the chatbot
// Event listener for 'Send' button in the chatbot
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('send-btn').addEventListener('click', processUserInput);
});

function processUserInput() {
  const userInput = document.getElementById('user-input').value;
  const chatOutput = document.getElementById('chat-output');
  
  // Add user input to chat
  chatOutput.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

  // If the user asks about the weather in a specific city
  if (userInput.toLowerCase().includes("weather")) {
    const city = extractCityFromQuery(userInput);
    if (city) {
      getWeather(city);  // Pass city to getWeather
    } else {
      chatOutput.innerHTML += `<p><strong>AI:</strong> Please specify a city.</p>`;
    }
  } else {
    chatOutput.innerHTML += `<p><strong>AI:</strong> I can help with weather information. Ask me about the weather!</p>`;
  }

  document.getElementById('user-input').value = ''; // Clear input field
}

function extractCityFromQuery(query) {
  const cityMatch = query.match(/in (\w+)/);
  return cityMatch ? cityMatch[1] : null;
}


async function getWeather(city) {
  const apiKey = 'f24847b4ebdd69f0d29bd52c839e6cb3';  // Replace with your actual OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');
    
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    document.getElementById('weather-result').innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

function displayWeather(data) {
  const weatherResult = document.getElementById('weather-result');
  weatherResult.innerHTML = `
    <p><strong>City:</strong> ${data.name}</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
  `;
}
