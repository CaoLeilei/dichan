<template>
  <div class="dc-invite">
    <div class="dc-invite__top">
      <div class="dc-invite__top-inner">
        <h2 class="dc-invite__top-title">
          {{$t('views.invite.topTitle')}}
        </h2>
        <p class="dc-invite__top-text">{{$t('views.invite.topText')}}</p>
        <div class="dc-invite__input-box">
          <div class="form-group input-group">
            <el-input class="dc-invite__input"
                      ref="input"
                      v-model="linkUrl"
                      :readonly="true"
                      :placeholder="$t('views.invite.topInputPlaceholder')"
                      @click.native="onInputBoxClick">
            </el-input>
            <el-button type="primary" class="dc-invite__button" @click="onCopyClick">
              {{$t('views.invite.copyBtn')}}
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="dc-invite__container">
      <h3 class="dc-invite__container-title">
        {{invitedTitle}}
      </h3>
      <p class="dc-invite__container-text">
        {{$t('views.invite.containerText')}}
      </p>
      <div class="dc-invite__container-inner">
        <p>{{invitedCount}}</p>
        <h3>{{$t('views.invite.invitesAccepted')}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import loading from '../../common/mixins/loading';
  import Services from '../../services';

  export default {
    name: 'DcInvite',
    mixins: [
      loading
    ],
    data () {
      return {
        invitedCount: 0,
        linkUrl: ''
      };
    },
    mounted () {
      // console.log(this);
      this.showLoading();
      this._loadInviteLink().finally(() => {
        this.closeLoading();
      });
    },
    computed: {
      invitedTitle () {
        return this.$t('views.invite.containerTitle');
      }
    },
    methods: {
      _loadInviteLink () {
        return new Promise((resolve, reject) => {
          Services.getInviteLink().then(reseponse => {
            if (reseponse && reseponse.url) {
              this.linkUrl = reseponse.url;
            } else {
              this.linkUrl = '';
            }
            resolve();
          }, reject);
        });
      },
      _selectInputData () {
        const $inputBox = this.$refs['input'];
        if ($inputBox) {
          const $input = $inputBox.$el.querySelector('input');
          if ($input) {
            $input.focus();
            $input.select();
          }
        }
      },
      onInputBoxClick () {
        this._selectInputData();
      },
      onCopyClick () {
        this._selectInputData();
        document.execCommand('copy');
      }
    }
  };
</script>