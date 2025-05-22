export async function getWeather(location) {
  let locationArray = location.split("");

  locationArray.forEach((item, i) => {
    if (item === " ") {
      locationArray[i] = "%20";
    }
    if (item === ",") {
      locationArray[i] = "%2C";
    }
  });

  let formattedLocation = locationArray.join("");

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${formattedLocation}?key=BE4LHN4XH2WFAA3FXBB5GL4PE&iconSet=icons2`;

  try {
    const response = await fetch(url, { mode: "cors" });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    const weatherObj = {};

    weatherObj.alerts = json.alerts;
    weatherObj.conditions = json.currentConditions.conditions;
    weatherObj.feelsLike = json.currentConditions.feelslike;
    weatherObj.humidity = json.currentConditions.humidity;
    weatherObj.icon = json.currentConditions.icon;
    weatherObj.precipitation = json.currentConditions.precip;
    weatherObj.precipitationChance = json.currentConditions.precipprob;
    weatherObj.precipitationType = json.currentConditions.preciptype;
    weatherObj.snow = json.currentConditions.snow;
    weatherObj.sunrise = json.currentConditions.sunrise;
    weatherObj.sunset = json.currentConditions.sunset;
    weatherObj.temp = json.currentConditions.temp;
    weatherObj.windSpeed = json.currentConditions.windspeed;
    weatherObj.description = json.description;
    weatherObj.location = json.resolvedAddress;
    weatherObj.timeZone = json.timezone;

    return weatherObj;
  } catch (error) {
    console.error(error.message);
  }
}
