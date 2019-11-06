<template>
  <el-dropdown class="dc-header__settings dc-header__dropwdown"
               trigger="click" @command="onLanguageCommand">
    <el-button type="text" class="dropdown-button is-language"
               v-if="currentLanguage">
      <i class=" el-icon--left lang-icon" :class="currentLanguage.icon"></i>
      {{currentLanguage.name}}
      <i class="el-icon-caret-bottom el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :command="language.key" v-for="language in languageList" :key="language.key">
        <i class=" el-icon--left lang-icon" :class="language.icon"></i>
        {{language.name}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {setCookies} from '../../common/cookie';
  import {setLocalstorage} from '../../common/storage';

  export default {
    name: 'headerLanguageSetting',
    data() {
      const _this = this;
      return {
        languageList: [
          {
            icon: 'en-us',
            key: 'en',
            name: _this.$t('components.header.langs.English')
          },
          {
            icon: 'zh-cn',
            key: 'zh',
            name: _this.$t('components.header.langs.Chinese')
          }
        ],
        currentLanguage: null
      };
    },
    created () {
      this._loadLanguageList();
    },
    computed: {
      ...mapGetters([
        'lang'
      ])
    },
    methods: {
      _loadLanguageList () {
        if (this.lang) {
           let lang = this.languageList.find(o => {
             return o.key === this.lang;
           });
           if (lang) {
             this.currentLanguage = lang;
             return;
           }
        }
        this.currentLanguage = this.languageList[0];
      },
      onLanguageCommand (command) {
        setCookies('language', command);
        setLocalstorage('dc-lang', command);
        location.reload();
      }
    }
  };
</script>