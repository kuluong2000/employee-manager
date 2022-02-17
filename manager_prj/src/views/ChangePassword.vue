<template>
  <transition name="fade" mode="out-in">
    <div>
      <div v-show="showPopupChange" class="overlayDialog">
        <div class="form-change__pasword">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <div class="form-info">
                  <h3 class="form-info__title" style="padding-right: 82px;">
                    Đổi Mật Khẩu
                  </h3>
                  <div class="form-info__content">
                    <p class="form-info__sub" style="padding-left: 10px;">
                      Để mật khẩu được bảo mật tốt nhất
                    </p>
                    <div class="form-info__list">
                      <div
                        class="form-info__item form-info__length"
                        ref="checklegnth"
                        :class="[checkLength]"
                      >
                        <v-icon dark right :color="colorIconLength" class="me-2">
                          mdi-shield-lock </v-icon
                        >Ít nhất 8 kí tự
                      </div>
                      <div
                        class="form-info__item form-info__upper"
                        ref="checkUpper"
                        :class="[checkUpper]"
                      >
                        <v-icon dark right :color="colorIconUpper" class="me-2">
                          mdi-shield-lock
                        </v-icon>
                        Có chứa ít nhất 1 kí tự in hoa
                      </div>
                      <div
                        class="form-info__item form-info__number"
                        ref="checkNumber"
                        :class="[checkNumber]"
                      >
                        <v-icon dark right :color="colorIconNumber" class="me-2">
                          mdi-shield-lock
                        </v-icon>
                        Có chứa ít nhất 1 số
                      </div>
                      <div
                        class="form-info__item form-info__specical"
                        ref="checkSpecial"
                        :class="[checkSpecial]"
                      >
                        <v-icon dark right :color="colorIconSpecial" class="me-2">
                          mdi-shield-lock
                        </v-icon>
                        Có chưa ít nhất 1 kí tự đặc biệt
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <form class="form-input" @submit.prevent="save">
                  <input
                    :type="choose"
                    placeholder="Mật khẩu cũ"
                    class="form-input__item"
                    v-model="oldPassword"
                  />
                  <div class="form-input__list">
                    <input
                      :type="choose"
                      @input="input"
                      ref="itemInput"
                      placeholder="Nhập mật khẩu mới"
                      class="form-input__item"
                      v-model="newPassword"
                    />
                  </div>
                  <input
                    :type="choose"
                    placeholder="Xác nhận mật khẩu mới"
                    class="form-input__item"
                    v-model="confirmPassword"
                  />
                  <v-checkbox
                    label="Hiện mật khẩu"
                    class="mt-3"
                    color="rgb(16, 37, 158)"
                    v-model="checkBox"
                    @click="showPassword"
                  ></v-checkbox>
                  <div class="form-action">
                    <button type="submit" class="form-action__save" ref="formAction">
                      Đổi mật khẩu
                    </button>
                    <button class="form-action__remove" @click="cancel">
                      Thoát
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <popup
        :show="showDialogRequired"
        :cancel="close"
        :confirm="confirm"
        title="Thông báo?"
        text="Oke ^^"
        description="Vui lòng điền đầy đủ thông tin!!!"
      ></popup>
      <popup
        :show="showDialogSuccess"
        :cancel="close"
        :confirm="success"
        title="Thông báo?"
        text="Oke ^^"
        description="Đổi mật khẩu thành công!!! Hãy thử đăng nhập lại"
      ></popup>
      <popup
        :show="showDialogOldFail"
        :cancel="close"
        :confirm="confirm"
        title="Thông báo?"
        text="Oke ^^"
        description="Mật khẩu cũ không đúng!!! Hãy kiểm tra lại"
      ></popup>
      <popup
        :show="showDialogConfirmFail"
        :cancel="close"
        :confirm="confirm"
        title="Thông báo?"
        text="Oke ^^"
        description="Mật khẩu xác nhận không đúng!!! Vui lòng thử lại"
      ></popup>
    </div>
  </transition>
