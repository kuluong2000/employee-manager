<template>
  <div class="d-flex justify-center align-center bg-section">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10">
          <v-card class="elevation-6">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card-text class="mt-12">
                      <h2
                        class="text-center text-uppercase mb-3"
                        style="color:rgb(16, 37, 158)"
                      >
                        Login in to Your Account
                      </h2>
                      <h5 class="text-center grey--text">
                        Log in to your account so you can continue builiding.
                        <br />and editing your onboarding flows
                      </h5>
                      <v-row
                        align="center"
                        justify="center"
                        v-on:keyup.enter="login"
                      >
                        <v-col cols="12" sm="8">
                          <v-text-field
                            label="Email"
                            outlined
                            dense
                            color="rgb(16, 37, 158)"
                            autocomplete="false"
                            class="mt-12 mb-1"
                            v-model="user.email"
                            :rules="[requiredEmail]"
                          />
                          <!-- <h5 v-if="user.email !== 'sydung@gmail.com'" style="color: red;margin: -20px 0 20px">Vui lòng nhập đúng cú pháp</h5> -->

                          <div class="input-container">
                            <v-text-field
                              label="Password"
                              outlined
                              dense
                              color="rgb(16, 37, 158)"
                              autocomplete="false"
                              :type="choose"
                              v-model="user.password"
                              :rules="[requiredPassword]"
                            />
                            <v-icon
                              class="material-icons visibility"
                              @click="showPassword"
                              >{{ visibility }}</v-icon
                            >
                          </div>
                          <!-- <h5 v-if="user.password !== '1234567890'" style="color: red; margin: -20px 0 20px">Vui lòng nhập trên 8 ký tự</h5> -->
                          <v-row>
                            <v-col cols="12" sm="7">
                              <v-checkbox
                                label="Remember Me"
                                class="mt-n1"
                                color="blue"
                                @click="setCookie"
                                v-model="checkBox"
                              >
                              </v-checkbox>
                            </v-col>
                            <v-col cols="12" sm="5" class="px-0">
                              <!-- <span class="caption blue--text float-right"
                                >Forgot password</span
                              > -->
                              <template>
                                <v-row
                                  justify="center"
                                  style="text-align: end;max-width: 100%;"
                                  class=""
                                >
                                  <a
                                    color="primary"
                                    dark
                                    @click.stop="dialog = true"
                                    class="fg-pass"
                                  >
                                    Forgot password
                                  </a>

                                  <v-dialog v-model="dialog" max-width="510">
                                    <v-card class="px-2">
                                      <v-card-title class="text-h4 pt-8">
                                        Quên mật khẩu
                                      </v-card-title>

                                      <v-card-text class="pt-3 pb-6 text-justify">
                                        Vui lòng nhập đúng email của bạn. Khi bạn
                                        chấp nhận cập nhật lại mật khẩu thì mật khẩu
                                        của cũ của bạn sẽ mất vĩnh viễn và thay vào
                                        đó là mật khẩu mới được cập nhật sau khi bạn
                                        xác thực thành công ^_^ Nhớ đừng để quên mật
                                        khẩu nữa nhé :v
                                      </v-card-text>

                                      <v-text-field
                                        label="Email của bạn"
                                        outlined
                                        dense
                                        class="px-6"
                                        v-model="userEmail"
                                      ></v-text-field>

                                      <div class="input-container">
                                        <v-text-field
                                          label="Mật khẩu mới"
                                          outlined
                                          dense
                                          class="px-6"
                                          v-model="userPassword"
                                        ></v-text-field>
                                        <v-icon
                                          class="showPass-icons visibility"
                                          @click="showPassword"
                                          >{{ visibility }}</v-icon
                                        >
                                      </div>
                                      <v-row class="mx-0">
                                        <v-col cols="12" sm="7" class="ps-0">
                                          <v-text-field
                                            label="Mã xác nhận"
                                            outlined
                                            dense
                                            class="ps-6 pe-3"
                                            v-model="otpInput"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="5" class="pe-5">
                                          <v-card
                                            class="mx-auto px-0 py-1 otp-code"
                                            max-width="165"
                                            style="background: url('https://codingnepalweb.com/demos/custom-captcha-in-javascript/captcha-bg.png')"
                                          >
                                            <v-card-text class="px-3 py-1">
                                              <h2
                                                class="text-center gray--text"
                                                style="letter-spacing: 7px; font-style: italic;"
                                              >
                                                {{ otpCode }}
                                              </h2>
                                            </v-card-text>
                                          </v-card>
                                        </v-col>
                                      </v-row>
                                      <v-card-actions class="pt-5 pb-6">
                                        <v-spacer></v-spacer>

                                        <v-btn
                                          color="red darken-1 px-4"
                                          dark
                                          @click="dialog = false"
                                        >
                                          Thoát
                                        </v-btn>

                                        <v-btn
                                          class="px-5"
                                          color="rgb(16,37,158)"
                                          dark
                                          @click="updatePassword"
                                        >
                                          Cập nhật mật khẩu
                                        </v-btn>
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>
                                </v-row>
                              </template>
                            </v-col>
                          </v-row>
                          <v-btn
                            color="rgb(16,37,158)"
                            dark
                            block
                            tile
                            @click="login"
                            >Sign in</v-btn
                          >

                          <h5 class="text-center grey--text mt-4 mb-3">
                            Or Log in using
                          </h5>
                          <div
                            class="
                              d-flex
                              justify-space-between
                              align-center
                              mx-10
                              mb-16
                            "
                          >
                            <v-btn depressed outlined color="grey">
                              <v-icon color="red">mdi-google</v-icon>
                            </v-btn>
                            <v-btn depressed outlined color="grey">
                              <v-icon color="blue">mdi-facebook</v-icon>
                            </v-btn>
                            <v-btn depressed outlined color="grey">
                              <v-icon color="light-blue lighten-3"
                                >mdi-twitter</v-icon
                              >
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" md="6" class="blue rounded-bl-xl bg-login">
                    <div style="text-align: center; padding: 180px 0">
                      <v-card-text class="white--text">
                        <h1 class="text-center mb-5">
                          Don't Have an Account Yet?
                        </h1>
                        <h4 class="text-center">
                          Let's get you all set up so you can start creating
                          your your first<br />
                          onboarding experience.
                        </h4>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step++"
                          >SIGN UP</v-btn
                        >
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2">
                <v-row>
                  <v-col cols="12" md="6" class="blue rounded-br-xl bg-login">
                    <div style="text-align: center; padding: 180px 0">
                      <v-card-text class="white--text">
                        <h1 class="text-center mb-5">Alredy Signed up?</h1>
                        <h4 class="text-center">
                          Log in to your account so you can continue building
                          and<br />
                          editing your onboarding flows
                        </h4>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step--">Log in</v-btn>
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-card-text class="mt-12">
                      <h2
                        class="text-center text-uppercase mb-3"
                        style="color:rgb(16, 37, 158)"
                      >
                        Sign Up for an Account
                      </h2>
                      <h5 class="text-center grey--text mb-3">
                        Let's get you all set up so you can start creatin your
                        <br />
                        first onboarding experiance
                      </h5>
                      <v-row
                        align="center"
                        justify="center"
                        v-on:keyup.enter="signup"
                      >
                        <v-col cols="12" sm="8">
                          <v-row>
                            <v-col cols="12" sm="6">
                              <v-text-field
                                label="First Name"
                                outlined
                                dense
                                color="rgb(16, 37, 158)"
                                autocomplete="false"
                                class="mt-4"
                                v-model="userSignUp.firstName"
                              />
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-text-field
                                label="Last Name"
                                outlined
                                dense
                                color="rgb(16, 37, 158)"
                                autocomplete="false"
                                class="mt-4"
                                v-model="userSignUp.lastName"
                              />
                            </v-col>
                          </v-row>
                          <v-text-field
                            label="Email"
                            outlined
                            dense
                            color="rgb(16, 37, 158)"
                            autocomplete="false"
                            v-model="userSignUp.email"
                          />
                          <v-text-field
                            label="Password"
                            outlined
                            dense
                            color="rgb(16, 37, 158)"
                            autocomplete="false"
                            type="password"
                            v-model="userSignUp.password"
                          />
                          <v-text-field
                            label="Confirm Password"
                            outlined
                            dense
                            color="rgb(16, 37, 158)"
                            autocomplete="false"
                            type="password"
                            v-model="userSignUp.passwordConfirm"
                          />
                          <v-row>
                            <v-col cols="12" sm="7">
                              <v-checkbox
                                label="I Accept AAE"
                                class="mt-n1"
                                color="rgb(16, 37, 158)"
                              >
                              </v-checkbox>
                            </v-col>
                            <v-col cols="12" sm="5">
                              <span
                                class="caption ml-n4 float-right"
                                style="color:rgb(16, 37, 158);"
                                >Terms and Conditions</span
                              >
                            </v-col>
                          </v-row>
                          <!-- <v-btn color="blue" dark block tile @click="signup">Sign up</v-btn> -->
                          <v-btn color="rgb(16, 37, 158)" dark block tile
                            >Sign up</v-btn
                          >

                          <h5 class="text-center grey--text mt-4 mb-3">
                            Or Sign up using
                          </h5>
                          <div
                            class="
                              d-flex
                              justify-space-between
                              align-center
                              mx-10
                              mb-11
                            "
                          >
                            <v-btn depressed outlined color="grey">
                              <v-icon color="red">mdi-google</v-icon>
                            </v-btn>
                            <v-btn depressed outlined color="grey">
                              <v-icon color="blue">mdi-facebook</v-icon>
                            </v-btn>
                            <v-btn depressed outlined color="grey">
                              <v-icon color="light-blue lighten-3"
                                >mdi-twitter</v-icon
                              >
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <popup
      :show="showDialog"
      :cancel="cancel"
      :confirm="confirm"
      title="Thông báo?"
      text="Ok! Mình sẽ kiểm tra lại"
      description="Email hoặc mật khẩu không đúng!!!"
    ></popup>
    <popup
      :show="showDialogSignUp"
      :cancel="cancel"
      :confirm="confirm"
      title="Thông báo?"
      text="Ok! Mình sẽ kiểm tra lại"
      description="Vui lòng điền đầy đủ thông tin !!!"
    ></popup>
    <popup
      :show="showDialogPassword"
      :cancel="cancel"
      :confirm="confirm"
      title="Thông báo?"
      text="Ok! Mình sẽ kiểm tra lại"
      description="Kiểm tra lại mật khẩu vừa nhập !!!"
    ></popup>
    <popup
      :show="showDialogSuccess"
      :cancel="cancel"
      :confirm="confirm"
      title="Thông báo?"
      text="OKE ^^"
      description="Đăng ký thành công !!!"
    ></popup>
  </div>
