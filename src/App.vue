<template>
  <div id="app">
    <trading-platform-header
      @showIntraDay="displayIntraDay()"
      @showIntraDayWithBreaks="displayIntraDayWithBreak()"
      @showIntraDayCandlestick="displayIntraDayWithCandleStick()"
    />
    <div v-if="datatObject" class="intraday-charts">
      <!-- <b-button class="intraday" type="is-success" @click="displayIntraDay()"
        >Intraday Intraday</b-button
      >
      <b-button
        class="intraday"
        type="is-success"
        @click="displayIntraDayWithBreak()"
        >Intraday with breaks</b-button
      >
      <b-button
        class="intraday"
        type="is-success"
        @click="displayIntraDayWithCandleStick()"
        >Intraday candlestick</b-button
      > -->
      <charts :optionsData="chartOptions" />

      <div class="demo-charts-data">
        <demo-charts />
      </div>
      <!-- <button @click="increaseCounter()">increase counter</button>
      {{ counter }}-->
      <div class="demo-charts-data">
        <SmaFormulaChart />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import charts from "./components/Charts.vue";
import axios from "axios";
import DemoCharts from "./components/DemoCharts.vue";
import SmaFormulaChart from "./components/SmaFormulaChart.vue";
import TradingPlatformHeader from "./components/TradingPlatformHeader.vue";
import Footer from "./components/Footer.vue";
// import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    charts,
    DemoCharts,
    SmaFormulaChart,
    TradingPlatformHeader,
    Footer,
  },
  data() {
    return {
      datatObject: [],
      ohlc: [],
      volume: [],
      chartOptions: {
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        chart: {
          type: "candlestick",
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
        xAxis: {
          title: {
            text: "Period",
          },
        },
        yAxis: {
          title: {
            text: "Values",
          },
        },
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
        },
        threshold: null,
      },
    };
  },
  computed: {
    // ...mapState(['counter'])
  },
  async mounted() {
    await this.displayIntraDay();
  },
  methods: {
    // ...mapActions(['updateCounter']),
    // increaseCounter() {
    //   let payload = this.counter
    //   payload++
    //   this.updateCounter(payload)
    // },
    async getSeriesData() {
      var url =
        "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMZN&interval=30min&apikey=7T1AUROWIHCWPM4B";
      axios
        .get(url, {
          headers: {
            "User-Agent": "request",
          },
        })
        .then((response) => {
          if (
            response.data["Meta Data"] &&
            response.data["Time Series (30min)"]
          ) {
            this.chartOptions.title["text"] =
              response.data["Meta Data"]["2. Symbol"] +
              " " +
              response.data["Meta Data"]["1. Information"];
            let data = response.data["Time Series (30min)"];
            this.setSerieData(data);
            this.chartOptions.series[0].data = this.datatObject;
            this.chartOptions.series[0].name =
              response.data["Meta Data"]["2. Symbol"];
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    setSerieData(data) {
      for (let key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          let value = data[key];
          const date = new Date(key);
          const milliseconds = date.getTime();
          value.x = milliseconds;
          let arrayData = [];
          arrayData.push(value.x);
          arrayData.push(parseFloat(value["1. open"]));
          arrayData.push(parseFloat(value["2. high"]));
          arrayData.push(parseFloat(value["3. low"]));
          arrayData.push(parseFloat(value["4. close"]));
          arrayData.push(parseFloat(value["5. volume"]));
          this.datatObject.push(arrayData);
        }
      }
    },
    setChartSubTitle(subtitle) {
      this.chartOptions.subtitle["text"] = subtitle;
    },
    setChartXaxis(axis) {
      this.chartOptions.xAxis = axis;
    },
    setChartType(type) {
      this.chartOptions.chart.type = type;
    },
    setSeriesProprty(type, size) {
      this.chartOptions.series[0].type = type;
      if (size) {
        this.chartOptions.series[0]["gapSize"] = size;
      } else if (size == 0) {
        delete this.chartOptions.series[0]["gapSize"];
      }
    },
    async displayIntraDay() {
      await this.getSeriesData();
      this.setChartSubTitle("Using ordinal X axis");
      let axis = {
        breaks: [
          {
            // Nights
            from: Date.UTC(2011, 9, 6, 16),
            to: Date.UTC(2011, 9, 7, 8),
            repeat: 24 * 36e5,
          },
          {
            // Weekends
            from: Date.UTC(2011, 9, 7, 16),
            to: Date.UTC(2011, 9, 10, 8),
            repeat: 7 * 24 * 36e5,
          },
        ],
      };
      this.setChartXaxis(axis);
      this.setChartType("area");
      this.setSeriesProprty("area", 5);
    },
    async displayIntraDayWithBreak() {
      await this.getSeriesData();
      this.setChartSubTitle("Using explicit breaks for nights and weekends");
      this.setChartXaxis({
        gapGridLineWidth: 0,
      });
      this.setChartType("area");
      this.setSeriesProprty("area", 5);
    },
    async displayIntraDayWithCandleStick() {
      await this.getSeriesData();
      this.setChartSubTitle("");
      this.setChartXaxis({
        text: "Period",
      });
      this.setChartType("candlestick");
      this.setSeriesProprty("candlestick", 0);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: hsl(192, 29%, 97%);
}
button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  margin: 30px !important;
}
.demo-charts-data {
  padding-top: 50px;
  padding: 30px 70px 70px;
}
</style>
