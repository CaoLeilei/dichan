import * as MUTATION_TYPE from './mutationType';

export default {
  [MUTATION_TYPE.UPDATE_LANGUAGE] (state, lang) {
    state.lang = lang;
  },
  [MUTATION_TYPE.UPDATE_USER_NAME] (state, userName) {
    state.userName = userName;
  },
  [MUTATION_TYPE.UPDATE_USER_IS_LOGIN] (state, userIsLogin) {
    state.userIsLogin = userIsLogin;
  },
  [MUTATION_TYPE.UPDATE_SHOW_SETTING] (state, showSetting) {
    state.showSetting = showSetting;
  },
  [MUTATION_TYPE.UPDATE_USER_PROJECT_COUNT] (state, count) {
    state.userProjectCount = count;
  },
  [MUTATION_TYPE.UPDATE_IS_SHOW_COMMONG_MOUDLE] (state, isShow) {
    state.isShowCommonModule = isShow;
  },
  [MUTATION_TYPE.UPDATE_PRIVACY_POLICY_URL] (state, url) {
    state.privacyPolicyUrl = url;
  }
};
