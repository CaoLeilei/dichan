<template>
  <div class="dc-overview">
    <div style="width: 100%; height: 500px;" v-if="!isLoadedData"></div>
    <!-- 头部导航栏 -->
    <div class="dc-overview__header">
      <div class="dc-overview__header-inner clearfix">
        <div class="title-box float-left">
          <el-dropdown style="margin-right: 10px;" trigger="click" class="title-box-drop" @command="onHeaderMenuDropdownCommand">
            <span class="el-dropdown-link" style="display: inline-block; vertical-align: top; width: 24px; height: 24px;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 5h2c.6 0 1 .4 1 1s-.4 1-1 1H3c-.6 0-1-.4-1-1s.4-1 1-1zm0 6h2c.6 0 1 .4 1 1s-.4 1-1 1H3c-.6 0-1-.4-1-1s.4-1 1-1zm0 6h2c.6 0 1 .4 1 1s-.4 1-1 1H3c-.6 0-1-.4-1-1s.4-1 1-1zM9 5h12c.6 0 1 .4 1 1s-.4 1-1 1H9c-.6 0-1-.4-1-1s.4-1 1-1zm0 6h12c.6 0 1 .4 1 1s-.4 1-1 1H9c-.6 0-1-.4-1-1s.4-1 1-1zm0 6h12c.6 0 1 .4 1 1s-.4 1-1 1H9c-.6 0-1-.4-1-1s.4-1 1-1z" fill="#ffffff"></path></svg>
            </span>
            <el-dropdown-menu slot="dropdown" class="dc-overview__header-dropdown">
              <el-dropdown-item v-for="item in paragrahTabs" :key="item.paragraph_id" :command="item.paragraph_id">
                <div class="header-dropdown-item" @click="onParagraphTabClick(item)">
                  {{item.tab_name}}
                </div>
              </el-dropdown-item>
              <el-dropdown-item command="photo">
                <div class="header-dropdown-item">{{$t('views.overview.header.photos')}}</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <h2>{{name}}</h2>
        </div>
        <div class="dc-overview__header-right float-right clearfix">
          <ul class="nav float-left sub-title-menu">
            <li class="nav-item" v-for="item in paragrahTabs" :key="item.id">
              <a href="javascript:;" class="nav-link"
                 @click="onParagraphTabClick(item)">
                {{item.tab_name}}
              </a>
            </li>
            <li class="nav-item" v-if="photoList && photoList.length">
              <a href="javascript:;" class="nav-link"
                 @click="onModuleItemClick('photo')">
                {{$t('views.overview.header.photos')}}
              </a>
            </li>
          </ul>
          <div class="header-download float-left" v-if="downloads && downloads.length">
            <a href="javascript:;" class="nav-link" @click="onModuleItemClick('download')">
              <i class="menu-icon-download"></i>
            </a>
          </div>
          <div class="invite-box float-left">
            <el-button type="primary" class="invite-btn" @click="onHeaderInviteBtnClick">{{$t('views.overview.header.investBtn')}}</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 顶部大图的部分内容 -->
    <div class="dc-overview__top">
      <div class="dc-overview__top-back">
        <img :src="topBackImageUrl" alt="" class="back-media">
      </div>
      <div class="dc-overview__top-content">
        <div class="dc-overview__top-main">
          <div class="main-inner">
            <div class="main-content">
              <h3 class="top-main-title">{{name}}</h3>
              <p class="top-main-desc">{{desc}}</p>
              <div class="main-ctr-box" v-if="topPdfUrl || topVideoUrl">
                <el-button type="primary" class="main-ctr-button"
                           v-if="topVideoUrl"
                           @click="onTopVideoBtnClick">
                  {{$t('views.overview.top.videoBtn')}}
                </el-button>
                <el-button type="primary" class="main-ctr-button"
                           v-if="topPdfUrl"
                           @click="onTopPdfBtnClick">
                  {{$t('views.overview.top.demoBtn')}}
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="dc-overview__top-footer">
          <div class="footer-inner">
            <div class="footer-item" v-for="word in words" :key="word.title">
              <p>{{word.desc}}</p>
              <h4>{{word.title}}</h4>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- 投资按钮，在小屏的情况下会出现 -->
    <div class="dc-overview__invest-box">
      <el-button type="primary" @click="onHeaderInviteBtnClick">{{$t('views.overview.header.investBtn')}}</el-button>
    </div>
    <!-- 基本的信息-->
    <div class="dc-overview__module" ref="brights" v-if="brights && brights.length">
      <h3 class="dc-overview__title">{{brightsTitle}}</h3>
      <el-row :gutter="40">
        <el-col :lg="8" v-for="(item, index) in brights" :key="index">
          <div class="dc-overview__base-item" :style="{background: `url('${item.icon_url}') no-repeat top center`, backgroundSize: '85px 85px'}">
            <h3>{{item.title}}</h3>
            <div class="item-content">
              <p>{{item.desc}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <dc-overview-paragrah :ref="paragraph.id" v-for="(paragraph, index) in paragraphs" :key="index"
                          :data="paragraph"></dc-overview-paragrah>
    <div class="dc-overview__module" ref="photo" v-if="photoList && photoList.length">
      <div class="dc-overview__detail">
        <dc-overview-title :title="$t('views.overview.pages.photos')"></dc-overview-title>
        <dc-overview-photo :photo-list="photoList"></dc-overview-photo>
      </div>
    </div>
    <div class="dc-overview__module" ref="download"
         v-if="downloads && downloads.length">
      <div class="dc-overview__detail">
        <dc-overview-title :title="$t('views.overview.pages.downloads')"></dc-overview-title>
        <dc-overview-download :download-list="downloads"></dc-overview-download>
      </div>
    </div>
    <el-dialog :title="$t('views.overview.videoDialogTitle')" top="20vh"
               width="600px"
               :append-to-body="true"
               :visible.sync="videoDialogVisible">
      <dc-overview-video-dialog :url="topVideoUrl"></dc-overview-video-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import loading from '../../common/mixins/loading';
  import services from '../../services';
  import $ from 'jquery';
  import DcOverviewTitle from './overviewTitle';
  import DcOverviewPhoto from './overviewPhoto';
  import DcOverviewDownload from './overviewDownload';
  import DcOverviewParagrah from './overviewParagrah';
  import DcOverviewVideoDialog from './overviewVideoDialog';
  // import DcOverviewBarChart from './overview-bar-chart';
  export default {
    name: 'overview',
    mixins: [
      loading
    ],
    components: {
      DcOverviewTitle,
      DcOverviewPhoto,
      DcOverviewDownload,
      DcOverviewParagrah,
      DcOverviewVideoDialog
      // DcOverviewBarChart
    },
    data() {
      return {
        isLoadedData: false,
        id: '',
        name: '',
        desc: '',
        topBackImageUrl: '',
        words: [],
        brightsTitle: '',
        brights: [],
        paragraphs: [],
        paragrahTabs: [],
        photoList: [],
        downloads: [],
        videoDialogVisible: false,
        topPdfUrl: '',
        topVideoUrl: ''
      };
    },
    created () {
      this.id = this.$route.params.id;
    },
    mounted () {
      this.showLoading();
      this._getOverviewData().finally(() => {
        this.closeLoading();
      });
    },
    computed: {
      topBoxStyle () {
        return {
          background: `url(${this.topBackImageUrl}) no-repeat top center`,
          backgroundSize: 'cover'
        }
      }
    },
    methods: {
      _parseOverviewData (data) {
        this.name = data.name;
        this.topBackImageUrl = data.bgimg_url;
        this.desc = data.desc;
        if (Array.isArray(data.words)) {
          this.words = data.words;
        } else {
          this.words = [];
        }
        this.brightsTitle = data.brights_title;
        if (Array.isArray(data.brights)) {
          this.brights = data.brights;
        } else {
          this.brights = [];
        }
        this.paragrahTabs = data.paragrah_tabs;
        if (Array.isArray(data.paragraphs)) {
          this.paragraphs = data.paragraphs;
        } else {
          this.paragraphs = [];
        }
        if (Array.isArray(data.photos)) {
          this.photoList = data.photos;
        } else {
          this.photoList = [];
        }
        if (Array.isArray(data.downloads)) {
          this.downloads = data.downloads;
        } else {
          this.downloads = [];
        }
        this.topPdfUrl = data.intro_pdf_url;
        this.topVideoUrl = data.intro_view_url;
      },
      _getOverviewData () {
        return new Promise((resolve, reject) => {
          let _data = {
            case_id: this.id
          };
          services.getOverviewData(_data).then(response => {
            if (response && response.case) {
              this._parseOverviewData(response.case);
            } else {
              this.$message({
                message: 'Get Overview Data error',
                type: 'error'
              });
            }
            this.isLoadedData = true;
            resolve();
          }, reject);
        });
      },
      jumpToParagraph($el) {
        if ($el) {
          let top = $($el).offset().top;
          let headerHeight = $('.dc-module.is-header').height();
          let overHeaderHeight = $('.dc-overview__header').height();
          $('html,body').animate({scrollTop: top - headerHeight - overHeaderHeight});
        }

      },
      onHeaderInviteBtnClick () {
        this.$router.push({path: `/investment/${this.id}`})
      },
      onHeaderMenuDropdownCommand (name) {
        let names = ['brights', 'photo', 'download'];
        if (names.includes(name)) {
          const $module = this.$refs[name];
          if ($module) {
            this.jumpToParagraph($module);
          }
        } else {
          const $module = this.$refs[name];
          if ($module && Array.isArray( $module) && $module.length) {
            let $el = $module[0].$el;
            this.jumpToParagraph($el);
          }
        }
      },
      onParagraphTabClick(tabItem) {
        if (tabItem) {
          let name = tabItem.paragraph_id;
          const $module = this.$refs[name];
          if ($module && Array.isArray( $module) && $module.length) {
            let $el = $module[0].$el;
            this.jumpToParagraph($el);
          }
        }
      },
      onModuleItemClick (name) {
        const $module = this.$refs[name];
        if ($module) {
          this.jumpToParagraph($module);
        }
      },
      onTopVideoBtnClick () {
        this.videoDialogVisible = true;
      },
      onTopPdfBtnClick () {
        window.open(this.topPdfUrl);
      }
    }
  };
</script>