<template>
    <div class="login-box">
        <!-- <img class="logo" src="../img/logo.jpg"/> -->
        <div class="logo"></div>
        <div class="login-form-box">
            <div class="login-form-line">
                <label for="">账号</label>
                <input type="text" v-model="phone">
            </div>
            <div class="login-form-line">
                <label for="">密码</label>
                <input type="password" v-model="password">
            </div>
        </div>
        <button class="login-btn" @click="login">登录</button>
    </div>
</template>
<script>
import { login, cleanPromiseCache } from '../api/index';
import { isLogin } from '../javascript/util';

export default {
  data() {
    return {
      phone: '',
      password: '',
    };
  },
  methods: {
    login() {
      if (!!this.phone && !!this.password) {
        login({
          phone: this.phone,
          password: this.password,
        }).then((data) => {
          if (data && +data.code === 200) {
            this.$router.push('/');
            cleanPromiseCache();
          } else {
            this.$pop.prompt((data && data.data && data.data.msg) || '登录失败');
          }
        }).catch(() => {});
      } else {
        this.$pop.prompt('手机号码或者密码不能为空');
      }
    },
  },
  mounted() {
    if (isLogin()) {
      setTimeout(() => {
        window.location.href = '/';
      }, 1e3);
    }
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$main_color: #ed1c00;
$bg_color: #e6e6e6;

.login-box {
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    width: 100%;
    padding-top: 50px;
    background-color: $bg_color;
}

.logo {
    display: block;
    // width: 90px;
    margin: 0 auto 20px;
    width: 160px;
    height: 69px;
    background-position: 0 0;
    background: url(../img/topbar.png) no-repeat;
}

.login-form-box {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 0 auto 10px;
}

.login-form-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    label {
        height: 30px;
        line-height: 30px;
    }
    input {
        display: block;
        width: 80%;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-indent: 5px;
        outline: none;
        font-size: 16px;
    }
}

.login-btn {
    display: block;
    width: 180px;
    height: 40px;
    margin: 0 auto;
    background-color: $main_color;
    border: none;
    border-radius: 20px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    outline: none;
    &:active {
        background-color: #bd0117;
    }
}
</style>
