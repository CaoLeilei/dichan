<template>
  <div class="dc-login is-login">
    <h2 class="dc-login__title">
      {{$t('views.login.pageTitle')}}
    </h2>
    <el-card class="dc-login__card" :body-style="cardBodyStyle">
      <div class="dc-login__card-inner">
        <el-form ref="form" class="dc-login__form" :model="model" :rules="rules">
          <el-form-item :label="$t('views.login.accountLabel')" prop="email">
            <el-input v-model="model.email" @keydown.native.stop="onPasswordKeyDown"></el-input>
          </el-form-item>
          <el-form-item :label="$t('views.login.passwordLabel')" prop="password">
            <el-input v-model="model.password" type="password" @keydown.native.stop="onPasswordKeyDown"></el-input>
          </el-form-item>

          <div class="clearfix dc-login__form-bottom">
            <div class="float-left">
              <el-checkbox v-model="isStorageLogin">{{$t('views.login.stayLoggedIn')}}</el-checkbox>
            </div>
            <div class="float-right">
              <a href="javascript:;" class="link text-link"
                 @click.prevent.stop="onForgetPasswordBtnClick">
                {{$t('views.login.forgetPasswordBtn')}}
              </a>
            </div>
          </div>
        </el-form>
      </div>
      <div class="dc-login__card-footer clearfix">
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12">
            <el-button type="primary" class="dc-login__button"
                       @click="onCreateAccountBtnClick">
              {{$t('views.login.createAccountBtn')}}
            </el-button>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-button type="primary" class="dc-login__button"
                       @click="onLoginBtnClick">
              {{$t('views.login.loginBtn')}}
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import keyCode from '../../common/keyCode';
  import loading from '../../common/mixins/loading';
  import Services from '../../services';

  export default {
    name: 'login',
    mixins: [
      loading
    ],
    components: {
    },
    data () {
      const _this = this;
      return {
        model: {
          email: '',
          password: ''
        },
        rules: {
          email: [
            { required: true, message: _this.$t('views.login.accountEmpty'), trigger: 'blur'},
            { type: 'email', message: _this.$t('views.login.accountError'), trigger: 'blur'}
          ],
          password: [
            { required: true, message: _this.$t('views.login.passwordEmpty'), trigger: 'blur'},
          ]
        },
        cardBodyStyle: {
          padding: 0
        },
        isStorageLogin: false
      }
    },
    created () {
      this.showLoading();
      this._checkUserIsLogin().then(() => {
        return this._afterLogin();
      }).finally(() => {
        this.closeLoading();
      });
    },
    computed: {
      ...mapGetters([
        'userName'
      ])
    },
    methods: {
      ...mapActions([
        'updateUserName',
        'updateUserIsLogin',
        'updateUserProjectCount'
      ]),
      _checkUserIsLogin () {
        return new Promise((resolve, reject) => {
          Services.getUserInfo().then(response => {
            if (response && response.name) {
              this.isLogin = true;
              this.updateUserName(response.name);
            }
            this.updateUserIsLogin(true);
            resolve();
          }, err => {
            this.updateUserName('');
            this.updateUserIsLogin(false);
            reject(err);
          });
        });
      },
      _submitLogin () {
        return new Promise((resolve, reject) => {
          let requestData = {
            email: this.model.email,
            password: this.model.password
          };
          Services.login(requestData).then(response => {
            if (response) {
              this.updateUserName(response.name);
            }
            this.updateUserIsLogin(true);
            resolve();
          }, err => {
            this.updateUserIsLogin(false);
            reject(err);
          });
        });
      },
      _afterLogin () {
        return new Promise((resolve, reject) => {
          this._loadProductList().then(productList => {
            this.updateUserProjectCount(productList.length);
            if (productList.length) {
              this.$router.push({path: '/account'});
            } else {
              this.$router.push({path: '/browse'});
            }
            resolve();
          }, reject);
        });
      },
      _doLogin () {
        const $form = this.$refs['form'];
        if ($form) {
          $form.validate().then(() => {
            this.showLoading()
            return this._submitLogin();
          }).then(() => {
            return  this._afterLogin();
          }).finally(() => {
            this.closeLoading();
          });
        }
      },
      _loadProductList () {
        return new Promise((resolve, reject) => {
          Services.getProductList().then(response => {
            let productList = [];
            if (response && Array.isArray(response.items)) {
              productList = response.items;
            }
            resolve(productList);
          }, reject);
        });
      },
      onForgetPasswordBtnClick () {
        this.$router.push({path: '/forgotten-password'});
      },
      onPasswordKeyDown (event) {
        if (event.keyCode === keyCode.DOM_VK_RETURN) {
          this._doLogin();
        }
      },
      onCreateAccountBtnClick () {
        this.$router.push({
          path: '/create-account'
        });
      },
      onLoginBtnClick () {
        this._doLogin();
      }
    }
  };
</script>
