<template>
  <div class="dc-header__nav-menu">
    <ul class="nav">
      <li class="nav-item" v-if="userProjectCount !== 0">
        <a href="#/portfolio" class="nav-link" :class="{'active': activeName === headerActiveRouterName.PORTFOLIO}">
          {{$t('components.header.menus.portfolio')}}
        </a>
      </li>
      <li class="nav-item" v-if="userProjectCount !== 0">
        <a href="#/transactions" class="nav-link" :class="{'active': activeName === headerActiveRouterName.TRANSACTIONS}">
          {{$t('components.header.menus.transactions')}}
        </a>
      </li>
      <li class="nav-item" v-if="userProjectCount !== 0">
        <a href="#/invite" class="nav-link" :class="{'active': activeName === headerActiveRouterName.INVITE}">
          {{$t('components.header.menus.invitation')}}
        </a>
      </li>
      <li class="nav-item">
        <a href="#/browse" class="nav-link"
           :class="{'active': activeName === headerActiveRouterName.BROWSE || activeName === headerActiveRouterName.OVERVIEW || activeName === headerActiveRouterName.INVESTMENT}">
          {{$t('components.header.menus.browse')}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {headerActiveRouterName} from '../../config';

  export default {
    name: 'headerNavMenu',
    props: {
      activeName: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        headerActiveRouterName
      };
    },
    computed: {
      ...mapGetters([
        'userProjectCount'
      ])
    },
    // watch: {
    //   '$toute.name' (newValue) {
    //     // console.log(newValue);
    //   }
    // },
    methods: {
    }
  };
</script>