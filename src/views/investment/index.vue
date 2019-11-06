<template>
  <div class="dc-investment">
    <div class="dc-investment__container">
      <div class="dc-investment__title">
        <h3>{{title}}</h3>
        <p>{{desc}}</p>
      </div>
      <div class="dc-investment__main">
        <dc-overview-brights :brights="brights" class="dc-investment__brights"></dc-overview-brights>
      </div>
      <div class="dc-investment__ctr">
        <div class="dc-investment__contact" v-show="isShowContact">
          <el-row>
            <el-col :xs="24" :sm="12" class="content">
              <div class="content-inner">
                <h4 class="content-title">{{$t('views.investment.uniteSates')}}</h4>
                <p>{{$t('views.investment.address')}}{{$t('views.investment.contact.en.address')}}</p>
                <p>{{$t('views.investment.email')}}{{$t('views.investment.contact.en.address')}}</p>
                <p>{{$t('views.investment.call')}}{{$t('views.investment.contact.en.phone')}}</p>
                <div class="text-right name-box">{{$t('views.investment.contact.en.name')}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" class="content">
              <div class="content-inner">
                <h4 class="content-title">{{$t('views.investment.chinese')}}</h4>
                <p>{{$t('views.investment.address')}}{{$t('views.investment.contact.zh.address')}}</p>
                <p>{{$t('views.investment.email')}}{{$t('views.investment.contact.zh.address')}}</p>
                <p>{{$t('views.investment.call')}}{{$t('views.investment.contact.zh.phone')}}</p>
                <div class="text-right name-box">{{$t('views.investment.contact.zh.name')}}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-row :gutter="50">
          <el-col :xs="24" :sm="12">
            <div class="ctr-inner">
              <el-button class="ctr-button is-nouse"
                         @click="onInvestOnlineBtnClick">
                <!--              INVEST ONLINE-->
                {{$t('views.investment.investOnline')}}
              </el-button>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="ctr-inner">
              <el-button class="ctr-button" type="primary"
                         @click="onOfflineBtnClick">
                {{$t('views.investment.yourInvestmentPartiner')}}
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import loading from '../../common/mixins/loading';
  import DcOverviewBrights from '../overview/overviewBrights';
  import Services from '../../services';

  export default {
    name: 'DcInvestment',
    mixins: [
      loading
    ],
    components: {
      DcOverviewBrights
    },
    data () {
      return {
        id: '',
        title: '',
        desc: '',
        brights: [],
        isShowContact: false
      }
    },
    created() {
      this.id = this.$route.params.id;
    },
    mounted () {
      this.showLoading();
      this._loadProductDetail().finally(() => {
        this.closeLoading();
      });
    },
    methods: {
      _loadProductDetail () {
        return new Promise((resolve, reject) => {
          let _data = {
            case_id: this.id
          };

          Services.getProductInvestData(_data).then(response => {
            if (response && response.case) {
              let caseData = response.case;
              this.title = caseData.title;
              this.desc = caseData.desc;
              if (Array.isArray(caseData.brights)) {
                this.brights = caseData.brights;
              } else {
                this.brights = [];
              }
            } else {
              this.$message({
                message: this.$t('views.investment.errorMessage'),
                type: 'error'
              });
            }
            resolve();
          }, reject);
        })
      },
      onInvestOnlineBtnClick () {
        // this.$confirm('asdas', '提示', {
        //   center: true
        // });
      },
      onOfflineBtnClick () {
        this.isShowContact = !this.isShowContact;
      }
    }
  };
</script>