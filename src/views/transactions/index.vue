<template>
  <div class="dc-transactions">
    <div class="row">
      <div class="col-12 col-lg-9">
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
      </div>
    </div>
  </div>
</template>

<script>
  import loading from '../../common/mixins/loading';
  import DcTransactionItem from './transactionItem';
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
      DcTransactionItem
    },
    data () {
      return {
        DIVIDEND_REINVEST,
        transactionOrderList: [],
        isDividend: false
      };
    },
    mounted () {
      this.showLoading();
      this._loadIsDividend();
      this._loadTransactionList().finally(() => {
        this.closeLoading();
      });
    },
    methods: {
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
      }
    },
  };
</script>