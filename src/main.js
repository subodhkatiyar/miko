import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import Highcharts from "highcharts";
import Stock from "highcharts/modules/stock";
import exportingInit from "highcharts/modules/exporting";
import HighchartsMore from "highcharts/highcharts-more";
import Indicators from "highcharts/indicators/indicators";
import store from "./store";
Indicators(Highcharts);
Stock(Highcharts);
HighchartsMore(Highcharts);
exportingInit(Highcharts);
import HighchartsVue from "highcharts-vue";
Vue.use(HighchartsVue, { tagName: "vue-highcharts" });
Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
