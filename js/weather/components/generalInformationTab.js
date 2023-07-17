import { regionName } from "../main.js";

const regionNameArea = document.querySelector(".right-side .region-name");
const selectedTimeWeatherIcon = document.querySelector(".img-container img");
const temperatureArea = document.querySelector(".left-side h3");
const selectedTimeArea = document.querySelector(".right-side .time");
const weatherConditionArea = document.querySelector(".right-side .weather");

function showGeneralInformationTab(data) {
  if (data && data.list) {
    regionNameArea.innerHTML = regionName;
    const selectedDay = document.querySelector(".active .name-of-day");
    for (let i = 0; i < data.list.length; i++) {
      const day = new Date(data.list[i].dt_txt).toLocaleString("az", {
        weekday: "long",
      });
      if (day === selectedDay.innerHTML) {
        selectedTimeWeatherIcon.src = `../../assets/svg/${data.list[i].weather[0].icon}.svg`;
        temperatureArea.innerHTML = `${Math.round(
          data.list[i].main.temp
        )} <span>°C</span>`;
        const hour = new Date(data.list[i].dt_txt).getHours() + ":00";
        selectedTimeArea.innerHTML = `${day} - ${hour}`;
        weatherConditionArea.innerHTML = i18next.t(
          data.list[i].weather[0].description
        );
        break;
      }
    }
  }
}

function updateGeneralInformationTab(data) {
  if (document.querySelector(".apexcharts-tooltip-title")) {
    const hour = document.querySelector(".apexcharts-tooltip-title").innerHTML;
    const dayName = document.querySelector(".active .name-of-day").innerHTML;
    const selectedTimeInformation = data.list.find((element) => {
      const date = new Date(element.dt_txt);
      const day = date.toLocaleString("az", {
        weekday: "long",
      });
      const selectedTime = `${date.getHours()}:00`;
      if (day === dayName && selectedTime === hour) {
        return element;
      }
    });

    if (hour && selectedTimeInformation) {
      temperatureArea.innerHTML = `${Math.round(
        selectedTimeInformation.main.temp
      )} <span>°C</sapn>`;
      selectedTimeArea.innerHTML = `${dayName} - ${hour}`;
      weatherConditionArea.innerHTML = i18next.t(
        selectedTimeInformation.weather[0].description
      );
      selectedTimeWeatherIcon.src = `../../assets/svg/${selectedTimeInformation.weather[0].icon}.svg`;
    }
  }
}

export { showGeneralInformationTab, updateGeneralInformationTab };
