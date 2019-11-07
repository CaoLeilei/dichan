<template>
  <div class="pie-chart">
    <div class="chart-body">
      <div ref="pieChart" :id="pieChartId" class="chart-box"></div>
      <div class="pie-chart-title" v-show="showAccountInfo">
        <h3>{{$t('views.account.sidebar.yourPortfplio')}}</h3>
        <p v-html="accountInfo"></p>
      </div>
      <div class="pie-chart-title is-project" v-if="!showAccountInfo">
        <p v-html="displayProjectPrice"></p>
        <h3>
         {{currentProjectName}}
        </h3>
      </div>
    </div>
    <div class="pie-chart-footer">
      <div class="pie-chart-footer-inner">
        <div class="text-box left">
          <h4>{{$t('views.account.sidebar.debt')}}</h4>
          <p>{{debtRatio}}%</p>
        </div>
        <div class="process-box">
          <div class="process-item" style="width: 24%;">
            <div class="process-item-inner"></div>
          </div>
          <div class="process-item" style="width: 76%;">
            <div class="process-item-inner"></div>
          </div>
        </div>
        <div class="text-box right">
          <h4>{{$t('views.account.sidebar.equity')}}</h4>
          <p>{{100 - debtRatio}}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Highcharts from 'highcharts';
  const echarts = window.echarts;

  export default {
    name: 'accountPieChart',
    props: {
      accountInfo: {
        type: String,
        default: ''
      },
      debtRatio: {
        type: Number,
        default: 0
      },
      data: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    data() {
      return {
        pieChartId: 'pieChart',
        pieChart: null,
        showAccountInfo: true,
        currentRate: 0,
        currentRating: '',
        currentProjectName: '',
        currentProjectPrice: ''
      };
    },
    created() {
      // this._loadPieCharData();
    },
    mounted () {

      this._initPieHighCharts(this.data);
    },
    beforeDestroy () {
      const {
        onWindowResize
      } = this;
      window.removeEventListener('resize', onWindowResize);
    },
    computed: {
      displayProjectPrice () {
        if (this.currentProjectPrice) {
          let principalEarnsStr = this.currentProjectPrice.toFixed(1);
          let tempArr = principalEarnsStr.split('.');
          return `<span>$</span>${tempArr[0]}<span>.${tempArr[1]}</span>`;
        }
        return '<span>$</span>0<span>.0</span>';
      }
    },
    methods: {
      _initPieHighCharts (data) {
        const _this = this;
        let chartData = [];
        data.forEach(item => {
          let chartDataItem = {
            id: item.id,
            name: item.name,
            y: item.rate_max,
            price: item.price
          };
          if (item.rating) {
            chartDataItem.rating = item.rating;
          } else if (item.desc) {
            chartDataItem.rating = item.desc;
          }
          chartData.push(chartDataItem);
        });

        let chart = Highcharts.chart(this.pieChartId, {
          chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            spacing : [20, 0 ,0, 0]
          },
          colors: ['#521945', '#d4af37', '#826212', '#262626', '#da2b39', '#da2b39', '#b82940'],
          title: {
            enabled: false,
            align: 'center',
            verticalAlign: 'middle',
            text: ''
          },
          tooltip: {
            enabled: false
          },
          plotOptions: {
            pie: {
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              point: {
                events: {
                  mouseOver: function(e) {  // 鼠标滑过时动态更新标题
                    _this.currentProjectName = e.target.name;
                    _this.currentProjectPrice = e.target.price;
                    _this.showAccountInfo = false;
                  },
                  mouseOut: function () {
                    _this.showAccountInfo = true;
                    chart.setTitle({
                      text: ''
                    });
                  },
                  click: function (e) {
                    _this.$emit('show-detail', this.id);
                  }
                }
              },
            }
          },
          series: [{
            type: 'pie',
            asideVisible: false,
            innerSize: '85%',
            data: chartData,
          }],
          credits: {
            enabled: false
          }
        });
      },
      _initChartBox () {
        const $pieChart = this.$refs['pieChart'];
        if ($pieChart) {
          this.pieChart = echarts.init($pieChart);
        }
      },
      _resizeChartBox () {
        // if (this.pieChart) {
        //   this.pieChart.resize();
        // }
      },
      onWindowResize () {
        this._resizeChartBox();
      }
    }
  };
</script>