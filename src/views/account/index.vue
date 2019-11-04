<template>
  <div class="dc-account">
    <div class="dc-account__top">
      <div class="dc-account__top-inner">
        <div class="dc-account__base-info">
          <div class="base-info-left">
            <span class="account-info" v-html="accountInfo"></span>
          </div>
          <div class="base-info-right">
            <div class="statistic-group">
              <div class="statistic-item">
                <div class="info-item">
                  <h4>{{$t('views.account.totalEarnedToDate')}}</h4>
                  <p>${{earns}}</p>
                </div>
              </div>
              <div class="statistic-item">
                <div class="info-item">
                  <h4>{{$t('views.account.investorSince')}}</h4>
                  <p>{{firstPurchaseDate}}</p>
                </div>
              </div>
            </div>
            <div class="top-ctr">
              <el-button type="primary" class="top-ctr-button"
                         @click="onAddFundBtnClick">
                {{$t('views.account.addFundsBtnText')}}
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="dc-account__top-data">
        <el-row :gutter="48">
          <el-col :lg="8">
            <dc-account-data-table></dc-account-data-table>
          </el-col>
          <el-col :lg="16">
            <dc-account-data-chart></dc-account-data-chart>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-container class="dc-account__content">
      <el-main>
        <dc-account-product-list :tab-list="tabList" :product-list="productList"></dc-account-product-list>
      </el-main>
      <el-aside width="300px" v-if="asideVisible" style="margin-left: 10%;">
        <dc-account-aside :account-info="accountInfo"></dc-account-aside>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import moment from 'moment';
  import loading from '../../common/mixins/loading';
  import { monthNames } from '../../common/date';
  import DcAccountDataTable from './accountDataTable';
  import DcAccountDataChart from './accountDataChart';
  import DcAccountProductList from './accountProductList';
  import DcAccountAside from './accountAside';
  import Services from '../../services';

  export default {
    name: 'dcAccount',
    mixins: [
      loading
    ],
    components: {
      DcAccountDataTable,
      DcAccountDataChart,
      DcAccountProductList,
      DcAccountAside
    },
    data () {
      return {
        isLoadedData: false,
        principalEarns: 0,
        earns: 0,
        firstPurchaseDate: '',
        tabList: [],
        productList: [],
        windowWidth: 0
      };
    },
    mounted () {
      this._computeWindowWidth();
      this.showLoading();
      Promise.all([this._loadTotalData(), this._loadProductTabList(), this._loadProductList()]).finally(() => {
        this.isLoadedData = true;
        this.closeLoading();
      });
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
    computed: {
      displayDate () {
        if (this.firstPurchaseDate) {
          let _dateStr = this.firstPurchaseDate.replace(/\//g, '-');
          let dateMoment = moment(_dateStr);
          let monthName = this.$t('common.date.' + monthNames[dateMoment.month()]);
          let year = dateMoment.year();
          return monthName + '  ' + year;
        }
        return '';
      },
      accountInfo () {
        if (this.principalEarns) {
          let principalEarnsStr = this.principalEarns.toFixed(1);
          let tempArr = principalEarnsStr.split('.');
          return `<span>$</span>${tempArr[0]}<span>.${tempArr[1]}</span>`;
        }
        return '<span>$</span>0<span>.0</span>';
      },
      asideVisible () {
        return this.windowWidth > 848;
      }
    },
    methods: {
      _computeWindowWidth () {
        this.windowWidth = window.innerWidth;
      },
      _loadTotalData() {
        return new Promise((resolve, reject) => {
          Services.getEarnsTotal().then(response => {
            if (response) {
              this.earns = response.earns;
              this.principalEarns = response.principal_earns;
              this.firstPurchaseDate = response.first_purchase_date;
            }
            resolve();
          }, reject);
        });
      },
      _loadProductTabList () {
        return new Promise((resolve, reject) => {
          Services.getProduceTabList().then(response => {
            if (response && Array.isArray(response.items)) {
              this.tabList = response.items;
            } else {
              this.tabList = [];
            }
            resolve();
          }, reject);
        });
      },
      _loadProductList () {
        return new Promise((resolve, reject) => {
          Services.getProductList().then(response => {
            this.productList = [];
            if (response && Array.isArray(response.items)) {
              this.productList = response.items;
            }
            resolve();
          }, reject);
        });
      },
      onAddFundBtnClick () {
        this.$router.push({path: '/browse'})
      },
      onWindowResize () {
        this._computeWindowWidth();
      }
    }
  };
</script>