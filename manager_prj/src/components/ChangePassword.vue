<template>
  <transition name="fade" mode="out-in">
    <div key="5" v-show="true" class="overlay">
      <div class="form-change__pasword">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="form-info">
                <h3 class="form-info__title">Change Password</h3>
                <div class="form-info__content">
                  <p class="form-info__sub">Passwords must contain</p>
                  <div class="form-info__list">
                    <div class="form-info__item form-info__length" ref="checklegnth" :class="[checkLength]"><b-icon icon="check-circle" class="icon"></b-icon> Ít nhất 8 kí tự</div>
                    <div class="form-info__item form-info__upper" ref="checkUpper" :class="[checkUpper]"><b-icon icon="check-circle" class="icon"></b-icon> Có chứa ít nhất 1 kí tự in hoa</div>
                    <div class="form-info__item form-info__number" ref="checkNumber" :class="[checkNumber]"><b-icon icon="check-circle" class="icon"></b-icon> Có chưa ít nhất 1 số</div>
                    <div class="form-info__item form-info__specical" ref="checkSpecial" :class="[checkSpecial]"><b-icon icon="check-circle" class="icon"></b-icon> Có chưa ít nhất 1 kí tự đặt biệt</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <form class="form-input" @submit.prevent="save">
                <input type="password" placeholder="Mật khẩu cũ" class="form-input__item" v-model="oldPassword" />

                <div class="form-input__list">
                  <input :type="choose" @input="input" ref="itemInput" placeholder="Nhập mật khẩu mới" class="form-input__item" v-model="newPassword" />
                  <b-icon :icon="icon" class="form-input__icon" v-show="showIcon" @click="changeIcon"></b-icon>
                </div>
                <!-- <div class="form-input__list">
                 <input :type="choose" @input="input" ref="itemInput" placeholder="Nhập mật khẩu mới" class="form-input__item" v-model="newPassword" />
                  <b-icon :icon="icon" class="form-input__icon" v-show="showIcon"></b-icon>
                </div> -->
                <input :type="choose" placeholder="Xác nhận mật khẩu" class="form-input__item" v-model="confirmPassword" />

                <div class="form-action">
                  <button type="submit" class="form-action__save" ref="formAction">Đổi mật khẩu</button>
                  <button class="form-action__remove" @click="cancel">thoát</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
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
      icon: "eye",
      showIcon: false,
    };
  },
  methods: {
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
      if (this.checkLength === "valid" && this.checkNumber === "valid" && this.checkUpper === "valid" && this.checkSpecial === "valid") {
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
            this.$router.push("/");
            alert("thành công");
          } else {
            alert("mật khẩu cũ không đúng");
          }
        } else {
          alert("mật khẩu không khớp");
        }
      } else {
        alert("vui lòng nhập đầy đủ");
      }
    },
    input() {
      // const checkLength = this.$refs.checklegnth.className;
      // const checkUpper = this.$refs.checkUpper.className;
      // const checkNumber = this.$refs.checkNumber;
      // const checkSpecial = this.$refs.checkSpecial;

      const listInput = this.$refs.itemInput.value;
      if (this.oldPassword.length > 0) {
        this.showIcon = true;
      }
      if (listInput.trim()) {
        this.showIcon = true;
      } else {
        this.showIcon = false;
      }
      if (listInput.trim().length > 8) {
        this.checkLength = "valid";
      } else {
        this.checkLength = "unvalid";
        if (/[A-Z]/.test(listInput.trim())) {
          this.checkUpper = "valid";
        } else {
          this.checkUpper = "unvalid";
        }
      }
      if (/[0-9]/.test(listInput.trim())) {
        this.checkNumber = "valid";
      } else {
        this.checkNumber = "unvalid";
      }
      if (/[!@#$%^&*().,{}[\];':"<>?/`~+-]/.test(listInput.trim())) {
        this.checkSpecial = "valid";
      } else {
        this.checkSpecial = "unvalid";
      }
    },

    changeIcon() {
      if (this.icon === "eye") {
        this.icon = "eye-slash";
        this.choose = "text";
      } else {
        this.icon = "eye";
        this.choose = "password";
      }
    },
  },
};
</script>
<style src="@/assets/css/component/common/view/resetPassword.css" scoped></style>
