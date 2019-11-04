<template>
  <el-card :body-style="cardBodyStyle" shadow="hover" class="dc-product-item-card">
    <div class="dc-product-item" @click="onClick">
      <div class="dc-product-item__image-box">
        <div class="image-inner">
          <img :src="data.cardimg_url" alt="">
        </div>
      </div>
      <div class="dc-product-item__info-box">
        <div class="dc-product-item__title-box">
          <h3>{{data.name}}</h3>
          <p>{{data.desc}}</p>
        </div>

        <div class="dc-product-item__num-box" :class="{'is-show-all': showAllWords}">
          <div class="num-item" v-for="word in displayWords" :key="word.title">
            <h4>{{word.title}}</h4>
            <div class="num-item-content">
              <span>{{word.desc}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    <el-dialog title="提示" top="5vh" custom-class="dc-product-item__quick-view"-->
<!--               :show-close="false"-->
<!--               :width="dialogWidth"-->
<!--               :append-to-body="true"-->
<!--               :visible.sync="showDialog">-->
<!--      <dc-quick-view :data="quickViewData"-->
<!--                     :visible="showDialog"-->
<!--                     @close="onQuickViewClose"></dc-quick-view>-->
<!--    </el-dialog>-->
  </el-card>
</template>

<script>
  import $ from 'jquery';
  // import DcQuickView from './quickView';
  import loading from '../../common/mixins/loading';
  import Services from '../../services';

  export default {
    name: 'DcProductItem',
    mixins: [
      loading
    ],
    components: {
      // DcQuickView
    },
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      },
      showAllWords: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showDialog: false,
        // quickViewData: null,
        // dialogWidth: '30%',
        cardBodyStyle: {
          padding: 0
        }
      };
    },
    created() {
      // console.log(this.data);
    },
    mounted() {
      const {
        onWindowResize
      } = this;
      window.addEventListener('resize', onWindowResize);
    },
    beforeDestroy() {
      const {
        onWindowResize
      } = this;
      window.removeEventListener('resize', onWindowResize);
    },
    computed: {
      displayWords() {
        let words = [];
        if (this.data && Array.isArray(this.data.words)) {
          let maxCount = (this.showAllWords || this.data.words.length < 3) ? this.data.words.length : 3;

          for (let index = 0; index < maxCount; index++) {
            words.push(this.data.words[index]);
          }
        }
        return words;
      }
    },
    methods: {
      onClick() {
        this.$router.push({path: `/overview/${this.data.id}`});
      }
    }
  };
</script>