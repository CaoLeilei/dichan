import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import { mapGetters, mapActions } from 'vuex';
import App from './App.vue';
import routes from './routes';
import initStore from './store';
// import langs from './langs';
import InitElementUi from './common/element';
import { getLocalstorage, setLocalstorage } from './common/storage';
import { getCookies } from './common/cookie';
import Service from './services';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.css';
import './styles/index.scss';
import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';


Vue.config.productionTip = false;
InitElementUi(Vue);
Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(VideoPlayer);

function initVueRouter (routers) {
  return new VueRouter({
    routes: routers
  });
}

function initI18n() {
  const langs = window.langs;
  var lang = getCookies('language');
  if (!lang || !langs[lang]) {
    lang = 'en';
  }
  return new VueI18n({
    locale: lang,
    messages: langs
  });
}

function initApp () {
  const router = initVueRouter(routes);
  const i18n = initI18n();
  const store = initStore(Vue);

  window.App = new Vue({
    router,
    store,
    i18n,
    data () {
      return {
        isLogin: false
      };
    },
    created() {
      this.loadStorageLanguage();
      this.setHtmlPageTitle();
      this.loadCommonConfig();
      this.checkUserIsLogin().then(() => {
        return this.loadProductList();
      }).then(() => {
        if (!this.isLogin) {
          this.$router.replace({path: '/login'});
        }
      }, () => {
        this.$router.replace({path: '/login'});
      })
    },
    computed: {
      ...mapGetters([
        'lang'
      ])
    },
    methods: {
      ...mapActions([
        'updateUserIsLogin',
        'updateUserName',
        'updateLanguage',
        'updateUserProjectCount',
        'updatePrivacyPolicyUrl',
        'updatePrimiorLinkUrl',
        'updateTermsofService',
        'updatePrimiorRatingPdf'
      ]),
      loadCommonConfig () {
        this.updatePrivacyPolicyUrl(window.common.privacyPolicyUrl);
        this.updatePrimiorLinkUrl(window.common.primiorLinkUrl);
        this.updateTermsofService(window.common.termsofService);
        this.updatePrimiorRatingPdf(window.common.primiorRatingPdf);
      },
      setHtmlPageTitle () {
        let title = this.$t('common.headerTitle');
        document.title = title;
      },
      loadStorageLanguage () {
        let lang = getLocalstorage('dc-lang');
        if (lang) {
          this.updateLanguage(lang);
        } else {
          this.updateLanguage('en');
          setLocalstorage('dc-lang', 'en');
        }
      }, //
      checkUserIsLogin () {
        return new Promise((resolve, reject) => {
          Service.getUserInfo().then(response => {
            if (response && response.name) {
              this.isLogin = true;
              this.updateUserName(response.name);
            }
            this.updateUserIsLogin(true);
            resolve();
          }, err => {
            this.updateUserIsLogin(false);
            reject(err);
          });
        });

      },
      loadProductList () {
        return new Promise((resolve, reject) => {
          Service.getProductList().then(response => {
            let projectList = [];
            if (response && Array.isArray(response.items)) {
              projectList = response.items;
            }
            this.updateUserProjectCount(projectList.length);
            resolve();
          }, reject);
        });
      },
    },
    render: h => h(App)
  }).$mount('#app');
}

initApp();