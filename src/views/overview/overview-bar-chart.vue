<template>
  <el-card :body-style="cardBodyStyle">
    <div class="dc-overview__panel">
      <div class="dc-overview__detail-chart">
        <div class="chart-box"></div>
      </div>
      <div class="chart-bottom">
        <div class="price-box">
          <div class="price-item is-active">
            $1,000,000
          </div>
          <div class="price-item">
            $1,000,000
          </div>
          <div class="price-item">
            $1,000,000
          </div>
          <div class="price-item">
            $1,000,000
          </div>
          <div class="price-item">
            $1,000,000
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'DcOverviewBarChart',
    data() {
      return {
        cardBodyStyle: {
          padding: '25px'
        }
      };
    },
    methods: {}
  };
</script>