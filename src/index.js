import "./styles.css";

async function getWeather(location) {
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

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${formattedLocation}?key=BE4LHN4XH2WFAA3FXBB5GL4PE`;

  try {
    const response = await fetch(url, { mode: "cors" });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}
