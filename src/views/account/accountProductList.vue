<template>
 <div class="dc-account__products">
   <el-row :gutter="48">
     <el-col :lg="6">
       <ul class="nav product-nav">
         <li class="nav-item product-nav-item">
           <a class="nav-link product-nav-link" href="javascript:;"
              :class="{'is-active': !currentTab}"
              @click.prevent="onTabClick(null)">
             {{$t('views.account.project.everything')}}
           </a>
         </li>
         <li class="nav-item product-nav-item" v-for="tab in tabList" :key="tab.id">
           <a class="nav-link product-nav-link" href="javascript:;"
              :class="{'is-active': currentTab && currentTab.id ===  tab.id}"
              @click.prevent="onTabClick(tab)">
             {{tab.name}}
           </a>
         </li>
       </ul>
     </el-col>
     <el-col :lg="18">
       <dc-product-item class="product-item"
                        v-for="product in displayList" :key="product.id"
                        :show-all-words="true"
                        :data="product" @click="onProductItemClick(product)">
       </dc-product-item>
     </el-col>
   </el-row>
 </div>
</template>

<script>
  import DcProductItem from '../../components/product-item';
  export default {
    name: 'DcAccountProductList',
    components: {
      DcProductItem
    },
    props: {
      tabList: {
        type: Array,
        default () {
          return [];
        }
      },
      productList: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    data () {
      return {
        currentTab: null
      };
    },
    computed: {
      displayList () {
        if (!this.currentTab) {
          return this.productList;
        } else {
          return  this.productList.filter(o => {
            return o.case_type.id === this.currentTab.id;
          });
        }
      }
    },
    methods: {
      onTabClick (tab) {
        this.currentTab = tab;
      },
      onProductItemClick (product) {
        let productId = product.id;
        this.$router.push(`/overview/${productId}`);
      }
    }
  };
</script>