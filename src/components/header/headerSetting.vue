<template>
  <el-dropdown class="dc-header__settings dc-header__dropwdown"
               trigger="click" @command="onDropdownCommand">
    <el-button type="text" class="dropdown-button">
      {{$t('components.header.menus.settings')}}
      <i class="el-icon-caret-bottom el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown" class="dc-header__settings-menu">
      <div class="setting-item">
        <div class="setting-item-inner">
          <el-button type="primary" size="small" class="setting-button" @click="onSettingResetPasswordBtnClick">
            {{$t('components.header.menus.resetYourPassword')}}
          </el-button>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-item-inner">
          <el-button type="primary" size="small" class="setting-button" @click="onSettingLogoutBtnClick">
            {{$t('components.header.menus.logout')}}
          </el-button>
        </div>
      </div>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import { mapActions } from 'vuex';
  import Services from '../../services';

  const SETTING_COMMAND = {
    RESET_PASSWORD: 1,
    LOGOUT: 2
  };
  export default {
    name: 'headerSetting',
    data() {
      return {
        SETTING_COMMAND
      };
    },
    methods: {
      ...mapActions([
        'updateUserName'
      ]),
      _goToResetPassword () {
        this.$router.push({path: 'forgotten-password'})
      },
      _submitLogout () {
        let _data = {};
        Services.logout(_data).then(() => {
          this.updateUserName('');
          this.$router.replace({path: '/login'});
        })
      },
      onDropdownCommand (command) {
        switch (command) {
          case SETTING_COMMAND.RESET_PASSWORD:
            this._goToResetPassword();
            break;
          case SETTING_COMMAND.LOGOUT:
            this._submitLogout();
            break;
        }
      },
      onSettingResetPasswordBtnClick () {
        this._goToResetPassword();
      },
      onSettingLogoutBtnClick () {
        this._submitLogout();
      }
    }
  };
</script>