<template>
<div class="d-flex justify-center align-center" style="height: 100%">
  <v-container>
      <v-row align="center" justify="center" >
          <v-col cols="12" sm="10">
            <v-card class="elevation-6"  >
             <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-card-text class="mt-12">
                        <h2
                          class="text-center mb-3"
                        >Login in to Your Account</h2>
                        <h5
                          class="text-center  grey--text "
                        >Log in to your account so you can continue builiding <br>and editing your onboarding flows</h5>
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8">
                           
                          <v-text-field
                            label="Email"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                           class="mt-16"
                           v-model="user.email"
                           :rules="[requiredEmail]"
                          />
                          <!-- <h5 v-if="user.email !== 'sydung@gmail.com'" style="color: red;margin: -20px 0 20px">Vui lòng nhập đúng cú pháp</h5> -->
                          <v-text-field
                            label="Password"
                            outlined
                            dense
                            color="blue"
                          autocomplete="false"
                           type="password"
                            v-model="user.password"
                            :rules="[requiredPassword]"
                          />  
                          <!-- <h5 v-if="user.password !== '1234567890'" style="color: red; margin: -20px 0 20px">Vui lòng nhập trên 8 ký tự</h5> -->
                            <v-row>
                              <v-col cols="12" sm="7">
                                <v-checkbox
                       
                        label="Remember Me"
                        class="mt-n1"
                        color="blue"
                      > </v-checkbox>
                              </v-col>
                              <v-col cols="12" sm="5">
                                <span class="caption blue--text float-right">Forgot password</span>
                              </v-col>
                            </v-row>
                          <!-- <v-btn color="blue" dark block tile><router-link to="/">Log in</router-link></v-btn> -->
                          <v-btn color="blue" ref="login" dark block tile @click="login">Login</v-btn>
                     
                         <h5
                          class="text-center  grey--text mt-4 mb-3"
                        >Or Log in using</h5>
                         <div class="d-flex  justify-space-between align-center mx-10 mb-16">
                        <v-btn depressed outlined color="grey">
                          <v-icon color="red">mdi-google</v-icon>
                        </v-btn>
                        <v-btn depressed outlined color="grey">
                          <v-icon color="blue">mdi-facebook</v-icon>
                        </v-btn>
                        <v-btn depressed outlined color="grey">
                          <v-icon color="light-blue lighten-3">mdi-twitter</v-icon>
                        </v-btn>
                         </div>
                          </v-col>
                        </v-row>  
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="6" class="blue rounded-bl-xl" >
                    <div style="  text-align: center; padding: 180px 0;">
                      <v-card-text class="white--text" >
                        <h1 class="text-center mb-5">Don't Have an Account Yet?</h1>
                        <h4
                          class="text-center"
                        >Let's get you all set up so you can start creating your your first<br>  onboarding experience</h4>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step++">SIGN UP</v-btn>
                      </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
               
              </v-window>
            </v-card>
          </v-col>
      </v-row>
  </v-container>
</div>

</template>

<script>
import axios from "axios"
import baseURL from '../service/baseUrl';
export default {
   data: () => ({
    step: 1,
    user: {},
    requiredEmail: v => v.length > 0 || 'You must input your email',
    requiredPassword: v => v.length > 0 || 'You must input your password'

  }),
  props: {
    source: String
  },
  mounted(){
    this.errorButton();
  },
  methods: {
    errorButton(){
      console.log("abc",this.$refs.login.$el);
      if(this.user.email.length < 0 ){
      //  this.$refs.login.$el.style = `cursor: not-allowed;`
       this.$refs.login.$el.style.forcus()
     }
    },
    async login(){
     const dataUser = await axios.get(`${baseURL}/user?email=${this.user.email}&&password=${this.user.password}`)  ;
     console.log(dataUser.status);
      
     if(dataUser.data.length){
       localStorage.setItem("login",JSON.stringify(dataUser.data))
       this.$router.push("/dashboard");
     }else{
       alert("sai tài khoản hoặc mật khẩu")
     }
    
    }
  }, 
  }
</script>
<style scoped>
.v-application .rounded-bl-xl {
    border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
    border-bottom-right-radius: 300px !important;
}
a{
  text-decoration: none;
  color: #fff;
  display: block;
  width: 100%;  
}
</style>