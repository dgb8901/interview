<template>
  <div class="login-form">
    <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      :label-col="{ span: 6 }"
      autocomplete="off"
    >
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" placeholder="输入用户名" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input
          type="password"
          v-model:value="formState.password"
          placeholder="输入密码"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit" @click="submit"
          >Submit</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { Button, Input, Form, FormItem } from 'ant-design-vue';
import axios from 'axios'
import { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'


export default defineComponent({
  components: {
    AButton: Button,
    AInput: Input,
    AForm: Form,
    AFormItem: FormItem
  },
  setup() {
    const formRef = ref();
    const formState = reactive({
      username: '',
      password: '',
    });
    const submit = () => {
      formRef.value
        .validate()
        .then(() => {
          axios.post('/api/user/login', formState).then((response) => {
            const res = response.data
            if (res.code === 200) {
              message.success(res.message)
            } else {
              message.warning(res.message)
            }

          }).catch((err) => {
            console.log(err)
          })
        })
        .catch((error) => {
          console.log("error", error);
        });

    };
    return {
      formRef,
      formState,
      submit
    };
  },
});
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-form {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}
</style>
