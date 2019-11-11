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
      quickViewData: null,
      colorPlat: [
        '#521945', '#d4af37', '#826212', '#262626', '#da2b39',
        '#da2b39', '#b82940',
        '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
        '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
      ],
      projectColorMap: new Map()
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
        this.pieData = [];
        this.dotData = [];
        this.projectCount = response.cases.length;
        if (Array.isArray(response.cases)) {
          response.cases.forEach((project, index) => {
            let colorIndex = index % this.projectCount;
            project.color = this.colorPlat[colorIndex];
            this.pieData.push(project);
            this.dotData.push(project);
          });
        }
        this.isLoadData = true;
        this.ratings = response.ratings;
        this.pieData = response.cases;
        this.dotData = response.cases;
        this.debtRatio = response.default_pie.debt_ratio.toFixed(0);
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