<template>
  <div class="dc-account__aside">
    <el-row :gutter="48">
      <el-col :lg="24" :xs="12" v-if="isLoadData">
        <dc-account-pie-chart :data="pieData"
                              :debt-ratio="debtRatio"
                              :account-info="accountInfo"></dc-account-pie-chart>
      </el-col>
      <el-col :lg="24" :xs="12">
        <dc-account-dot-chart v-if="isLoadData"
                              :project-count="projectCount"
                              :ratings="ratings" :data="dotData">
        </dc-account-dot-chart>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import DcAccountPieChart from './accountPieChart';
  import DcAccountDotChart from './accountDotChart';
  import Services from '../../services';

  export default {
    name: 'DcAccountAside',
    components: {
      DcAccountPieChart,
      DcAccountDotChart
    },
    props: {
      accountInfo: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        isLoadData: false,
        projectCount: 0,
        pieData: [],
        ratings: [],
        dotData: [],
        debtRatio: 0
      };
    },
    mounted () {
      this._loadPieCharData();
    },
    beforeDestroy() {
    },
    methods: {
      _loadPieCharData () {
        Services.getAccountRightPieData().then(response => {
          this.pieData = response.cases;
          this.projectCount = response.cases.length;
          this.isLoadData = true;
          this.ratings = response.ratings;
          this.dotData = response.cases;
          this.debtRatio = (response.default_pie.debt_ratio * 10000) / 100;
        });
      },
    }
  };
</script>