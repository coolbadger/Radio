<template>
  <div class="layout">
    <Layout>
      <Header>
        <page-header></page-header>
      </Header>
      <Content>
        <Row class="margin-top-20">
          <Col span="10" offset="7">
            <Card shadow>
              <Row class="area-linkage-page-row1">
                <Form :model="form" ref="form" :rules="validate" :label-width="80">
                  <FormItem :label="$t('user.Name')" prop="userName">
                    <Input v-model="form.userName" :placeholder="this.$t('user.nameInput')"></Input>
                  </FormItem>
                  <FormItem :label="$t('user.Email')" prop="mail">
                    <Input v-model="form.mail" :placeholder="this.$t('user.mailInput')"></Input>
                  </FormItem>

                  <FormItem :label="$t('user.Password')" prop="passwd">
                    <Input type="password" v-model="form.passwd"></Input>
                  </FormItem>
                  <FormItem :label="$t('user.ConfirmPassword')" prop="passwdCheck">
                    <Input type="password" v-model="form.passwdCheck"></Input>
                  </FormItem>

                  <FormItem>
                    <Button type="primary" @click="handleSubmit" style="margin-left: -100px">{{ $t('submit')}}</Button>
                    <Button type="ghost" @click="handleCancel" style="margin-left: 8px">{{ $t('cancel')}}</Button>
                  </FormItem>
                </Form>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer>
        <page-footer></page-footer>
      </Footer>
    </Layout>
  </div>
</template>

<script scoped>
  import pageFooter from '@/components/base/pageFooter';
  import pageHeader from '@/components/base/pageHeader';


  export default {
    name: "Register",
    components: {
      pageFooter,
      pageHeader
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('user.passwordRequiredMsg')));
          //'Please enter your password'
        } else {
          if (this.form.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.form.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('user.confirmMsg')));
        } else if (value !== this.form.passwd) {
          callback(new Error(this.$t('user.nomatchMsg')));
        } else {
          callback();
        }
      };

      return {
        form: {
          userName: '',
          mail: '',
          passwd: '',
          passwdCheck: '',
          callSign: '',
        },
        validate: {
          userName: [
            {required: true, placeholder: this.$t('message'), message: this.$t('user.nameMsg'), trigger: 'blur'}
          ],
          mail: [
            {required: true, message: this.$t('user.mailMsg'), trigger: 'blur'}
          ],
          passwd: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          passwdCheck: [
            {required: true, validator: validatePassCheck, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$http.post('/api/register/', {
                username: this.form.userName,
                password: this.form.passwd,
                mail: this.form.mail,
              },
            ).then(response => {
              if (response.body['message'] === 'ok') {  //验证是否登录成功
                console.log('register ok')
              }
            }, response => {
              // error callback
            });
          }
        });
      },
      handleCancel() {

      }
    }
  }

</script>

<style lang="less">
  @import '../assets/common';
</style>