</template>
<script>
import Popup from "../components/Popup.vue";
export default {
  components: { Popup },
  name: "ChangePassword",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      checkLength: "",
      checkNumber: "",
      checkUpper: "",
      checkSpecial: "",
      choose: "password",
      icon: "mdi-eye-off",
      showIcon: false,
      checkBox: false,
      showPopupChange: true,
      colorIconLength: "#aaa",
      colorIconUpper: "#aaa",
      colorIconNumber: "#aaa",
      colorIconSpecial: "#aaa",
      showDialogRequired: false,
      showDialogOldFail: false,
      showDialogConfirmFail: false,
      showDialogSuccess: false,
    };
  },
  methods: {
    close() {
      this.showDialogRequired = false;
    },
    confirm() {
      this.showDialogRequired = false;
      this.showDialogOldFail = false;
      this.showDialogConfirmFail = false;
      this.showPopupChange = true;
    },
    success() {
      this.showDialogSuccess = false;
      this.cancel();
    },
    cancel() {
      this.$router.push("/");
    },
    save() {
      const oldPass = this.oldPassword;
      const data = JSON.parse(localStorage.getItem("user-info"));
      const user = JSON.parse(localStorage.getItem("user"));
      const employee = JSON.parse(localStorage.getItem("employee"));
      const findEmp = employee.find((el) => el.email === data.email);
      const indexUser = user.findIndex((el) => el.email === data.email);
      const newPass = this.newPassword;
      const confirmPass = this.confirmPassword;
      if (
        this.oldPassword === "" ||
        this.newPassword === "" ||
        this.confirmPassword === ""
      ) {
        this.showDialogRequired = true;
        this.showPopupChange = false;
      } else {
        if (newPass === confirmPass) {
          if (oldPass === data.password) {
            user.splice(indexUser, 1, {
              id: data.id,
              email: data.email,
              password: newPass,
              role: data.role,
              timeLogin: data.timeLogin,
            });
            localStorage.setItem("user-info", JSON.stringify(user[indexUser]));
            localStorage.setItem("user", JSON.stringify(user));
            //
            employee.splice(indexUser, 1, {
              id: findEmp.id,
              emp_ID: findEmp.emp_ID,
              firstName: findEmp.firstName,
              lastName: findEmp.lastName,
              email: findEmp.email,
              password: newPass,
              imgUrl: findEmp.imgUrl,
              role: findEmp.role,
              depart_id: findEmp.depart_id,
              depart_name: findEmp.depart_name,
              position_id: findEmp.position_id,
              address: findEmp.address,
              phoneNumber: findEmp.phoneNumber,
              birthday: findEmp.birthday,
              gender: findEmp.gender,
              numberCard: findEmp.numberCard,
              nationality: findEmp.nationality,
              ethnic: findEmp.ethnic,
              religion: findEmp.religion,
              educationalLevel: findEmp.educationalLevel,
              academicLevel: findEmp.academicLevel,
            });
            localStorage.setItem("employee", JSON.stringify(employee));
            this.showDialogSuccess = true;
            this.showPopupChange = false;
          } else {
            this.showDialogOldFail = true;
            this.showPopupChange = false;
          }
        } else {
          this.showDialogConfirmFail = true;
          this.showPopupChange = false;
        }
      }
    },
    input() {
      // const checkLength = this.$refs.checklegnth.className;
      // const checkUpper = this.$refs.checkUpper;
      // const checkNumber = this.$refs.checkNumber;
      // const checkSpecial = this.$refs.checkSpecial;
      const listInput = this.$refs.itemInput.value;
      if (listInput.trim()) {
        this.showIcon = true;
      } else {
        this.showIcon = false;
      }
      if (listInput.trim().length > 8) {
        this.checkLength = "valid";
        this.colorIconLength = "rgb(16, 37, 158)";
      } else {
        this.checkLength = "unvalid";
        this.colorIconLength = "red";
      }
      if (/[A-Z]/.test(listInput.trim())) {
        this.checkUpper = "valid";
        this.colorIconUpper = "rgb(16, 37, 158)";
      } else {
        this.checkUpper = "unvalid";
        this.colorIconUpper = "red";
      }
      if (/[0-9]/.test(listInput.trim())) {
        this.checkNumber = "valid";
        this.colorIconNumber = "rgb(16, 37, 158)";
      } else {
        this.checkNumber = "unvalid";
        this.colorIconNumber = "red";
      }
      if (/[!@#$%^&*().,{}[\];':"<>?/`~+-]/.test(listInput.trim())) {
        this.checkSpecial = "valid";
        this.colorIconSpecial = "rgb(16, 37, 158)";
      } else {
        this.checkSpecial = "unvalid";
        this.colorIconSpecial = "red";
      }
    },
    showPassword() {
      if (this.checkBox === true) {
        this.choose = "text";
      } else {
        this.choose = "password";
      }
    },
  },
};
</script>
<style src="@/assets/css/resetPassword.css" scoped></style>
