import "./styles.css";
import { getWeather } from "./get-weather-fn.js";

(function siteLoad() {
  const location = document.querySelector("#location");
  const getWeatherBtn = document.querySelector(".get-weather-btn");

  location.addEventListener("input", () => {
    location.setCustomValidity("");
  });

  getWeatherBtn.addEventListener("click", (e) => {
    if (location.validity.valueMissing) {
      location.setCustomValidity("Umm you forgot something \u{1F480}");
    } else {
      e.preventDefault();
      const weatherDiv = document.querySelector(".weather-div");
      weatherDiv.textContent = "";
      const loading = document.createElement("p");
      loading.classList.add("loading");
      loading.textContent = "loading, brb...";
      weatherDiv.append(loading);
      getWeather(location.value)
        .then((data) => {
          weatherDiv.textContent = "";

          // leaving the console.log fn below in case it's needed in the future
          // console.log(data);

          function isCity(string) {
            const regex = /^[a-zA-Z]/;
            return regex.test(string);
          }

          const vibeDiv = document.createElement("div");
          vibeDiv.classList.add("vibe-div");
          const vibeDivLine1 = document.createElement("p");
          let line1Preposition;
          if (isCity(location.value)) {
            line1Preposition = "in";
          } else {
            line1Preposition = "at";
          }
          const line1Span = document.createElement("span");
          line1Span.textContent = ` ${data.location}`;
          vibeDivLine1.append(
            `The vibes `,
            line1Preposition,
            line1Span,
            ` are:`,
          );
          vibeDiv.appendChild(vibeDivLine1);
          const vibeDivLine2 = document.createElement("div");
          vibeDivLine2.classList.add("vibe-line");
          const weatherIconDiv1 = document.createElement("div");
          const weatherIcon1 = document.createElement("img");
          const weatherIconDiv2 = document.createElement("div");
          const weatherIcon2 = document.createElement("img");
          import(`./weather-icons/${data.icon}.svg`)
            .then((icon) => {
              weatherIcon1.src = icon.default;
              weatherIcon1.setAttribute(
                "alt",
                `Icon for ${data.conditions} weather conditions`,
              );
              weatherIcon2.src = icon.default;
              weatherIcon2.setAttribute(
                "alt",
                `Icon for ${data.conditions} weather conditions`,
              );
            })
            .catch((error) => console.error(error));
          weatherIconDiv1.append(weatherIcon1);
          weatherIconDiv2.append(weatherIcon2);
          const conditionsText = document.createElement("div");
          conditionsText.textContent = `~${data.conditions}~`;
          vibeDivLine2.append(weatherIconDiv1, conditionsText, weatherIconDiv2);
          vibeDiv.appendChild(vibeDivLine2);
          const vibeDivLine3 = document.createElement("p");
          vibeDivLine3.textContent = `Sources say: ${data.description}`;
          vibeDiv.append(vibeDivLine3);
          weatherDiv.appendChild(vibeDiv);

          if (data.alerts.length !== 0) {
            const alertDiv = document.createElement("div");
            alertDiv.classList.add("alert-div");
            const alertLine1 = document.createElement("p");
            alertLine1.textContent = `\uD83D\uDEA8\u00A0 FYI, ${data.alerts.length} live alert(s):`;
            alertDiv.append(alertLine1);
            for (const alert of data.alerts) {
              const alertP = document.createElement("p");
              const alertSpan = document.createElement("span");
              alertSpan.textContent = `${alert.event}: `;
              alertP.append(alertSpan, `${alert.headline}`);
              alertDiv.append(alertP);
            }
            weatherDiv.appendChild(alertDiv);
          }

          const weatherDetailsDiv = document.createElement("div");
          weatherDetailsDiv.classList.add("weather-details-div");
          const leftColumn = document.createElement("div");
          leftColumn.classList.add("column");
          const temp = document.createElement("div");
          const temp1 = document.createElement("p");
          temp1.textContent = "Temperature rn:";
          const temp2 = document.createElement("p");
          temp2.textContent = `${data.temp}\u00B0F`;
          temp.append(temp1, temp2);
          const feelsLike = document.createElement("div");
          const feelsLike1 = document.createElement("p");
          feelsLike1.textContent = "Feels like fr:";
          const feelsLike2 = document.createElement("p");
          feelsLike2.textContent = `${data.feelsLike}\u00B0F`;
          feelsLike.append(feelsLike1, feelsLike2);
          const humidity = document.createElement("div");
          const humidity1 = document.createElement("p");
          humidity1.textContent = "Humidity:";
          const humidity2 = document.createElement("p");
          humidity2.textContent = `${data.humidity}%`;
          humidity.append(humidity1, humidity2);
          leftColumn.append(temp, feelsLike, humidity);
          const rightColumn = document.createElement("div");
          rightColumn.classList.add("column");
          const precipDiv = document.createElement("div");
          precipDiv.classList.add("precip-div");
          const precipCheck = document.createElement("div");
          const precipCheck1 = document.createElement("p");
          precipCheck1.textContent = "Is it precipitatin rn?";
          const precipCheck2 = document.createElement("p");
          if (data.precipitationType === null) {
            precipCheck2.textContent = `nah \u{1F60C}`;
          } else {
            precipCheck2.textContent = `yes \u{1F615}`;
          }
          precipCheck.append(precipCheck1, precipCheck2);
          precipDiv.append(precipCheck);
          if (data.precipitationType !== null) {
            const precipType = document.createElement("div");
            const precipType1 = document.createElement("p");
            precipType1.textContent = `Precipitation type:`;
            const precipType2 = document.createElement("p");
            precipType2.textContent = `${data.precipitationType}`;
            precipType.append(precipType1, precipType2);
            const precipLevel = document.createElement("div");
            const precipLevel1 = document.createElement("p");
            const precipLevel2 = document.createElement("p");
            if (data.precipitationType === "snow") {
              precipLevel1.textContent = `Snow level:`;
              precipLevel2.textContent = `${data.snow} in.`;
            } else {
              precipLevel1.textContent = `Precipitation level:`;
              precipLevel2.textContent = `${data.precipitation} in.`;
            }
            precipLevel.append(precipLevel1, precipLevel2);
            precipDiv.append(precipType, precipLevel);
          }
          const sunrise = document.createElement("div");
          const sunrise1 = document.createElement("p");
          sunrise1.textContent = "Sunrise:";
          const sunrise2 = document.createElement("p");
          sunrise2.textContent = `${data.sunrise.slice(1, 5)} AM (${data.timeZone} time)`;
          sunrise.append(sunrise1, sunrise2);
          const sunset = document.createElement("div");
          const sunset1 = document.createElement("p");
          sunset1.textContent = "Sunset:";
          const sunset2 = document.createElement("p");
          const sunsetHour = Number(data.sunset.slice(0, 2));
          const newSunsetHourString = (sunsetHour - 12).toString();
          const newSunsetString = newSunsetHourString + data.sunset.slice(2, 5);
          sunset2.textContent = `${newSunsetString} PM (${data.timeZone} time)`;
          sunset.append(sunset1, sunset2);
          rightColumn.append(precipDiv, sunrise, sunset);
          weatherDetailsDiv.append(leftColumn, rightColumn);
          weatherDiv.append(weatherDetailsDiv);
        })
        .catch(() => {
          const errorMessageDiv = document.createElement("div");
          errorMessageDiv.classList.add("error-message-div");
          const errorMessage1 = document.createElement("p");
          errorMessage1.textContent = `No vibes found \u{1F643}`;
          const errorMessage2 = document.createElement("p");
          errorMessage2.textContent = `Try leveling up your search.`;
          errorMessageDiv.append(errorMessage1, errorMessage2);
          weatherDiv.append(errorMessageDiv);
        });
    }
  });
})();