</template>

<script>
// import axios from "axios";
import Popup from "../components/Popup.vue";
import { mapState } from "vuex";

export default {
  components: { Popup },
  data() {
    return {
      step: 1,
      requiredEmail: (value) => value.length > 0 || "You must input your email",
      requiredPassword: (value) =>
        value.length > 0 || "You must input your password",
      user: {
        email: "",
        password: "",
      },
      userSignUp: {},
      showDialog: false,
      showDialogSignUp: false,
      showDialogPassword: false,
      showDialogSuccess: false,
      month: "",
      minutes: "",
      dialog: false,
      userEmail: "",
      userPassword: "",
      otpCode: "",
      otpInput: "",
      checkBox: false,
    };
  },
  computed: {
    ...mapState({
      choose: (state) => state.choose,
      visibility: (state) => state.visibility,
    }),
  },
  methods: {
    showOTPCode() {
      let string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let OTP = "";

      // Find the length of string
      var len = string.length;
      for (let i = 0; i < 7; i++) {
        OTP += string[Math.floor(Math.random() * len)];
      }
      return OTP;
    },
    updatePassword() {
      const userData = JSON.parse(localStorage.getItem("user"));
      const dataEmail = userData.find((el) => el.email === this.userEmail);
      console.log(dataEmail);
      if (this.userEmail === "") {
        alert("Vui lòng nhập thông tin email");
      } else {
        if (dataEmail) {
          if (this.otpInput === this.otpCode) {
            let index = userData.findIndex((el) => el.email === this.userEmail);
            userData.splice(index, 1, {
              id: dataEmail.id,
              email: dataEmail.email,
              password: this.userPassword,
              role: dataEmail.role,
              timeLogin: dataEmail.timeLogin,
            });
            localStorage.setItem("user", JSON.stringify(userData));
            alert("Cập nhật thành công");
            this.dialog = false;
          } else {
            alert("Mã xác thực không chính xác!!!");
            this.otpCode = this.showOTPCode();
          }
        } else {
          alert("Không tồn tại email này!! Vui lòng thử lại");
        }
      }
    },
    async login() {
      // using localStorage
      const datalocal = JSON.parse(localStorage.getItem("user"));
      const resEmail = datalocal.find((el) => el.email === this.user.email);
      const resPass = this.user.password;
      if (resEmail && resPass === resEmail.password) {
        setTimeout(() => this.$store.dispatch("actionSetDialog", true), 200);
        localStorage.setItem("user-info", JSON.stringify(resEmail));
        this.$router.push("/");
        let today = new Date();
        const resDataInf = JSON.parse(localStorage.getItem("user-info"));
        const resDataUser = JSON.parse(localStorage.getItem("user"));
        const resDataEm = JSON.parse(localStorage.getItem("employee"));
        const index = resDataUser.findIndex((el) => el.email === resDataInf.email);
        const detailsEm = resDataEm.find((el) => el.email === resDataInf.email);
        resDataUser.splice(index, 1, {
          id: resDataInf.id,
          email: resDataInf.email,
          password: resDataInf.password,
          role: resDataInf.role,
          timeLogin: today.toLocaleString(),
        });
        localStorage.setItem("user", JSON.stringify(resDataUser));
        resDataEm.splice(index, 1, {
          id: detailsEm.id,
          emp_ID: detailsEm.emp_ID,
          firstName: detailsEm.firstName,
          lastName: detailsEm.lastName,
          email: detailsEm.email,
          password: resDataInf.password,
          imgUrl: detailsEm.imgUrl,
          role: detailsEm.role,
          depart_id: detailsEm.depart_id,
          depart_name: detailsEm.depart_name,
          position_id: detailsEm.position_id,
          address: detailsEm.address,
          phoneNumber: detailsEm.phoneNumber,
          birthday: detailsEm.birthday,
          gender: detailsEm.gender,
          numberCard: detailsEm.numberCard,
          nationality: detailsEm.nationality,
          ethnic: detailsEm.ethnic,
          religion: detailsEm.religion,
          educationalLevel: detailsEm.educationalLevel,
          academicLevel: detailsEm.academicLevel,
        });
        localStorage.setItem("employee", JSON.stringify(resDataEm));
      } else {
        this.showDialog = true;
      }
    },
    // async signup() {
    //   if (this.userSignUp.firstName == "" || this.userSignUp.lastName == "" || this.userSignUp.email == "" || this.userSignUp.password == "" || this.userSignUp.passwordConfirm == "") {
    //     this.showDialogSignUp = true;
    //   } else {
    //     if (this.userSignUp.password === this.userSignUp.passwordConfirm) {
    //       let res = await axios.post(`${process.env.VUE_APP_SERVER_URL}/user`, {
    //         email: this.userSignUp.email,
    //         password: this.userSignUp.password,
    //         role: this.userSignUp.role,
    //       });
    //       let res2 = await axios.post(`${process.env.VUE_APP_SERVER_URL}/employee`, {
    //         firstName: this.userSignUp.firstName,
    //         lastName: this.userSignUp.lastName,
    //         email: this.userSignUp.email,
    //         password: this.userSignUp.password,
    //         role: this.userSignUp.role,
    //         position_id: this.userSignUp.position_id,
    //         depart_id: this.userSignUp.depart_id,
    //         depart_name: this.userSignUp.depart_name,
    //         address: this.userSignUp.address,
    //         imgUrl: this.userSignUp.imgUrl,
    //       });
    //       console.log(res);
    //       console.log(res2);
    //       this.showDialogSuccess = true;
    //       this.step = 1;
    //     } else {
    //       this.showDialogPassword = true;
    //     }
    //   }
    // },
    cancel() {
      console.log("cancel");
      this.showDialog = false;
      this.showDialogSignUp = false;
      this.showDialogPassword = false;
      this.showDialogSuccess = false;
    },
    confirm() {
      console.log("confirm");
      this.showDialog = false;
      this.showDialogSignUp = false;
      this.showDialogPassword = false;
      this.showDialogSuccess = false;
    },

    showPassword() {
      this.$store.dispatch("actionSetShowPassword");
    },

    setCookie() {
      if (this.checkBox === true) {
        document.cookie =
          "myusername=" + this.user.email + ";path=http://localhost/web6pm/";
        document.cookie =
          "mypassword=" + this.user.password + ";path=http://localhost/web6pm/";
      } else {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i];
          let eqPos = cookie.indexOf("=");
          let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
      }
    },

    getCookieData() {
      let user = this.getCookie("myusername");
      let pswd = this.getCookie("mypassword");

      this.user.email = user;
      this.user.password = pswd;
    },
    getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
  },
  mounted() {
    this.getCookieData();
    this.otpCode = this.showOTPCode();
  },
  props: {
    source: String,
  },
};
</script>
<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
a {
  text-decoration: none;
  color: #fff;
  display: block;
  width: 100%;
}
.input-container {
  position: relative;
}
.material-icons,
.showPass-icons {
  margin: 0 10px;
  color: #aaa;
  cursor: default;
  position: absolute;
  content: "";
  top: 8px;
  right: 0px;
}
.material-icons {
  right: 0;
}
.showPass-icons {
  right: 22px;
}
.bg-login {
  background: url("https://img4.thuthuatphanmem.vn/uploads/2020/07/05/anh-background-cong-nghe-xanh_035953035.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.fg-pass {
  color: rgb(16, 37, 158);
  text-decoration: underline;
  margin-top: 11px;
}
.bg-section {
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-blue-atmosphere-technology-exhibition-board-background-template-image_193475.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.elevation-6 {
  box-shadow: 0px 2px 10px 1px rgb(216 213 213) !important;
}
</style>
