<template>
  <div class="background">
    <div class="shape"></div>
    <div class="shape"></div>
  </div>
  <form class="loginform" @submit.prevent="onFinish">
    <h3>Login Here</h3>

    <label for="username">Username</label>
    <input type="text" id="username" placeholder="Username" name="username" v-model="formState.username" required>

    <label for="password">Password</label>
    <input type="password" id="password" placeholder="Password" name="password" v-model="formState.password" required>

    <div class="button-container">
      <button><router-view class="footer" to="/register">Sign Up</router-view></button>
      <button><router-view to="/home">Forgot Password?</router-view></button>
    </div>

    <button type="submit">Log In</button>
    <div class="social">
      <div class="go"><i class="fab fa-google"></i>  Google</div>

    </div>
  </form>
</template>
<script>
import { reactive } from 'vue';
import axios from 'axios';
import router from "@/router";
import "./CSSs/index.css"
export default{

  setup(){
    const onSubmitClick = () => {
      onFinish(); // onFinish fonksiyonunu çağır
    };
    const formState = reactive({
      username: '',
      password: '',
      remember: true,
    });
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    const errors = reactive({
      usernameError: '',
      passwordError: '',
    });
    const onFinish = async() => {
      try {
        const response = await axios.post('http://127.0.0.1:5173/login',{
          username: formState.username,
          password: formState.password,
        },{
          headers:{
            'Content-Type':'application/json'
          }
        });
        console.log('Success:', response.data);
        document.cookie=`session_id=${response.data.session_id}`;
        await router.push("/")
      } catch (error) {
        if (error.response.status === 409) { // Çakışma durumu
          const errorMessage = error.response.data.message;
          if (errorMessage.includes('username')) {
            errors.usernameError = errorMessage;
          } else if (errorMessage.includes('password')) {
            errors.passwordError = errorMessage;
          }
        } else {
          console.error('Error:', error.response.data);
        }
      }
    };

    return{
      formState,
      errors,
      onFinish,
      onFinishFailed,
      onSubmitClick,
    }
  }
}


</script>
