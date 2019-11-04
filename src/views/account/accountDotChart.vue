<template>
  <div class="dot-chart">
    <div class="dot-chart-header">
      <span>{{projectCount}}</span>
      {{$t('views.account.sidebar.activeProjects')}}
    </div>
    <div class="chart-body dot-chart-body">
      <div ref="dotChart" class="chart-box"></div>
    </div>
    <div class="dot-chart-footer">
      <span>{{$t('views.account.sidebar.primiorRating')}}</span>
    </div>
  </div>
</template>

<script>
  const echarts = window.echarts;
  export default {
    name: 'accountDotChart',
    props: {
      projectCount: {
        type: Number,
        default: 0
      },
      data: {
        type:Array,
        default () {
          return [];
        }
      },
      ratings: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    data() {
      return {
        dotChart: null,
        xArr: []
      };
    },
    mounted () {
      this._initDotChart()
      let options = this._buildDotChartOption(this.data);
      this._setDotChartOption(options);
      const {
        onWindowResize
      } = this;
      window.addEventListener('resize', onWindowResize);
    },
    beforeDestroy () {
      const {
        onWindowResize
      } = this;
      window.removeEventListener('resize', onWindowResize);
    },
    methods: {
      _initDotChart () {
        const $dotChart = this.$refs['dotChart'];
        if ($dotChart) {
          this.dotChart = echarts.init($dotChart);
        }
      },
      _loadDotChartData () {},
      _buildDotChartOption (data) {
        let _data = [];
        let map = {};
        let mapArr = {};
        let index = 1;
        let count = this.ratings.length;
        this.ratings.forEach((item, index) => {
          map[item] = index;
          mapArr[index] = item;
        });
        data.forEach(item => {
          let rating = '';
          if (item.rating) {
            rating = item.rating;
          } else if (item.desc) {
            rating = item.desc;
          }
          if (rating && this.ratings.includes(rating)) {
            if (map[rating]) {
              _data.push([map[rating], item.rate_max]);
            } else {
              _data.push([index, item.rate_max]);
              map[rating] = index;
              mapArr[index] = rating;
              index++;
            }
            this.xArr.push(rating);
          }
        });
        return {
          color: ['#521945', '#d4af37', '#826212', '#262626', '#da2b39', '#da2b39', '#b82940'],
          grid: {
            top: 10,
            left: 40,
            bottom: 25
          },
          xAxis: {
            min: 0,
            max: count,
            splitNumber: count / 2,
            axisLine: {
              lineStyle: {
                color: '#dddddd'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#d4af37',
              formatter: function (value) {
                return mapArr[value] ? mapArr[value] : '';
              }
            },
            splitLine: {
              show: false
            }
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#a8a8a8',
              formatter: function (data) {
                return (data * 100).toFixed(0) + '%';
              }
            },
            splitLine: {
              lineStyle: {
                color: '#dfdfdf'
              }
            }
          },
          series: [{
            symbolSize: 10,
            data: _data,
            type: 'scatter'
          }]
        };
      },
      _setDotChartOption (option) {
        if (this.dotChart) {
          this.dotChart.setOption(option);
        }
      },
      _resizeChartBox () {
        if (this.dotChart) {
          this.dotChart.resize();
        }
      },
      onWindowResize () {
        this._resizeChartBox();
      }
    }
  };
</script>