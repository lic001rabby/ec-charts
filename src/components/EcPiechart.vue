<template>
  <div>
    <v-chart class="chart" :option="option_pie" />
    <v-chart class="chart" :option="option_bar" />
  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  AxisPointerComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import DataService from "../services/DataService";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  BarChart,
  AxisPointerComponent,
  GridComponent,
]);

export default {
  name: "EcPiechart",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "dark",
  },
  data() {
    return {
      option_pie: null,
      option_bar: null,
      loading: true,
    };
  },
  mounted() {
    DataService.get(
      "https://624e29a077abd9e37c83b239.mockapi.io/api/v1/chart/1",
      (response, data) => {
        if (response == 200) this.option_pie = data;
      }
    );
    DataService.get(
      "https://624e29a077abd9e37c83b239.mockapi.io/api/v1/barchart/1",
      (response, data) => {
        if (response == 200) this.option_bar = data;
      }
    );
  },
};
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
