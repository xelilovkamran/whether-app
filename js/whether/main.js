import { translateOptions } from "./components/translateOptions.js";

import {
  showGeneralInformationTab,
  updateGeneralInformationTab,
} from "./components/generalInformationTab.js";

import {
  createTemperatureChart,
  createFillidTemperatureChart,
  createHumadityChart,
  createWindChart,
} from "./components/chart.js";

import { showDaysTab } from "./components/daysTab.js";

const API_KEY = `eeb9d0aadd6bdfd0f0194aba3c64ed29`;

let regionName =
  localStorage.getItem("selected region") === "Zəngilan"
    ? "Zangilan"
    : localStorage.getItem("selected region");

let URL = `https://api.openweathermap.org/data/2.5/forecast?q=${regionName}&appid=${API_KEY}&units=metric`;
let regions = localStorage.getItem("region names").split(",");
let data;

i18next.init(translateOptions);

const navBar = document.querySelector("#navbar ul");
const chart = document.querySelector("#chart");
const fiveDays = document.querySelector("#five-day");
const regionOptions = document.querySelector("#regionNames");

function createErorMessage() {
  document.querySelector(".loading").style.display = "none";
  const div = document.createElement("div");
  div.innerHTML =
    "Serverdə xəta baş verdi. Bu şəhər üçün hava məlumatı tapılmadı";
  div.classList.add("error-message");
  document.body.appendChild(div);
}

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  if (data.cod === "404") {
    createErorMessage();
  } else {
    return data;
  }
}

function createRegionSelection() {
  for (let i = 0; i < regions.length; i++) {
    if (
      regions[i] === "abşeron" ||
      regions[i] === "kürdəmir" ||
      regions[i] === "şabran"
    ) {
      regions.splice(i, 1);
      i--;
    }
  }
  regions.forEach((region) => {
    const option = document.createElement("option");
    option.innerHTML = region;
    if (region === regionName.toLowerCase()) {
      option.setAttribute("selected", true);
    }
    regionOptions.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  data = await fetchData(URL);
  showDaysTab(data);
  showGeneralInformationTab(data);
  createTemperatureChart(data);
  if (data) {
    document.querySelector(".loading").style.display = "none";
    document.querySelector("#main").style.display = "block";
  }
  createRegionSelection();
});

fiveDays.addEventListener("click", (e) => {
  if (e.target.id !== "five-day") {
    const days = document.querySelectorAll("#five-day > div");
    days.forEach((day) => {
      day.classList.remove("active");
    });
    if (e.target.parentElement.id === "five-day") {
      e.target.classList.add("active");
    } else {
      e.target.parentElement.classList.add("active");
    }
    document.querySelectorAll("li").forEach((list) => {
      list.classList.remove("selected");
    });
    document.querySelector("li").classList.add("selected");
    createTemperatureChart(data);
    showGeneralInformationTab(data);
  }
});

function removeAndAddClassName(tag, className, event) {
  document.querySelectorAll(tag).forEach((list) => {
    list.classList.remove(className);
  });
  event.target.classList.add(className);
}

navBar.addEventListener("click", (e) => {
  if (e.target.classList.contains("temp")) {
    removeAndAddClassName("li", "selected", e);
    createTemperatureChart(data);
  } else if (e.target.classList.contains("fillsTemp")) {
    removeAndAddClassName("li", "selected", e);
    createFillidTemperatureChart(data);
  } else if (e.target.classList.contains("humadity")) {
    removeAndAddClassName("li", "selected", e);
    createHumadityChart(data);
  } else if (e.target.classList.contains("wind")) {
    removeAndAddClassName("li", "selected", e);
    createWindChart(data);
  }
});

chart.addEventListener("mousemove", (e) => {
  updateGeneralInformationTab(data);
});

regionOptions.addEventListener("click", async (e) => {
  if (e.target.value !== regionName.toLowerCase()) {
    regionName = e.target.value;
    URL = `https://api.openweathermap.org/data/2.5/forecast?q=${regionName}&appid=${API_KEY}&units=metric`;
    data = await fetchData(URL);
  }
  showDaysTab(data);
  showGeneralInformationTab(data);
  createTemperatureChart(data);
});

export { regionName, data };
