<template>
  <div>
    <div class="login" @keydown.enter="handleSubmit">
      <div class="login-con">
        <Card :bordered="false">
          <p slot="title">
            <Icon type="log-in"></Icon>
            欢迎登录
          </p>
          <div class="form-con">
            <Form ref="loginForm" :model="form" :rules="rules">
              <FormItem prop="userName">
                <Input type="text" v-model="form.userName" placeholder="请输入用户名">
                <span slot="prepend">
                    <Icon :size="16" type="person"></Icon>
                </span>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="locked"></Icon>
                </span>
                </Input>
              </FormItem>
              <FormItem>
                <Button @click="handleSubmit" type="primary" long>登录</Button>
              </FormItem>
            </Form>
            <p class="login-tip">未注册用户<a href="/register">注册</a></p>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>

  import Cookies from 'js-cookie';

  export default {
    name: "Login",
    data() {
      return {
        form: {
          userName: 'Ham',
          password: '123'
        },
        rules: {
          userName: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleSubmit() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$http.post('/api/login/', {
                username: this.form.userName,
                password: this.form.password
              },
            ).then(response => {
              if (response.body['message'] === 'ok') {  //验证是否登录成功
                Cookies.set('user', this.form.userName);
                this.$router.push({
                  name: 'home'
                });
              }
            }, response => {
              // error callback
            });
          }
        });
      }
    }
  }
</script>

<style lang="less">
  @import './login.less';
</style>
