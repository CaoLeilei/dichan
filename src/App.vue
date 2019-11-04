<template>
  <div class="dc-app">
    <div class="dc-module is-header">
      <dc-header :show-left-menu="isShowLeftMenu"></dc-header>
    </div>
    <div class="dc-module">
      <router-view></router-view>
    </div>
    <div class="dc-module" v-if="isShowFooter">
      <dc-footer></dc-footer>
    </div>
    <div class="dc-module">
      <dc-copyright></dc-copyright>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import { hideFooterRouterName, showHeaderMenuRouterNames, hideHeaderSettingRouterNames } from './config';
  import DcHeader from './components/header';
  import DcFooter from './components/footer';
  import DcCopyright from './components/copyRight';

  export default {
    name: 'app',
    components: {
      DcHeader,
      DcFooter,
      DcCopyright
    },
    data () {
      return {
        routerName: ''
      };
    },
    created () {
      this.routerName = this.$route.name;
      this._checkHeaderSettingState();
    },
    watch: {
      '$route.name' (newRouterName) {
        this.routerName = newRouterName;
        this._checkHeaderSettingState();
      },
      userName () {
        this._checkHeaderSettingState();
      }
    },
    computed: {
      ...mapGetters([
        'lang',
        'userName'
      ]),
      isShowLeftMenu () {
        if (this.routerName) {
          return (showHeaderMenuRouterNames.includes(this.routerName));
        }
        return  false;
      },
      isShowFooter () {
        if (this.routerName) {
          return !(hideFooterRouterName.includes(this.routerName));
        }
        return  false;
      }
    },
    methods: {
      ...mapActions([
        'updateShowHeaderSetting'
      ]),
      _checkHeaderSettingState () {
        if (this.userName && !hideHeaderSettingRouterNames.includes(this.routerName)) {
          this.updateShowHeaderSetting(true);
        } else {
          this.updateShowHeaderSetting(false);
        }
      }
    }
  };
</script>