<template>
  <div class="dc-header__right-inner">
    <dc-header-language-setting></dc-header-language-setting>
    <dc-header-setting v-if="showSetting"></dc-header-setting>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import DcHeaderSetting from './headerSetting';
  import DcHeaderLanguageSetting from './headerLanguageSetting';

  export default {
    name: 'headerRight',
    components: {
      DcHeaderSetting,
      DcHeaderLanguageSetting
    },
    props: {
      canInvite: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        id: ''
      };
    },
    computed: {
      ...mapGetters([
        'showSetting'
      ])
    },
    methods: {
      onInvitationBtnClick () {
        this.$router.push({path: '/invite'});
      }
    }
  };
</script>