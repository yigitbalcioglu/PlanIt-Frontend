<template>
  <div class="background">
    <div class="shape"></div>
    <div class="shape"></div>
  </div>
  <form class="registerform" @submit.prevent="onFinish">

    <h3>Register Here</h3>

    <label for="username">Username</label>
    <input type="text" id="username" placeholder="Username" name="username" v-model="formState.username" required>

    <label for="email">Email</label>
    <input type="email" id="email" placeholder="Email" name="email" v-model="formState.email" required>

    <label for="password">Password</label>
    <input type="password" id="password" placeholder="Password" name="password" v-model="formState.password" required>

    <label for="username">Confirm Password</label>
    <input type="password" id="confirmpassword" placeholder="Confirm Password" name="confirmpassword" v-model="formState.confirmpassword" required>

    <button type="submit">Register</button>
    <div class="social">
      <div class="go"><i class="fab fa-google"></i>  Google</div>

    </div>
  </form>

</template>

<script>

import { reactive } from 'vue';
import axios from 'axios';
import router from "@/router";
export default {
  setup(){
    const onSubmitClick = () => {
      onFinish(); // onFinish fonksiyonunu çağır
    };
    const formState = reactive({
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
      remember: true,
    });

    const errors = reactive({
      usernameError: '',
      emailError: '',
    });
    const onFinish = async() => {
      if (formState.confirmpassword!==formState.password){
        // Kullanıcı girişi sıfırla
        errors.usernameError = '';
        errors.emailError = '';

        console.error("Şifreler uyumsuz");
      }
      //iki şifre uyuşuyor
      else {
          try {
            const response = await axios.post('http://127.0.0.1:5173/register',{
              username: formState.username,
              email: formState.email,
              password: formState.password,
            },{
              headers:{
                'Content-Type':'application/json'
              }
            })
            console.log('Success:', response.data);
            await router.push("/")
          } catch (error) {
            if (error.response.status === 409) { // Çakışma durumu
              const errorMessage = error.response.data.message;
              if (errorMessage.includes('username')) {
                errors.usernameError = errorMessage;
              } else if (errorMessage.includes('email')) {
                errors.emailError = errorMessage;
              }
            } else {
              console.error('Error:', error.response.data);
            }
          }
        }

    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    const onFormSubmit = async (event) => {
      event.preventDefault(); // Prevent the default form submission
      await onFinish(); // Call the onFinish method
    };
    return{
      formState,
      errors,
      onFinish,
      onFinishFailed,
      onSubmitClick,
      onFormSubmit
    }
  }

}



</script>
