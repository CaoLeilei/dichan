<template>
  <div class="dc-header clearfix">
    <div class="dc-header__left float-left clearfix">
      <h1 class="dc-header__logo" @click="onLogoClick">
        <img src="/images/header-logo.png" alt="">
      </h1>
      <div class="dc-header__nav" v-if="showLeftMenu">
        <dc-header-nav-menu :active-name="currentRouterName"></dc-header-nav-menu>
      </div>
    </div>
    <div class="dc-header__right float-right">
      <dc-header-right></dc-header-right>
    </div>
    <div class="dc-header__menu-btn float-right">
      <el-button type="text" icon="icon-header-menu"
                 class="menu-btn"
                 @click="onHeaderMenuBtnClick"></el-button>
    </div>
    <el-drawer title=" "
               ref="menuDrawer"
               class="dc-drawer"
               size="256px"
               :append-to-body="true"
               :visible.sync="drawerVisible"
               :direction="direction">
      <div class="dc-drawer__menu">
        <ul class="menu-list">
          <li class="menu-list-item" v-if="userProjectCount !== 0">
            <a href="#/portfolio" @click.stop.prevent="onMenuItemClick('/portfolio')">
              {{$t('components.header.menus.portfolio')}}
            </a>
          </li>
          <li class="menu-list-item" v-if="userProjectCount !== 0">
            <a href="#/transactions" @click.stop.prevent="onMenuItemClick('/transactions')">
              {{$t('components.header.menus.transactions')}}
            </a>
          </li>
          <li class="menu-list-item" v-if="userProjectCount !== 0">
            <a href="#/invite" @click.stop.prevent="onMenuItemClick('/invite')">
              {{$t('components.header.menus.invitation')}}
            </a>
          </li>
          <li class="menu-list-item">
            <a href="#/browse" @click.stop.prevent="onMenuItemClick('/browse')">
              {{$t('components.header.menus.browse')}}
            </a>
          </li>
          <li class="menu-list-item" :class="{'is-active': languageActive}">
            <a href="#/language" @click.stop.prevent="onMenuLanguageClick">
              {{$t('components.header.menus.language')}}
            </a>
            <ul class="sub-menu" v-show="languageActive">
              <li class="sub-menu-item">
                <a href="javascript:;" @click.stop="onLanguageItemClick('en')">
                  {{$t('components.header.langs.English')}}
                </a>
              </li>
              <li class="sub-menu-item">
                <a href="javascript:;" @click.stop="onLanguageItemClick('zh')">
                  {{$t('components.header.langs.Chinese')}}
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <div class="dc-drawer__menu-divider"></div>
        <ul class="menu-list">
          <li class="menu-list-item">
            <a href="javascript:;" @click.prevent.stop="onSettingBtnClick">
              {{$t('components.header.menus.resetYourPassword')}}
            </a>
          </li>
          <li class="menu-list-item">
            <a href="javascript:;" @click.prevent.stop="onLogoutBtnClick">
              {{$t('components.header.menus.logout')}}
            </a>
          </li>
        </ul>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import DcHeaderNavMenu from './headerNavMenu';
  import DcHeaderRight from './headerRight';
  import Services from '../../services';
  import {setCookies} from '../../common/cookie';

  export default {
    name: 'DcHeader',
    components: {
      DcHeaderNavMenu,
      DcHeaderRight
    },
    props: {
      showLeftMenu: {
        type: Boolean,
        default: true
      },
      canInvite: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        currentRouterName: '',
        // 抽屉相关的内容
        drawerVisible: false,
        direction: 'rtl',
        languageActive: false
      };
    },
    created () {
      this.currentRouterName = this.$route.name;
    },
    watch: {
      '$route.name' (newValue) {
        this.currentRouterName = newValue;
      }
    },
    computed: {
      ...mapGetters([
        'userName',
        'userIsLogin',
        'userProjectCount'
      ])
    },
    methods: {
      ...mapActions([
        'updateUserName'
      ]),
      _closeDrawer () {
        const $menuDrawer = this.$refs['menuDrawer'];
        if ($menuDrawer) {
          $menuDrawer.closeDrawer();
        }
      },
      _submitLogout () {
        let _data = {};
        Services.logout(_data).then(() => {
          this.$router.replace({path: '/login'});
        })
      },
      onLogoClick () {
        debugger;
        if (this.userIsLogin) {
          if (this.$route.name !== '/account') {
            if (this.userProjectCount) {
              this.$router.push({path: '/account'});
            } else {
              if (this.$route.name !== '/browse') {
                this.$router.push({path: '/browse'});
              }
            }
          }
        } else {
          if (this.$route.name !== 'login') {
            this.$router.push({path: '/login'});
          }
        }
      },
      onHeaderMenuBtnClick () {
        this.drawerVisible = true;
      },
      onMenuItemClick (url) {
        this._closeDrawer();
        this.$router.push({path: url});
      },
      onMenuLanguageClick () {
        this.languageActive = !this.languageActive;
      },
      onLanguageItemClick (language) {
        setCookies('language', language);
        this._closeDrawer();
        location.reload();
      },
      onSettingBtnClick () {
        this._closeDrawer();
        this.updateUserName('');
        this.$router.push({path: '/forgotten-password'});
      },
      onLogoutBtnClick () {
        this._closeDrawer();
        this._submitLogout();
      }
    }
  };
</script>