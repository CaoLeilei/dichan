<template>
  <div class="dc-login is-login">
    <h2 class="dc-login__title">
      {{$t('views.forgottenPassword.pageTitle')}}
    </h2>
    <el-card class="dc-login__card" :body-style="cardBodyStyle">
      <div class="dc-login__card-header">
        <p class="">
          {{$t('views.forgottenPassword.cardText')}}
        </p>
      </div>
      <div class="dc-login__card-inner">
        <el-form ref="form" class="dc-login__form"
                 :hide-required-asterisk="true"
                 :model="model" :rules="rules">
          <el-form-item prop="email" :label="$t('views.forgottenPassword.emailAddressLabel')">
            <el-input v-model="model.email"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dc-login__card-footer clearfix">
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12">
            <el-button type="primary" class="dc-login__button"
                       @click="onGoBackBtnClick">
              {{$t('views.forgottenPassword.goBackBtn')}}
            </el-button>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-button type="primary" class="dc-login__button"
                       @click="onResetBtnClick">
              {{$t('views.forgottenPassword.restBtn')}}
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
  import services from '../../services';
  export default {
    name: 'findPassword',
    data () {
      const _this = this;
      return {
        model: {
          email: ''
        },
        rules: {
          email: [
            { required: true, message: _this.$t('views.forgottenPassword.emailEmpty'), trigger: 'blur'},
            { type: 'email', message: _this.$t('views.forgottenPassword.emailError'), trigger: 'blur'}
          ]
        },
        cardBodyStyle: {
          padding: 0
        }
      };
    },
    methods: {
      _sendFindPasswordEmail () {
        let _data = {
          email: this.model.email
        };
        services.resetPassword(_data).then(() => {
          this.$alert(this.$t('views.forgottenPassword.confrimationText'), this.$t('views.forgottenPassword.alertTitle'), {
            type: 'success'
          });
        });
      },
      /**
       * 单机进行返回前一页
       */
      onGoBackBtnClick () {
        this.$router.back();
      },
      onResetBtnClick () {
        const $form = this.$refs['form'];
        if ($form) {
          $form.validate().then(() => {
            this._sendFindPasswordEmail();
          });
        }
      }
    }
  };
</script>
