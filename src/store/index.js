import Vuex from 'vuex';
import states from './states';
import mutations from './mutations';
import * as getters from './getters';
import actions from './actions';

export default function (Vue) {
  Vue.use(Vuex);
  return new Vuex.Store({
    state: states,
    getters,
    mutations,
    actions
  });
}
