const nameOfDay = document.querySelectorAll("#five-day .name-of-day");
const dayWeatherIcon = document.querySelectorAll("#five-day  img");
const dayMinmaxTemp = document.querySelectorAll("#five-day .min-max");

function showDaysTab(data) {
  if (data && data.list) {
    // * SHOW NAME OF DAY
    let dayNumber = 1;
    let i;
    if (data.list[0].dt_txt.includes("21:00:00")) {
      i = 1;
    } else {
      i = 0;
    }
    nameOfDay[0].innerHTML = new Date(data.list[i++].dt_txt).toLocaleString(
      "az",
      {
        weekday: "long",
      }
    );
    for (i; i < data.list.length; i++) {
      if (data.list[i].dt_txt.includes("00:00:00")) {
        nameOfDay[dayNumber++].innerHTML = new Date(
          data.list[i].dt_txt
        ).toLocaleString("az", {
          weekday: "long",
        });
        if (dayNumber === 5) {
          break;
        }
      }
    }

    // * SHOW WHETHER ICON OF DAY
    dayNumber = 0;
    const icons = [];
    if (data.list[0].dt_txt.includes("21:00:00")) {
      i = 1;
    } else {
      i = 0;
    }
    for (i; i < data.list.length - 1; i++) {
      icons.push(data.list[i].weather[0].icon.replace("n", "d"));
      if (data.list[i + 1].dt_txt.includes("00:00:00")) {
        icons.sort((a, b) => a.localeCompare(b));
        let max = 0;
        let count = 1;
        let icon;
        for (let i = 0; i < icons.length; i++) {
          if (icons[i] === icons[i + 1]) {
            count++;
          } else {
            if (count > max) {
              max = count;
              icon = icons[i];
            }
            count = 1;
          }
        }

        dayWeatherIcon[dayNumber++].src = `../../assets/svg/${icon}.svg`;

        icons.length = 0;
      }
      if (dayNumber === 5) {
        break;
      }
    }

    if (dayNumber !== 5) {
      icons.push = data.list[39].weather[0].icon.replace("n", "d");
      icons.sort((a, b) => a.localeCompare(b));
      let max = 0;
      let count = 1;
      let icon;
      for (let i = 0; i < icons.length; i++) {
        if (icons[i] === icons[i + 1]) {
          count++;
        } else {
          if (count > max) {
            max = count;
            icon = icons[i];
          }
          count = 1;
        }
      }

      dayWeatherIcon[dayNumber].src = `../../assets/svg/${icon}.svg`;
    }

    // * SHOW WHETHER MAX AND MIN
    dayNumber = 0;
    const minTemps = [];
    const maxTemps = [];
    if (data.list[0].dt_txt.includes("21:00:00")) {
      i = 1;
    } else {
      i = 0;
    }
    for (i; i < data.list.length - 1; i++) {
      minTemps.push(Math.round(data.list[i].main.temp_min));
      maxTemps.push(Math.round(data.list[i].main.temp_max));
      if (data.list[i + 1].dt_txt.includes("00:00:00")) {
        dayMinmaxTemp[dayNumber++].innerHTML = `${Math.max(
          ...maxTemps
        )} /<span>&nbsp;${Math.min(...minTemps)}</span>`;
        minTemps.length = 0;
        maxTemps.length = 0;
      }
      if (dayNumber === 5) {
        break;
      }
    }

    if (dayNumber !== 5) {
      minTemps.push(Math.round(data.list[39].main.temp_min));
      maxTemps.push(Math.round(data.list[39].main.temp_max));
      dayMinmaxTemp[4].innerHTML = `${Math.max(
        ...maxTemps
      )} /<span>&nbsp;${Math.min(...minTemps)}</span>`;
      minTemps.length = 0;
      maxTemps.length = 0;
    }
  }
}

export { showDaysTab };
