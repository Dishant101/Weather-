const search = document.querySelector(".searchText");
const searchBtn = document.querySelector(".searchBtn");
const weatherImg = document.querySelector(".weatherImg");
const temp = document.querySelector(".temp");
const description = document.querySelector(".description");
const weatherHumidity = document.querySelector(".weatherHumidity");
const windSpeed = document.querySelector(".windSpeed");
const weatherMain = document.querySelector(".weatherMain");
const locationNotFound = document.querySelector(".location-not-found");
const cityName = document.querySelector(".cityName");


function checkWeather(city) {
  const myApi = "25ea5e03d7cc38e63401b0c9950fb812";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${myApi}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.cod === "404") {
        locationNotFound.style.display = "block";
        weatherMain.style.display = "none";
        return;
      }

      locationNotFound.style.display = "none";
      weatherMain.style.display = "block";

      temp.innerHTML = `${Math.round(data.main.temp)}°C`;
      description.innerHTML = `${data.weather[0].description}`;
      weatherHumidity.innerHTML = `${data.main.humidity}%`;
      windSpeed.innerHTML = `${data.wind.speed} Km/H`;

      switch (data.weather[0].main) {
        case 'Clouds':
          weatherImg.src = "./Img/clouds.png";
          break;
        case 'Clear':
          weatherImg.src = "./Img/clear.png";
          break;
        case 'Rain':
          weatherImg.src = "./Img/rain.png";
          break;
        case 'Mist':
          weatherImg.src = "./Img/mist.png";
          break;
        case 'Snow':
          weatherImg.src = "./Img/snow.png";
          break;
        case 'broken clouds':
          weatherImg.src = "./Img/snow.png";
          break;
        default:
          weatherImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
          break;
      }
      
      weatherImg.src = "./Img/rain.png";
    })
    .catch((error) => {
      console.error('Error fetching the weather data:', error);
    });
}

searchBtn.addEventListener("click", () => {
  checkWeather(search.value);
});
