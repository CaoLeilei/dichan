<template>
  <div class="dc-login is-create-account">
    <h2 class="dc-login__title">
      {{$t('views.createAccount.pageTitle')}}
    </h2>
    <el-card class="dc-login__card" :body-style="cardBodyStyle">
      <div class="dc-login__card-header">
        <p class="">{{$t('views.createAccount.cardText')}}</p>
        <h3>{{$t('views.createAccount.cardTitle')}}</h3>
      </div>
      <div class="dc-login__card-inner">
        <el-form ref="form" class="dc-login__form"
                 :hide-required-asterisk="true"
                 :model="model" :rules="rules">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="firstName" :label="$t('views.createAccount.firstNameLabel')">
                <el-input v-model="model.firstName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="lastName" :label="$t('views.createAccount.lastNameLabel')">
                <el-input v-model="model.lastName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="emailAddress" :label="$t('views.createAccount.emailAddressLabel')">
                <el-input v-model="model.emailAddress"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="phoneNumber" :label="$t('views.createAccount.phoneNumberLabel')">
                <el-input v-model="model.phoneNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="password" :label="$t('views.createAccount.passwordLabel')">
                <el-input type="password" v-model="model.password"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="confirmPassword" :label="$t('views.createAccount.confirmPasswordLabel')">
                <el-input type="password" v-model="model.confirmPassword"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="is-last">
                <el-checkbox v-model="model.agree">{{$t('views.createAccount.agreeText')}}</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="dc-login__card-footer clearfix">
        <el-button type="primary" class="float-right dc-login__button"
                   :disabled="!model.agree"
                   @click="onContinueBtnClick">
          {{$t('views.createAccount.continueBtn')}}
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { mapActions } from  'vuex';
  import Services from '../../services';
  const CREATE_ACCOUNT_TYPE = {
    GENERAL: 0,
    INVITED: 1
  };
  export default {
    name: 'register',
    data () {
      const _this = this;
      return {
        CREATE_ACCOUNT_TYPE,
        cardBodyStyle: {
          padding: 0
        },
        inviteCode: '',
        source: CREATE_ACCOUNT_TYPE.GENERAL,
        model: {
          firstName: '',
          lastName: '',
          emailAddress: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
          agree: false
        },
        rules: {
          firstName: [
            { required: true, message: _this.$t('views.createAccount.firstNameEmpty'), trigger: 'blur' }
          ],
          lastName: [
            { required: true, message: _this.$t('views.createAccount.lastNameEmpty'), trigger: 'blur' }
          ],
          emailAddress: [
            { required: true, message: _this.$t('views.createAccount.emailAddressEmpty'), trigger: 'blur' }
          ],
          phoneNumber: [
            { required: true, message: _this.$t('views.createAccount.phoneNumberEmpty'), trigger: 'blur' }
          ],
          password: [
            { required: true, message: _this.$t('views.createAccount.passwordEmpty'), trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: _this.$t('views.createAccount.confirmPasswordError'), trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      let routeName = this.$route.name;
      let params = this.$route.params;
      if (routeName && params && params.inviteCode) {
        this.inviteCode = params.inviteCode;
        this.source = CREATE_ACCOUNT_TYPE.INVITED;
      }
    },
    methods: {
      ...mapActions([
        'updateUserName'
      ]),
      _submitCreateAccount () {
        let _data = {
          email: this.model.emailAddress,
          password: this.model.password,
          first_name: this.model.firstName,
          last_name: this.model.lastName,
          phone: this.model.phoneNumber,
          invite_code: this.inviteCode,
          source: this.source
        };
        Services.createAccount(_data).then(response => {
          if (response) {
            this.updateUserName(response.name);
          }
        });
      },
      onContinueBtnClick () {
        const $form = this.$refs['form'];
        if ($form) {
          $form.validate().then(() => {
            this._submitCreateAccount();
          });
        }
      }
    }
  };
</script>
