<template>
  <el-card :body-style="cardBodyStyle" class="data-panel data-table-panel">
    <div class="data-header">
      <h3 class="data-title">{{$t('views.account.dataTable.title')}}</h3>
    </div>
    <div class="data-body">
      <div class="data-table">
        <div class="table-col td-primary">
          <div class="table-item is-header">&nbsp;</div>
          <div class="table-item">{{$t('views.account.dataTable.appreciation')}}</div>
          <div class="table-item">{{$t('views.account.dataTable.dividents')}}</div>
          <div class="table-item is-footer">{{$t('views.account.dataTable.total')}}</div>
        </div>
        <div class="table-col" style="width: 25%;" v-for="(item, index) in dataList" :key="index">
          <div class="table-item is-header">{{item.title}}</div>
          <div class="table-item">{{item.appreciation}}</div>
          <div class="table-item">{{item.dividents}}</div>
          <div class="table-item is-footer">{{item.total}}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  import Services from '../../services';

  export default {
    name: 'DcAccountDataTable',
    data (){
      return {
        cardBodyStyle: {
          padding: 0
        },
        dataList: []
      }
    },
    mounted () {
      this._loadEarnsDetail();
    },
    methods: {
      _formatData () {
      },
      _loadEarnsDetail () {
        let _data = {};
        Services.getEarnsDetail(_data).then(response => {
          this.dataList = [];
          if (response && Array.isArray(response.items)) {
            this.dataList = response.items;
          }
        });
      }
    }
  };
</script>