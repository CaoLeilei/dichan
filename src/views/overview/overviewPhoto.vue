<template>
  <div class="dc-overview__photo">
    <el-row>
      <el-col :xs="8" :sm="8" :md="8" v-for="(item, index) in displayPhotoList" :key="index">
        <div class="photo-box" @click="onImageItemClick(index)">
          <div class="photo-image">
            <img :src="item.img_url" alt="">
          </div>
          <div class="photo-name">
            <div class="photo-name-inner">
              {{item.name}}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="view-all-box">
      <el-image ref="imgPreview" :preview-src-list="photoSrcList"
                :src="prevImageSrc" :index="prevImageIndex" style="width: 0; height: 0">
        <span slot="error">&nbsp;</span>
      </el-image>
      <el-button type="text" @click="onViewAllBtnClick">
        {{$t('views.overview.viewGallry')}}
        <span class="count-box">({{photoCount}})</span>
      </el-button>
    </div>
  </div>
</template>

<script>
  import ElImage from '@/components/image';
  export default {
    name: 'DcOverviewPhoto',
    components: {
      ElImage
    },
    props: {
      photoList: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    data () {
      return {
        prevImageSrc: '',
        prevImageIndex: 0,
        photoSrcList: []
      };
    },
    mounted () {
      if (this.photoList.length) {
        this._buildPhotoSrcList();
      }
    },
    watch: {
      photoList () {
        this._buildPhotoSrcList();
      }
    },
    computed: {
      photoCount () {
        return this.photoList.length;
      },
      displayPhotoList () {
        let list = [];
        let count  = this.photoList.length < 6 ? this.photoList.length : 6;
        for (let index = 0; index < count; index++) {
          list.push(this.photoList[index]);
        }
        return list;
      }
    },
    methods: {
      _buildPhotoSrcList () {
        this.photoSrcList = [];
        this.photoList.forEach(item => {
          this.photoSrcList.push(item.img_url);
        });
      },
      _showImagePreview () {
        const $imgPreview = this.$refs['imgPreview'];
        if ($imgPreview) {
          $imgPreview.clickHandler();
        }
      },
      onImageItemClick (index) {
        let photoItem = this.displayPhotoList[index];
        if (photoItem) {
          this.prevImageSrc = photoItem.img_url
        } else {
          this.prevImageSrc = '';
        }
        this._showImagePreview();
      },
      onViewAllBtnClick () {
        this.prevImageSrc = '';
        this._showImagePreview();
      }
    }
  };
</script>