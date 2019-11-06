<template>
  <div class="dc-portfolio">
    <el-container>
      <el-main class="dc-portfolio__main">
        <div class="dc-portfolio__module">
          <h3 class="dc-portfolio__module-title">
            <span>{{$t('views.portfolio.pageTitle')}}</span>
          </h3>
          <div class="dc-portfolio__module-content">
            <el-card>
              <div class="dc-portfolio__card">
                <table class="table dc-table dc-portfolio__table" cellpadding="0" cellspacing="0">
                  <thead>
                  <tr>
                    <th scope="col" class="text-left">{{$t('views.portfolio.tableHeader.name')}}</th>
                    <th scope="col" class="text-center" style="width: 20%">{{$t('views.portfolio.tableHeader.principalInvested')}}</th>
                    <th scope="col" class="text-center">{{$t('views.portfolio.tableHeader.ofPortfplio')}}</th>
                    <th scope="col" class="text-center">{{$t('views.portfolio.tableHeader.dividend')}}</th>
                    <th scope="col" class="text-center">{{$t('views.portfolio.tableHeader.appreciation')}}</th>
                    <th scope="col" class="text-center">{{$t('views.portfolio.tableHeader.positionTotal')}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in tableData" :key="item.id">
                    <td scope="col" class="text-left">{{item.name}}</td>
                    <td scope="col" class="text-center">{{item.price_origin}}</td>
                    <td scope="col" class="text-center">{{item.ratio}}</td>
                    <td scope="col" class="text-center">{{item.dividents}}</td>
                    <td scope="col" class="text-center">{{item.appreciation}}</td>
                    <td scope="col" class="text-center">{{item.price_now}}</td>
                  </tr>
                  <tr class="dc-portfolio__table-bottom">
                    <td scope="col" class="text-left">{{$t('views.portfolio.tableHeader.accountTotal')}}</td>
                    <td scope="col" class="text-center">{{totalData.priceOrigin}}</td>
                    <td scope="col" class="text-center">{{totalData.ratio}}</td>
                    <td scope="col" class="text-center">{{totalData.dividents}}</td>
                    <td scope="col" class="text-center">{{totalData.appreciation}}</td>
                    <td scope="col" class="text-center">{{totalData.priceNow}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </el-card>
          </div>
        </div>
        <div class="dc-portfolio__module">
          <h3 class="dc-portfolio__module-title">
            <span>{{$t('views.portfolio.investTitle')}}</span>
          </h3>
          <div class="dc-portfolio__module-content">
            <el-row :gutter="16">
              <el-col :md="8" :xs="24" :sm="12" v-for="product in productList" :key="product.id">
                <dc-product-item class="dc-portfolio__project-item" :data="product"></dc-product-item>
              </el-col>
            </el-row>
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
  import DcProductItem from '../../components/product-item';
  import DcAccountAside from '../account/accountAside';
  import Services from '../../services';

  export default {
    name: 'index',
    mixins: [
      loading
    ],
    components: {
      DcProductItem,
      DcAccountAside
    },
    data () {
      return {
        productList: [],
        tableData: [],
        totalData: {
          priceOrigin: '',
          priceNow: '',
          dividents: '',
          appreciation: ''
        },
        principalEarns: 0,
        showAside: true,
        windowWidth: 0
      };
    },
    mounted () {
      this._computeWindowWidth();
      this.showLoading();
      Promise.all([this._loadPortfolioCaseTable(), this._loadTotalData(), this._loadPortfolioCaseProductList()]).finally(() => {
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
      _loadPortfolioCaseTable () {
        return new Promise((resolve, reject) => {
          Services.getPortfolioCaseTable().then(response => {
            if (response) {
              if (Array.isArray(response.cases_value)) {
                this.tableData = response.cases_value;
              }
              if (response.total) {
                let total = response.total;
                this.totalData.priceOrigin = total.price_origin;
                this.totalData.priceNow = total.price_now;
                this.totalData.ratio = total.ratio;
                this.totalData.dividents = total.dividents;
                this.totalData.appreciation = total.appreciation;
              }
            }
            resolve();
          }, reject);
        });
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
      _loadPortfolioCaseProductList () {
        return new Promise((resolve, reject) => {
          Services.getPortfolioCaseProductList().then(response => {
            this.productList = [];
            if (response && Array.isArray(response.items)) {
              this.productList = response.items;
            }
            resolve();
          }, reject);
        });
      },
      onWindowResize () {
        this._computeWindowWidth();
      }
    }
  };
</script>