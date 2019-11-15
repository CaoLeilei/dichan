<template>
  <div class="dc-transactions">
    <el-container>
      <el-main class="dc-transactions__main">
        <div class="dc-transactions__module">
          <h3 class="dc-transactions__module-title">
            <span>{{$t('views.transactions.title')}}</span>
          </h3>
          <div class="dc-transactions__module-content"
               v-for="order in transactionOrderList" :key="order.id">
            <dc-transaction-item :data="order" @redeem-success="onRedeemSuccess"></dc-transaction-item>
          </div>
          <div class="dc-transactions__module-content">
            <h4 class="content-title">{{$t('views.transactions.dividendReinvestment')}}</h4>
            <div class="content-body">
              <el-checkbox v-model="isDividend" @change="onIsDividendChange">
                {{$t('views.transactions.agreeText')}}
              </el-checkbox>
            </div>
          </div>
        </div>
      </el-main>
      <el-aside width="350px" class="dc-portfolio__aside" v-if="asideVisible">
        <dc-account-aside class="dc-portfolio__aside" :account-info="accountInfo"></dc-account-aside>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import loading from '../../common/mixins/loading';
  import DcTransactionItem from './transactionItem';
  import DcAccountAside from '../account/accountAside';
  import Services from '../../services';

  const DIVIDEND_REINVEST = {
    NOT_DIVIDEND: 0,
    DIVIDEND: 1
  };

  export default {
    name: 'index',
    mixins: [
      loading
    ],
    components: {
      DcTransactionItem,
      DcAccountAside
    },
    data () {
      return {
        DIVIDEND_REINVEST,
        transactionOrderList: [],
        isDividend: false,
        principalEarns: 0,
        windowWidth: 0
      };
    },
    mounted () {
      this._computeWindowWidth();
      this.showLoading();
      this._loadIsDividend();
      this._loadTotalData();
      this._loadTransactionList().finally(() => {
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
      accountInfo () {
        if (this.principalEarns) {
          let principalEarnsStr = this.principalEarns.toFixed(1);
          let tempArr = principalEarnsStr.split('.');
          return `<span>$</span>${tempArr[0]}<span>.${tempArr[1]}</span>`;
        }
        return '<span>$</span>0<span>.0</span>';
      },
      asideVisible () {
        return this.windowWidth > 992;
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
              this.principalEarns = response.principal_earns;
            }
            resolve();
          }, reject);
        });
      },
      _loadIsDividend () {
        return new Promise((resolve, reject) => {
          Services.getDividend().then(response => {
            this.isDividend = (response && response.dividend_reinvest && response.dividend_reinvest === DIVIDEND_REINVEST.DIVIDEND);
            resolve();
          }, reject);
        });
      },
      _setDividend (isDividend) {
        let _data = {
          dividend_reinvest: isDividend ? 1 : 0
        };
        return Services.setDividend(_data);
      },
      _loadTransactionList () {
        return new Promise((resolve, reject) => {
          Services.getTransactionOrders().then(response => {
            this.transactionOrderList = [];
            if (response && Array.isArray(response.items)) {
              this.transactionOrderList = response.items;
            }
            resolve();
          }, reject);
        });
      },
      onIsDividendChange (value) {
        this.showLoading();
        this._setDividend(value).finally(() => {
          this.closeLoading();
        });
      },
      // 赎回成功之后进行刷新内容
      onRedeemSuccess () {
        this._loadTransactionList();
      },
      onWindowResize () {
        this._computeWindowWidth();
      }
    },
  };
</script>