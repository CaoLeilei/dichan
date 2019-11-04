<template>
  <div class="dc-list__module" >
    <h3 class="dc-list__module-title">
      <span>{{title}}</span>
    </h3>
    <div class="dc-list__module-text">
      {{desc}}
    </div>
    <div class="dc-list__module-content">
      <div class="row dc-list__row">
        <div class="col-12 col-sm-6 col-lg-3 dc-list__col" v-for="project in productList" :key="project.id">
          <dc-product-item :data="project" @click="onProductItemClick"></dc-product-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DcProductItem from '../../components/product-item';
  export default {
    name: 'DcListModule',
    components: {
      DcProductItem
    },
    props:{
      title: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      list: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    data() {
      return {
        productList: []
      };
    },
    mounted () {
      this.productList = this.list;
    },
    watch: {
      list (value) {
        if (Array.isArray(value)) {
          this.productList = value;
        } else {
          this.productList = [];
        }
      }
    },
    methods: {
      onProductItemClick (data) {
        let dataId = data.id;
        this.$router.push(`/overview/${dataId}`);
      }
    }
  };
</script>