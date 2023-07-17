import { chartOptions } from "./chartOptions.js";

function resetChartOptions() {
  chartOptions.xaxis.categories.length = 0;
  chartOptions.series[0].data.length = 0;
  chartOptions.stroke.colors.length = 0;
  chartOptions.xaxis.labels.style.colors.length = 0;
  chartOptions.fill.colors.length = 0;
}

function createTemperatureChart(data) {
  if (data && data.list) {
    document.querySelector("#chart").innerHTML = "";
    resetChartOptions();
    chartOptions.stroke.colors.push("yellow");
    chartOptions.series[0].name = "Temperatur";
    chartOptions.fill.colors.push("#f6ea09");
    chartOptions.title.text = "Ölçü Vahidi (°C)";
    chartOptions.title.style.color = "#a4ac35";
    const selectedDay = document.querySelector(".active .name-of-day");
    for (let i = 0; i < data.list.length; i++) {
      const day = new Date(data.list[i].dt_txt).toLocaleString("az", {
        weekday: "long",
      });
      if (day === selectedDay.innerHTML) {
        const hour = new Date(data.list[i].dt_txt).getHours() + ":00";

        chartOptions.xaxis.categories.push(hour);
        chartOptions.series[0].data.push(Math.round(data.list[i].main.temp));
        chartOptions.xaxis.labels.style.colors.push("#fff");
      }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), chartOptions);

    chart.render();
  }
}

function createFillidTemperatureChart(data) {
  document.querySelector("#chart").innerHTML = "";
  resetChartOptions();
  chartOptions.stroke.colors.push("yellow");
  chartOptions.series[0].name = "Hissedilən";
  chartOptions.fill.colors.push("#f6ea09");
  chartOptions.title.text = "Ölçü Vahidi (°C)";
  chartOptions.title.style.color = "#a4ac35";

  const selectedDay = document.querySelector(".active .name-of-day");
  for (let i = 0; i < data.list.length; i++) {
    const day = new Date(data.list[i].dt_txt).toLocaleString("az", {
      weekday: "long",
    });
    if (day === selectedDay.innerHTML) {
      const hour = new Date(data.list[i].dt_txt).getHours() + ":00";

      chartOptions.xaxis.categories.push(hour);
      chartOptions.series[0].data.push(
        Math.round(data.list[i].main.feels_like)
      );
      chartOptions.xaxis.labels.style.colors.push("#fff");
    }
  }

  var chart = new ApexCharts(document.querySelector("#chart"), chartOptions);

  chart.render();
}

function createHumadityChart(data) {
  document.querySelector("#chart").innerHTML = "";
  resetChartOptions();
  chartOptions.stroke.colors.push("#f0f1f2");
  chartOptions.series[0].name = "Rütubət";
  chartOptions.fill.colors.push("#b2c8ef");
  chartOptions.title.text = "Ölçü Vahidi (%)";
  chartOptions.title.style.color = "#828b98";

  const selectedDay = document.querySelector(".active .name-of-day");
  for (let i = 0; i < data.list.length; i++) {
    const day = new Date(data.list[i].dt_txt).toLocaleString("az", {
      weekday: "long",
    });
    if (day === selectedDay.innerHTML) {
      const hour = new Date(data.list[i].dt_txt).getHours() + ":00";

      chartOptions.xaxis.categories.push(hour);
      chartOptions.series[0].data.push(data.list[i].main.humidity);
      chartOptions.xaxis.labels.style.colors.push("#fff");
    }
  }

  var chart = new ApexCharts(document.querySelector("#chart"), chartOptions);

  chart.render();
}
function createWindChart(data) {
  document.querySelector("#chart").innerHTML = "";
  resetChartOptions();
  chartOptions.stroke.colors.push("#5084df");
  chartOptions.series[0].name = "Külək";
  chartOptions.fill.colors.push("#91b4ef");
  chartOptions.title.text = "Ölçü Vahidi (km/s)";
  chartOptions.title.style.color = "#95bafa";
  const selectedDay = document.querySelector(".active .name-of-day");
  for (let i = 0; i < data.list.length; i++) {
    const day = new Date(data.list[i].dt_txt).toLocaleString("az", {
      weekday: "long",
    });
    if (day === selectedDay.innerHTML) {
      const hour = new Date(data.list[i].dt_txt).getHours() + ":00";

      chartOptions.xaxis.categories.push(hour);
      chartOptions.series[0].data.push(data.list[i].wind.speed);
      chartOptions.xaxis.labels.style.colors.push("#fff");
    }
  }

  var chart = new ApexCharts(document.querySelector("#chart"), chartOptions);

  chart.render();
}

export {
  resetChartOptions,
  createTemperatureChart,
  createFillidTemperatureChart,
  createHumadityChart,
  createWindChart,
};
