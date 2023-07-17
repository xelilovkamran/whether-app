var chartOptions = {
  chart: {
    height: 350,
    type: "area",
    animations: {
      enabled: false,
      easing: "easeinout",
      speed: 800,
    },
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
    },
    zoom: {
      enabled: false,
    },
  },
  noData: {
    text: "loading",
  },
  tooltip: {
    marker: {
      show: false,
    },
    fixed: {
      enabled: false,
      // position: "bottomLeft",
      // offsetX: 20,
      // offsetY: -20,
    },
  },

  grid: {
    show: false,
  },

  plotOptions: {
    area: {
      fillTo: "end",
    },
  },

  yaxis: {
    show: true,
    labels: {
      show: false,
    },
  },

  stroke: {
    width: 2,
    colors: [], // CHANGE
  },
  series: [
    {
      name: "", //CHANGE
      data: [], //CHANGE; derece ile yaz
    },
  ],

  xaxis: {
    categories: [],
    axisBorder: {
      height: 0,
    },
    axisTicks: {
      height: 0,
    },
    labels: {
      style: {
        colors: [],
      },
    },
  },

  markers: {
    colors: ["#fff"],
    shape: "circle",
    radius: 1,
  },

  dataLabels: {
    enabled: true,
    offsetY: -10,
    style: {
      fontSize: "10px",
      fontFamily: "Arial, Helvetica, sans-serif",
      fontWeight: 200,
      colors: ["transparent"],
    },
    background: {
      borderWidth: 0,
    },
  },

  title: {
    margin: 0,
    offsetX: 10,
    style: {
      fontSize: "16px",
      fontWeight: "bold",
    },
  },

  fill: {
    colors: [], // CHANGE
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 100],
    },
  },
};

export { chartOptions };
