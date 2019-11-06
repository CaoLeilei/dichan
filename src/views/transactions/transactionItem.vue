<template>
  <el-card class="dc-transactions__card" v-if="data">
    <div slot="header" class="dc-transactions__card-header">
      <div class="float-left">
        <h3>{{data.name}}</h3>
        <p>{{displayDate}}</p>
        <p>{{$t('views.transactions.order')}}:{{data.id}}</p>
      </div>
      <div class="float-right">
        <div class="price">{{data.price_total}}</div>
        <div class="" v-if="data.process !== ORDER_PROCESS.REDEEMED">
          <el-button type="text" @click="onRedeemBtnClick">{{$t('views.transactions.redeem')}}</el-button>
        </div>
      </div>
    </div>
    <table class="table dc-table dc-transactions__table" cellpadding="0" cellspacing="0">
      <thead>
      <tr>
        <th scope="col" class="text-left">{{$t('views.transactions.tableHeader.name')}}</th>
        <th scope="col" class="text-center" style="width: 15%">{{$t('views.transactions.tableHeader.priceUnit')}}</th>
        <th scope="col" class="text-center" style="width: 15%">{{$t('views.transactions.tableHeader.count')}}</th>
        <th scope="col" class="text-center" style="width: 15%">{{$t('views.transactions.tableHeader.totalPrice')}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in caseList" :key="item.id">
        <td class="text-left">{{item.name}}</td>
        <td class="text-center font-black">{{item.price_unit}}</td>
        <td class="text-center font-black">{{item.unit_count}}</td>
        <td class="text-center font-black">{{item.price_total}}</td>
      </tr>
      </tbody>
    </table>
  </el-card>
</template>

<script>
  import loading from '../../common/mixins/loading';
  import dateTimeBase from '../../common/mixins/dateTimeBase';
  import Services from '../../services';

  const ORDER_PROCESS = {
    REDEEMED: -1,
    ING: 1
  };
  export default {
    name: 'DcTransactionItem',
    mixins: [
      loading,
      dateTimeBase
    ],
    props: {
      data: {
        type: Object,
        default () {
          return null;
        }
      }
    },
    data() {
      return {
        ORDER_PROCESS,
        orderId: '',
        buyDateTime: '',
        caseList: []
      };
    },
    created () {
      if(this.data) {
        this.orderId = this.data.id;
        this.buyDateTime = this.data.buy_at;
        this.caseList = this.data.cases;
      }
    },
    computed: {
      displayDate () {
        if (this.buyDateTime) {
          return  this.formatDateTime(this.buyDateTime, true);
        }
        return '';
      }
    },
    methods: {
      _redeemTransactionOrder () {
        let _data = {
          order_id: this.orderId
        };
        return Services.redeemTransactionOrder(_data);
      },
      onRedeemBtnClick () {
        this.$confirm(this.$t('views.transactions.redeemConfirmMessage'), this.$t('views.transactions.redeemConfirmTitle'), {
          cancelButtonText: this.$t('views.transactions.cancel'),
          confirmButtonText: this.$t('views.transactions.submit'),
          showClose: false,
          center: true
        }).then(() => {
          this.showLoading();
          return this._redeemTransactionOrder();
        }).then(() => {
          this.$alert(this.$t('views.transactions.redeemSuccess'), this.$t('common.messageTitle'), {
            confirmButtonText: this.$t('common.messageBoxOkBtnText'),
            type: 'success'
          });
          this.$emit('redeem-success');
        }).finally(() => {
          this.closeLoading();
        });
      }
    }
  };
</script>