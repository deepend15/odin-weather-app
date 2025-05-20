import "./styles.css";
import { getWeather } from "./get-weather-fn.js";

const location = document.querySelector("#location");
const getWeatherBtn = document.querySelector(".get-weather-btn");

location.addEventListener("input", () => {
  location.setCustomValidity("");
})

getWeatherBtn.addEventListener("click", (e) => {
  if (location.validity.valueMissing) {
    location.setCustomValidity("Umm you forgot something \u{1F480}");
  } else {
    e.preventDefault();
    getWeather(location.value).then((data) => console.log(data));
  }
})