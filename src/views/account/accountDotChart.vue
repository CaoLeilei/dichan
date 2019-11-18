<template>
  <div class="dot-chart">
    <div class="dot-chart-header">
      <span>{{projectCount}}</span>
      {{$t('views.account.sidebar.activeProjects')}}
    </div>
    <div class="chart-body dot-chart-body">
      <div ref="dotChart" class="chart-box" :id="dotChartId">
      </div>
    </div>
    <div class="dot-chart-footer">
      <a :href="primiorRatingPdf">{{$t('views.account.sidebar.primiorRating')}}</a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Highcharts from 'highcharts';

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
        dotChartId: 'dotChart',
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
      // this._initDotChart();
      // let options = this._buildDotChartOption(this.data);
      // this._setDotChartOption(options);
      // this._addChartEvent();
      // const {
      //   onWindowResize
      // } = this;
      // window.addEventListener('resize', onWindowResize);
      this._initHighCharts();
    },
    methods: {
      _initHighCharts () {
        const _this = this;
        let _data = [];
        let map = {};
        let mapArr = {};
        let index = 1;
        let count = this.ratings.length;

        this.ratings.forEach((item, index) => {
          map[item] = index;
          mapArr[index] = item;
        });

        this.data.forEach(item => {
          let rating = '';
          if (item.rating) {
            rating = item.rating;
          } else if (item.desc) {
            rating = item.desc;
          }

          let obj = {
            id: item.id,
            name: item.name,
            x: map[rating],
            y: item.rate_max,
            color: item.color,
            rating: item.rating
          };
          _data.push(obj);
        });
        Highcharts.chart(this.dotChartId, {
          chart: {
            type: 'scatter',
            zoomType: 'xy',
            backgroundColor: 'rgba(0,0,0,0)',
          },
          title: {
            text: ''
          },
          xAxis: {
            title: {
              enabled: false,
            },
            categories: mapArr,
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
          },
          yAxis: {
            title: {
              text: _this.$t('views.account.sidebar.projectedReturn')
            },
            tickAmount: 5,
            labels: {
              formatter: function() {
                return Math.round(this.value * 100) + '%';
              }
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            scatter: {
              point: {
                events: {
                  click: function () {
                    _this.$emit('show-detail', this.id);
                  }
                }
              },
              marker: {
                radius: 5,
                states: {
                  hover: {
                    enabled: true,
                    lineColor: 'rgb(100,100,100)'
                  }
                }
              },
              states: {
                hover: {
                  marker: {
                    enabled: false
                  }
                }
              },
              tooltip: {
                pointFormat: '<b>{point.name}</b> <br /><span style="color: #999">{point.rating}</span>',
                headerFormat: '',
                // pointFormat: ''
              }
            }
          },
          series: [{
            data: _data
          }],
          credits: {
            enabled: false
          }
        })

      }
    }
  };
</script>