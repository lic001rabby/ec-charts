<template>
  <div class="home">
    <EcPiechart></EcPiechart>
  </div>
</template>

<script>
// @ is an alias to /src

import EcPiechart from "@/components/EcPiechart.vue";

export default {
  name: "HomeView",
  components: {
    EcPiechart,
  },
};
</script>
