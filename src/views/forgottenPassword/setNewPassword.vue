<template>
  <div class="dc-login is-login">
    <h2 class="dc-login__title">
      Forgotten Password
    </h2>
    <el-card class="dc-login__card" :body-style="cardBodyStyle">
      <div class="dc-login__card-inner">
        <el-form ref="form" class="dc-login__form" :model="model" :rules="rules">
          <el-form-item :label="$t('views.login.passwordLabel')" prop="password">
            <el-input v-model="model.password" type="password"></el-input>
          </el-form-item>
          <el-form-item :label="$t('views.login.accountLabel')" prop="confirmPassword">
            <el-input v-model="model.confirmPassword"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dc-login__card-footer clearfix">
        <el-button type="primary" class="float-right dc-login__button"
                   @click="onResetBtnClick">
          {{$t('views.login.loginBtn')}}
        </el-button>
      </div>
    </el-card>
    <div class="dc-login__panel" v-if="false">
      <form class="dc-login__form">
        <div class="form-group dc-login__form-group">
          <label class="dc-login__label" for="exampleInputEmail1">New Password</label>
          <input type="email" class="form-control dc-input dc-login__input"
                 id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="">
<!--          <div class="">Confrimation has been sent to this email address </div>-->
        </div>
        <div class="form-group dc-login__form-group">
          <label class="dc-login__label" for="exampleInputEmail1">Confirm Password</label>
          <input type="email" class="form-control dc-input dc-login__input"
                 id="confirmPassword" aria-describedby="emailHelp" placeholder="">
          <!--          <div class="">Confrimation has been sent to this email address </div>-->
        </div>
      </form>

      <div class="dc-login__ctrl">
        <div class="dc-login__ctrl-inner">
          <button class="btn dc-login__button float-right">Reset</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'setNewPassword',
    data () {
      return {
        model: {
          password: '',
          confirmPassword: ''
        },
        rules: {
          password: [],
          confirmPassword: []
        },
        cardBodyStyle: {
          padding: 0
        }
      };
    },
    methods: {
      _submitResetPassword () {},
      onResetBtnClick () {

      }
    }
  };
</script>