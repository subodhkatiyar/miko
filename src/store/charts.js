import axios from "axios";
const state = {
  item: 0,
  chartData: null,
};

const mutations = {
  SET_ITEM(state, value) {
    state.item = value;
  },
  SET_CHART_DATA(state, value) {
    state.chartData = value;
  },
};

const actions = {
  updateItem({ commit }, payload) {
    commit("SET_ITEM", payload);
  },
  getChartData({ commit }) {
    axios
      .get("https://demo-live-data.highcharts.com/aapl-ohlcv.json")
      .then((response) => {
        commit("SET_CHART_DATA", response.data);
      });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
