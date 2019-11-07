<template>
  <div class="dc-account__aside">
    <el-row :gutter="48">
      <el-col :lg="24" :xs="12" v-if="isLoadData">
        <dc-account-pie-chart :data="pieData" :debt-ratio="debtRatio"
                              @show-detail="onShowCardDetail"
                              :account-info="accountInfo"></dc-account-pie-chart>
      </el-col>
      <el-col :lg="24" :xs="12">
        <dc-account-dot-chart
          v-if="isLoadData"
          :project-count="projectCount"
          :ratings="ratings"
          :data="dotData"
          @show-detail="onShowCardDetail"
        ></dc-account-dot-chart>
      </el-col>
    </el-row>
    <el-dialog
      title="提示"
      top="5vh"
      custom-class="dc-product-item__quick-view"
      :show-close="false"
      :width="dialogWidth"
      :append-to-body="true"
      :visible.sync="showDialog"
    >
      <dc-quick-view :data="quickViewData" :visible="showDialog" @close="onQuickViewClose"></dc-quick-view>
    </el-dialog>
  </div>
</template>

<script>
import DcAccountPieChart from "./accountPieChart";
import DcAccountDotChart from "./accountDotChart";
import DcQuickView from '@/components/product-item/quickView';
import Services from "../../services";
import loading from '@/common/mixins/loading';

export default {
  name: "DcAccountAside",
  mixins: [
    loading
  ],
  components: {
    DcAccountPieChart,
    DcAccountDotChart,
    DcQuickView
  },
  props: {
    accountInfo: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isLoadData: false,
      projectCount: 0,
      pieData: [],
      ratings: [],
      dotData: [],
      debtRatio: 0,
      windowWidth: 0,
      showDialog: false,
      quickViewData: null
    };
  },
  mounted() {
    this._computeWindowWidth();
    this._loadPieCharData();
  },
  beforeDestroy() {},
  computed: {
    dialogWidth () {
      if (this.windowWidth > 768) {
        return '768px';
      } else {
        return  '100%';
      }
    }
  },
  methods: {
    _computeWindowWidth () {
      this.windowWidth = window.innerWidth;
    },
    _loadPieCharData() {
      Services.getAccountRightPieData().then(response => {
        this.pieData = response.cases;
        this.projectCount = response.cases.length;
        this.isLoadData = true;
        this.ratings = response.ratings;
        this.dotData = response.cases;
        this.debtRatio = (response.default_pie.debt_ratio * 10000) / 100;
      });
    },
    onShowCardDetail(id) {
      this.showLoading();
      Services.getProductCard({case_id: id}).then(response => {
        console.log(response);
        if (response) {
          this.quickViewData = response.case;
          this.showDialog = true;
        }
      }).finally(() => {
        this.closeLoading();
      });
    },
    onQuickViewClose () {
      this.showDialog = false;
    }
  }
};
</script>