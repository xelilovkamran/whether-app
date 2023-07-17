import data from "../../json/az.json" assert { type: "json" };
import { loadMap, writeRegionName } from "./map.js";

const listButton = document.querySelector(".options .list-btn");
const mapButton = document.querySelector(".options .map-btn");
const inputWraper = document.querySelector(".input-wraper");
const inputEl = document.querySelector("#search");
const resultArea = document.querySelector(".result");

let regions = data
  .map((city) => city.admin_name)
  .sort((a, b) => a.localeCompare(b))
  .map((city) => city.toLowerCase());

for (let i = 0; i < regions.length; i++) {
  if (regions[i] === regions[i + 1]) {
    regions.splice(i, 1);
    i--;
  }
}

localStorage.setItem("region names", regions);

function deleteElements() {
  resultArea.innerHTML = "";
}

function loadRegions(array) {
  for (let i = 0; i < array.length; i++) {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="region">
    <div class="index">${i + 1}</div>
    <div class="regionName"><a href="../weather.html" target="_self">${
      array[i].charAt(0).toUpperCase() + array[i].slice(1)
    }</a></div>
    </div>
    `;
    resultArea.appendChild(div);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadRegions(regions);
});

inputEl.addEventListener("input", () => {
  const regionName = inputEl.value.trim().toLowerCase();
  if (regionName) {
    const results = regions.filter((city) => city.startsWith(regionName));
    deleteElements();
    loadRegions(results);
  } else {
    deleteElements();
    loadRegions(regions);
  }
});

listButton.addEventListener("click", () => {
  inputWraper.style.display = "block";
  // * WE CAN DELETE IF STATEMENT
  if (![...listButton.classList].join(" ").includes("active")) {
    mapButton.classList.remove("active");
    listButton.classList.add("active");
    deleteElements();
    loadRegions(regions);
  }
});

mapButton.addEventListener("click", () => {
  inputWraper.style.display = "none";
  // * WE CAN DELETE IF STATEMENT
  if (![...mapButton.classList].join(" ").includes("active")) {
    listButton.classList.remove("active");
    mapButton.classList.add("active");
    inputEl.value = "";
  }
  loadMap();
  let svg = document.querySelector("svg");
  writeRegionName(svg);
  svg.addEventListener("click", (e) => {
    if (e.target.getAttribute("name") !== null) {
      localStorage.setItem("selected region", e.target.getAttribute("name"));
    }
  });
});

resultArea.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.contains("regionName")) {
    localStorage.setItem("selected region", e.target.textContent);
    inputEl.value = "";
  }
});
