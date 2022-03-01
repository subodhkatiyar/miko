<template>
  <div class="main-sma-section">
    <div class="sma-details-section">
      <h4 class="subtitle is-4">Calculating the Simple Moving Average</h4>
      <h6 class="subtitle is-6 mt-0">
        The equation for SMA is quite simple. It is just the average closing
        price of a security over the last “n” periods.
      </h6>
    </div>
    <div class="sma-formula-section">
      <img
        src="../assets/simple-moving-average6-300x62.webp"
        alt="A random image"
      />
    </div>

    <div
      class="sma-chart-section"
      v-if="
        allTechnicalSeries.series[0].data && allTechnicalSeries.series[1].data
      "
    >
      <vue-highcharts
        :constructor-type="'stockChart'"
        :options="allTechnicalSeries"
        :callback="someFunction"
        class="update-chart-content"
      ></vue-highcharts>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  name: "SmaFormulaChart",
  data() {
    return {
      allTechnicalSeries: {
        chart: {
          height: 600,
        },
        title: {
          text: "AAPL Historical",
        },
        subtitle: {
          text: "All indicators",
        },
        legend: {
          enabled: true,
        },
        rangeSelector: {
          selected: 2,
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
          {
            top: "80%",
            height: "20%",
          },
        ],
        plotOptions: {
          series: {
            showInLegend: true,
            dataGrouping: {
              units: null,
            },
          },
        },
        tooltip: {
          split: true,
        },
        series: [
          {
            type: "candlestick",
            id: "aapl",
            name: "AAPL",
            data: null,
          },
          {
            type: "column",
            id: "volume",
            name: "Volume",
            data: null,
            yAxis: 1,
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
  computed: {
    ...mapState("charts", ["chartData", "item"]),
  },
  watch: {
    chartData: function () {
      this.getSmaData(this.chartData);
    },
  },
  async mounted() {
    await this.getChartData();
    if (this.chartData) {
      await this.getSmaData(this.chartData);
    }
  },
  methods: {
    ...mapActions("charts", ["getChartData"]),
    async getSmaData(data) {
      this.ohlc = [];
      this.volume = [];
      let dataLength = data.length;
      // set the allowed units for data grouping
      const groupingUnits = [
        [
          "week", // unit name
          [1], // allowed multiples
        ],
        ["month", [1, 2, 3, 4, 6]],
      ];

      let i = 0;
      for (i; i < dataLength; i += 1) {
        this.ohlc.push([
          data[i][0], // the date
          data[i][1], // open
          data[i][2], // high
          data[i][3], // low
          data[i][4], // close
        ]);

        this.volume.push([
          data[i][0], // the date
          data[i][5], // the volume
        ]);
        if (this.allTechnicalSeries) {
          this.allTechnicalSeries.series[0].data = this.ohlc;
          this.allTechnicalSeries.series[1].data = this.volume;
          this.allTechnicalSeries.plotOptions.series["dataGrouping"].units =
            groupingUnits;
        }
      }
    },
    someFunction() {
      // document.getElementById('overlays').addEventListener('change', function (e) {
      //       var series = this.allTechnicalSeries.get('overlay');
      //       if (series) {
      //           series.remove(false);
      //           this.chart.addSeries({
      //               type: e.target.value,
      //               linkedTo: 'aapl',
      //               id: 'overlay'
      //           });
      //       }
      //   });
      // document.getElementById('oscillators').addEventListener('change', function (e) {
      //     var series = this.allTechnicalSeries.get('oscillator');
      //     if (series) {
      //         series.remove(false);
      //         this.allTechnicalSeries.addSeries({
      //             type: e.target.value,
      //             linkedTo: 'aapl',
      //             id: 'oscillator',
      //             yAxis: 2
      //         });
      //     }
      // });
    },
  },
};
</script>
<style scoped>
.main-sma-section {
  margin: 0 20px;
  padding-bottom: 50px;
}
.sma-formula-section {
  margin: 50px;
}
.sma-chart-section {
}
h4 {
  font-weight: 600;
  margin-bottom: 0.5rem !important;
}
.update-chart-content {
  border-radius: 10px;
  box-shadow: 0 0 5px 1px grey;
}
</style>
