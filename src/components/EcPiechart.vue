<template>
  <div>
    <v-chart v-if="!loading" class="chart" :option="option_pie" />
    <v-chart v-if="!loading" class="chart" :option="option_bar" />
  </div>
</template>

<script>
import axios from "axios";
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
      option_pie: {
        title: {
          text: "Traffic Sources Pie Chart",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "Direct",
            "Email",
            "Ad Networks",
            "Video Ads",
            "Search Engines",
          ],
        },
        series: [
          {
            name: "Traffic Sources",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: null,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      option_bar: {
        title: {
          text: "Traffic Sources Bar Chart",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ",
        },
        xAxis: {
          data: [
            "Direct",
            "Email",
            "Ad Networks",
            "Video Ads",
            "Search Engines",
          ],
        },
        yAxis: {},
        series: [
          {
            name: "Traffic Sources",
            type: "bar",
            data: null,
          },
        ],
      },
      loading: true,
    };
  },
  mounted() {
    axios
      .get("https://624e29a077abd9e37c83b239.mockapi.io/api/v1/chart/1")
      .then((response) => {
        console.log(response.data);
        this.option_pie.series[0].data = response.data.series[0].data;
        this.option_bar.series[0].data = response.data.series[0].data.map(
          (item) => item.value
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
