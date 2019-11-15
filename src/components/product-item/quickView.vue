<template>
  <div class="dc-product-item" v-if="data">
    <a href="javascript:;" class="close-btn" @click.stop.prevent="onCloseBtnClick">
      <i class="el-icon-close"></i>
    </a>
    <div class="dc-product-item__image-box">
      <div class="image-inner">
        <img :src="data.cardimg_url" alt="">
      </div>
      <div class="text-mask">
        <span class="text-box">Quick View</span>
      </div>
    </div>
    <div class="dc-product-item__info-box">
      <div class="dc-product-item__title-box">
        <h3>{{data.name}}</h3>
        <p>{{data.desc}}</p>
      </div>

      <div class="dc-product-item__quick-word">
        <div class="word-item" v-for="word in words" :key="word.title">
          <span class="word-title">{{word.title}}</span>
          <span class="word-value">{{word.desc}}</span>
        </div>
      </div>
      <div class="dc-product-item__quick-footer">
        <el-button @click="onViewDetailBtnClick">
          View Details <i class="el-icon-arrow-right"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'quickView',
    props: {
      data: {
        type:Object,
        default () {
          return null;
        }
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        words: []
      };
    },
    mounted () {
      this.words = this.data.words;
    },
    watch: {
      visible (value) {
        if (value && this.data) {
          this.words = this.data.de;
        }
      }
    },
    methods: {
      onCloseBtnClick () {
        this.$emit('close');
      },
      onViewDetailBtnClick () {
        this.$emit('close');
        this.$router.push({path: `/overview/${this.data.id}`});
      }
    }
  };
</script>