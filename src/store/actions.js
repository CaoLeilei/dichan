import * as MUTATION_TYPE from './mutationType';
import { setLocalstorage } from '../common/storage';


export default {
  updateLanguage ({commit}, lang){
    setLocalstorage('dc-lang', lang);
    commit(MUTATION_TYPE.UPDATE_LANGUAGE, lang);
  },
  updateUserName ({commit}, value) {
    commit(MUTATION_TYPE.UPDATE_USER_NAME, value);
  },
  updateUserIsLogin ({commit}, value) {
    commit(MUTATION_TYPE.UPDATE_USER_IS_LOGIN, value);
  },
  updateShowHeaderSetting ({ commit }, value) {
    commit(MUTATION_TYPE.UPDATE_SHOW_SETTING, value);
  },
  updateUserProjectCount ({ commit }, count) {
    commit(MUTATION_TYPE.UPDATE_USER_PROJECT_COUNT, count);
  },
  updateIsShowCommongMoudle ({ commit }, isShow) {
    commit(MUTATION_TYPE.UPDATE_IS_SHOW_COMMONG_MOUDLE, isShow);
  }
}
