<template>
  <div class="hello">
    <h1 class="chart-title">
      Displaying charts data using alphavantage
      <a href="https://www.alphavantage.co/documentation/"> API </a>
    </h1>
    <div class="data" v-if="optionsData.series[0].data">
      <vue-highcharts
        :constructor-type="'stockChart'"
        :options="optionsData"
        class="update-intra-day-chart-content"
      ></vue-highcharts>
    </div>
  </div>
</template>

<script>
export default {
  name: "Charts",
  props: {
    optionsData: Object,
    default: {},
  },
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin: 0 20px;
  padding-bottom: 50px;
}
.chart-title {
  font-weight: 800;
  padding-bottom: 30px;
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
.update-intra-day-chart-content {
  border-radius: 10px;
  box-shadow: 0 0 5px 1px grey;
}
</style>
