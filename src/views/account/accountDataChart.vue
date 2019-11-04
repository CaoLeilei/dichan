<template>
  <el-card class="data-panel data-chart-panel" :body-style="cardBodyStyle" >
    <div class="data-header">
      <h3 class="data-title is-chart-title">
        {{$t('views.account.dataChart.titleMain')}}
<!--        <span>{{$t('views.account.dataChart.titleSub')}}</span>-->
      </h3>
    </div>
    <div class="data-body">
      <div ref="chartBox" class="data-chart-box">
      </div>
    </div>
  </el-card>
</template>

<script>
  import moment from 'moment';
  import { monthNames } from '../../common/date';
  import Services from '../../services';

  const echarts = window.echarts;
  export default {
    name: 'accountDataChart',
    data () {
      return {
        chartBox: null,
        cardBodyStyle: {
          padding: 0
        }
      };
    },
    mounted() {
      this._initChartBox();
      const {
        onWindowResize
      } = this;
      window.addEventListener('resize', onWindowResize);
      this._loadData();
    },
    beforeDestroy () {
      // 防止内存泄漏导致的问题
      this.chartBox = null;
      window.document.removeEventListener('resize', this.onWindowResize);
    },
    methods: {
      _initChartBox () {
        const $chartBox = this.$refs['chartBox'];
        if ($chartBox) {
          this.chartBox = echarts.init($chartBox);
        }
      },
      _loadData () {
        // getEarnsHistory
        Services.getEarnsHistory().then(response => {
          console.log('thisget e', response)
          let data = this._parseResponse(response.items);

          let option = this._buildOption(data.names, data.datas);
          this._setOption(option);
        })
      },
      _parseResponse (list) {
        let datas = [];
        let names = [];
        list.forEach(item => {
          // let timeNameStr = item.date.replace(/\\/g, '-');
          // let dateMoment = moment(timeNameStr);
          // let monthName = this.$t('common.date.' + monthNames[dateMoment.month()]);
          // let dateName = dateMoment.date();
          names.push(item.date);
          datas.push(item.price);
        });
        return {
          names: names,
          datas: datas
        };
      },
      _buildOption (names, datas) {
        let dataMin = Number.MAX_VALUE;
        let dataMax = Number.MIN_VALUE;
        datas.forEach(item => {
          dataMin = Math.min(dataMin , item);
          dataMax = Math.max(dataMin, item);
        });
        dataMin = dataMin - (dataMin  % 10);
        dataMax = dataMax + 10 - (dataMax % 10);
        return {
          grid: {
            top: 10,
            left: 50,
            bottom: 20,
            right: 5
          },
          tooltip : {
            trigger: 'axis',
            backgroundColor: 'RGBA(255, 255, 255, .75)',
            textStyle: {
              color: '#D4AF37'
            },
            axisPointer: {
              type: 'cross',
              label: {
                show: false
              }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: names,
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
              textStyle: {
                fontSize: 12
              }
            }
          },
          yAxis: {
            min: dataMin,
            max: dataMax,
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: '#dfdfdf'
              }
            },
            axisLabel: {
              color: '#d4af37'
            },
            splitLine: {
              lineStyle: {
                color: '#dfdfdf'
              }
            }
          },
          series: [{
            data: datas,
            type: 'line',
            showSymbol: false,
            lineStyle: {
              color: '#d4af37'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#d4af37'
              }, {
                offset: 1,
                color: 'RGBA(212, 175, 55, 0)'
              }])
            }
          }]
        };
      },
      _setOption (option) {
        if (this.chartBox) {
          this.chartBox.setOption(option);
        }
      },
      onWindowResize () {
        if (this.chartBox) {
          this.chartBox.resize();
        }
      }
    }
  };
</script>