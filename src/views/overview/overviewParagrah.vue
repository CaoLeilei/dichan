<template>
  <div class="dc-overview__module is-paraghraph">
    <div class="dc-overview__module-header" v-if="!!data.title || !!data.title_desc">
      <h4 class="dc-overview__title">
        <span>{{data.title}}</span>
      </h4>
      <div class="dc-overview__sub-title">
        {{data.title_desc}}
      </div>
    </div>
    <div class="dc-overview__module-inner">
      <div class="module-content-item module-image" v-if="!!data.img_url">
        <div class="image-box">
          <img :src="data.img_url" alt="">
        </div>
      </div>
      <div class="module-content-item paragraph-item" v-if="!!data.subtitle || !!data.text">
        <h4 class="paragraph-title">{{data.subtitle}}</h4>
        <div class="paragraph-text">{{data.text}}</div>
      </div>
      <div class="module-content-item prop-content" v-if="!!data.pop_img_name || !!data.pop_text_name">
        <div class="prop-content-inner">
          <el-button type="text" class="prop-button"
                     @click="onImagePropItemClick">
            <i class="pop-icon"></i>
            {{data.pop_img_name}}
          </el-button>
        </div>
        <div class="prop-content-inner">
          <el-button type="text" class="prop-button"
                     @click="onDocPropItemClick">
            <i class="pop-icon"></i>
            {{data.pop_text_name}}
          </el-button>
        </div>
      </div>
    </div>
    <el-dialog
        :title="dialogTitle"
        :fullscreen="true"
        :visible.sync="dialogVisible"
        custom-class="dc-overview__dialog"
        width="30%">
      <div class="dialog-content" :class="{'is-image': dialogType === 'image'}">
        <img v-if="dialogType === 'image'" :src="dialogData" alt="">
        <div class="content-text" v-if="dialogType==='text'">{{dialogData}}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'overviewParagraph',
    props: {
      data: {
        type: Object,
        default () {
          return {};
        }
      }
    },
    data() {
      return {
        dialogVisible: false,
        dialogTitle: '',
        dialogData: '',
        dialogType: 'image'
      };
    },
    created () {
    },
    methods: {
      onImagePropItemClick () {
        this.dialogTitle = this.data.pop_img_name;
        this.dialogVisible = true;
        this.dialogData = this.data.pop_img;
        this.dialogType = 'image';
      },
      onDocPropItemClick () {
        this.dialogTitle = this.data.pop_text_name;
        this.dialogVisible = true;
        this.dialogData = this.data.pop_text;
        this.dialogType = 'text';
      }
    }
  };
</script>