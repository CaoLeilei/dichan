<template>
  <div class="dc-welcome">
    <div class="dc-welcome__top">
      <div class="dc-welcome__top-inner">
        <h3 class="dc-welcome__top-title">
          {{$t('views.welcome.pageTitle')}}
        </h3>
        <div class="dc-welcome__top-text">
          <p>XXX {{$t('views.welcome.subTextTop')}}</p>
          <p>{{$t('views.welcome.subTextBottom')}}</p>
        </div>
        <div class="dc-welcome__top-btn">
          <button class="btn dc-welcome__button" @click="onGetStartBtnClick">
            {{$t('views.welcome.getStartBtn')}}
          </button>
        </div>
        <div class="dc-welcome__top-text is-primary">
          <p>
            {{$t('views.welcome.getStartMessage')}}
          </p>
        </div>
      </div>
    </div>
    <div class="dc-welcome__content">
      <div class="row dc-welcome__row">
        <div class="col-12 col-md-4 dc-welcome__col">
          <div class="dc-welcome__item is-instant">
            <h3>{{$t('views.welcome.instantDiversificationTitle')}}</h3>
            <p>{{$t('views.welcome.instantDiversificationDesc')}}</p>
          </div>
        </div>
        <div class="col-12 col-md-4 dc-welcome__col">
          <div class="dc-welcome__item is-reduced">
            <h3>{{$t('views.welcome.reducedMinimumsTitle')}}</h3>
            <p>{{$t('views.welcome.reducedMinimumsDesc')}}</p>
          </div>
        </div>
        <div class="col-12 col-md-4 dc-welcome__col">
          <div class="dc-welcome__item is-optional">
            <h3>{{$t('views.welcome.optionalLiquidityTitle')}}</h3>
            <p>{{$t('views.welcome.optionalLiquidityDesc')}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DcWelcome',
    data () {
      return {
        invitedUserName: 'XXX',
        invitedCode: '',
      };
    },
    created () {
      this._loadInvitedInfo();
    },
    methods: {
      _loadInvitedInfo () {},
      onGetStartBtnClick () {
        let pathBase = '/create-account';
        let path = '';
        if (this.invitedCode) {
          path = `${pathBase}?code=${this.invitedCode}`;
        } else {
          path = pathBase;
        }
        this.$router.push({path: path});
      }
    }
  };
</script>