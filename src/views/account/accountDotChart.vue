<template>
  <div class="dot-chart">
    <div class="dot-chart-header">
      <span>{{projectCount}}</span>
      {{$t('views.account.sidebar.activeProjects')}}
    </div>
    <div class="chart-body dot-chart-body">
      <div class="dot-chart-title">项目汇报</div>
      <div ref="dotChart" class="chart-box"></div>
    </div>
    <div class="dot-chart-footer">
      <a :href="primiorRatingPdf">{{$t('views.account.sidebar.primiorRating')}}</a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
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
    computed: {
      ...mapGetters([
        'primiorRatingPdf'
      ])
    },
    mounted () {
      this._initDotChart();
      let options = this._buildDotChartOption(this.data);
      this._setDotChartOption(options);
      this._addChartEvent();
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
          let obj = {
            projectName: item.name,
            name: item.rating,
            value: [],
            id: item.id,
            itemStyle: {
              color: item.color
            }
          };
          let rating = '';
          if (item.rating) {
            rating = item.rating;
          } else if (item.desc) {
            rating = item.desc;
          }
          if (rating && this.ratings.includes(rating)) {
            if (map[rating]) {
              obj.value = [map[rating], item.rate_max];
              _data.push(obj);
            } else {
              obj.value = [index, item.rate_max];
              _data.push(obj);
              map[rating] = index;
              mapArr[index] = rating;
              index++;
            }
            this.xArr.push(rating);
          }

          // item.projectName = item.name;
          // item.name = item.rating;
          // item.value = item.rate_max;


        });
        // console.log('_data:', _data);
        let maxY = Number.MIN_VALUE;
        let minY = Number.MAX_VALUE;
        _data.forEach(item => {
          maxY = Math.max(item.value[1], maxY);
          minY = Math.min(item.value[1], minY);
        });
        if(maxY + 0.02 > 1) {
          maxY = 1;
        } else {
          maxY = maxY + 0.02;
        }
        if (minY - 0.02 < 0) {
          minY = 0;
        } else {
          minY = minY - 0.02;
        }
        return {
          color: ['#521945', '#d4af37', '#826212', '#262626', '#da2b39', '#da2b39', '#b82940'],
          grid: {
            top: 10,
            left: 65,
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
            max: maxY,
            min: minY,
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
      _addChartEvent () {
        const _this = this;
        if (this.dotChart) {
          this.dotChart.on('click', 'series', function (item) {
            let data = item.data;
            _this.$emit('show-detail', data.id);
          });
        }
      },
      _resizeChartBox () {
        if (this.dotChart) {
          this.dotChart.resize();
        }
      },
      onWindowResize () {
        this._resizeChartBox();
      },
      onPrimiorRatingClick () {
        // window.open();
      }
    }
  };
</script>