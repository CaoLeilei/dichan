<template>
  <div class="dc-login is-login">
    <h2 class="dc-login__title">
      {{$t('views.resetPassword.pageTitle')}}
    </h2>
    <el-card class="dc-login__card" :body-style="cardBodyStyle">
      <div class="dc-login__card-inner">
        <el-form ref="form" class="dc-login__form" :model="model" :rules="rules">
          <el-form-item :label="$t('views.resetPassword.oldPasswordLabel')" prop="password">
            <el-input v-model="model.oldPassword" type="password"
                      :placeholder="$t('views.resetPassword.oldPasswordPlaceholder')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('views.resetPassword.passwordLabel')" prop="password">
            <el-input v-model="model.password" type="password"
                      :placeholder="$t('views.resetPassword.passwordPlaceholder')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('views.resetPassword.passwordPlaceholder')" prop="confirmPassword">
            <el-input v-model="model.confirmPassword"
                      :placeholder="$t('views.resetPassword.confirmPasswordPlaceholder')"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dc-login__card-footer clearfix">
        <el-button type="primary" class="float-right dc-login__button"
                   @click="onResetBtnClick">
          {{$t('views.resetPassword.resetBtn')}}
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        model: {
          oldPassword: '',
          password: '',
          confirmPassword: ''
        },
        rules: {
          oldPassword: [],
          password: [],
          confirmPassword: []
        },
        cardBodyStyle: {
          padding: 0
        }
      };
    },
    methods: {
      _submitResetPassword () {
        let _data = {
        };
      },
      onResetBtnClick () {
        const $form = this.$refs['form'];
        if ($form) {
          $form.validate().then(() => {
            this._submitResetPassword()
          });
        }
      }
    }
  };
</script>