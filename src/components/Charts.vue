<template>
  <div class="hello">
    <div class="data" v-if="optionsData.series[0].data">
      <vue-highcharts
        :constructor-type="'stockChart'"
        :options="optionsData"
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
  max-width: 1220px;
  margin: 0 auto;
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
</style>
