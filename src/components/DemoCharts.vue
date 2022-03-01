<template>
  <div class="demo-chart">
    <div>
      <h4 class="subtitle is-4">Displaying Chart Using Demo JSON</h4>
      <h6 class="subtitle is-6 mt-0">
        Displaying this chart using demo JSON data because we are not getting
        sufficient amount of data from alphavantage<a
          href="https://www.alphavantage.co/documentation/"
        >
          API
        </a>
      </h6>
    </div>
    <div class="demo-data" v-if="chartOptions.series[0].data">
      <vue-highcharts
        :constructor-type="'stockChart'"
        :options="chartOptions"
        class="update-dempo-chart-content"
      ></vue-highcharts>
    </div>
    <div
      class="demo-data"
      v-if="smaChartData.series[0].data && smaChartData.series[1].data"
    >
      <vue-highcharts
        :constructor-type="'stockChart'"
        :options="oneData"
      ></vue-highcharts>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DemoCharts",
  data() {
    return {
      ohlc: [],
      volume: [],
      chartOptions: {
        title: {
          text: "Average monthly Rates changes",
        },
        subtitle: {
          text: "Values are changing",
        },
        // chart: {
        //   type: "candlestick",
        // },
        xAxis: {
          title: {
            text: "Period",
          },
          categories: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        yAxis: {
          title: {
            text: "Values",
          },
        },
        rangeSelector: {
          buttons: [
            {
              type: "hour",
              count: 1,
              text: "1h",
            },
            {
              type: "day",
              count: 1,
              text: "1D",
            },
            {
              type: "all",
              count: 1,
              text: "All",
            },
          ],
          selected: 1,
          inputEnabled: false,
        },
        series: [
          {
            name: "",
            type: "candlestick",
            data: null,
            tooltip: {
              valueDecimals: 2,
            },
          },
        ],
      },
      smaChartData: {
        rangeSelector: {
          selected: 2,
        },

        title: {
          text: "AAPL Historical",
        },

        subtitle: {
          text: "With SMA and Volume by Price technical indicators",
        },
        yAxis: [
          {
            startOnTick: false,
            endOnTick: false,
            labels: {
              align: "right",
              x: -3,
            },
            title: {
              text: "OHLC",
            },
            height: "60%",
            lineWidth: 2,
            resize: {
              enabled: true,
            },
          },
          {
            labels: {
              align: "right",
              x: -3,
            },
            title: {
              text: "Volume",
            },
            top: "65%",
            height: "35%",
            offset: 0,
            lineWidth: 2,
          },
        ],

        tooltip: {
          split: true,
        },

        plotOptions: {
          series: {
            dataGrouping: {
              units: null,
            },
          },
        },

        series: [
          {
            type: "candlestick",
            name: "AAPL",
            id: "aapl",
            zIndex: 2,
            data: null,
          },
          {
            type: "column",
            name: "Volume",
            id: "volume",
            data: null,
            yAxis: 1,
          },
          {
            type: "vbp",
            linkedTo: "aapl",
            params: {
              volumeSeriesID: "volume",
            },
            dataLabels: {
              enabled: false,
            },
            zoneLines: {
              enabled: false,
            },
          },
          {
            type: "sma",
            linkedTo: "aapl",
            zIndex: 1,
            marker: {
              enabled: false,
            },
          },
        ],
      },
    };
  },
  async mounted() {
    await this.getSeriesData();
  },
  methods: {
    getSeriesData() {
      axios
        .get(
          "https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/new-intraday.json"
        )
        .then((response) => {
          this.chartOptions.series[0].data = response.data;
          this.chartOptions.series[0].name = "AAPL";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-chart {
  font-weight: 800;
  font-size: 20px;
  margin: 0 20px;
  padding-top: 30px;
  padding-bottom: 50px;
}
.demo-data {
  margin-top: 30px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.update-dempo-chart-content {
  border-radius: 10px;
  box-shadow: 0 0 5px 1px grey;
}
h4 {
  font-weight: 600;
  margin-bottom: 0.5rem !important;
}
</style>
