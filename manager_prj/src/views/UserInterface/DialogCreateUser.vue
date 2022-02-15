<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="green" dark v-bind="attrs" v-on="on" class="ms-5 my-4">
          Thêm Mới
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="pt-7">
          <span class="text-h5">Thêm mới tài khoản</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  v-model="user.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="input-container">
                  <v-text-field
                    label="Password*"
                    :type="choose"
                    required
                    v-model="user.password"
                  ></v-text-field>
                  <v-icon class="material-icons visibility" @click="showPassword">{{
                    visibility
                  }}</v-icon>
                </div>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="this.listRole"
                  label="Chức Vụ"
                  required
                  v-model="user.role"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Đóng
          </v-btn>
          <v-btn color="blue darken-1" text @click="createUser">
            Cập nhật
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup
      :show="showDialogCreateRequired"
      :cancel="cancel"
      :confirm="confirm"
      text="Ok! Mình sẽ kiểm tra lại"
      title="Thông báo!"
      description="Vui lòng điền đầy đủ thông tin!!"
    ></popup>
    <popup
      :show="showDialogCreateSuccess"
      :cancel="cancel"
      :confirm="confirm"
      text="Oke ^^"
      title="Thông báo!"
      description="Thêm dữ liệu thành công!!"
    ></popup>
    <popup
      :show="showDialogDuplicateEmail"
      :cancel="cancel"
      :confirm="confirm"
      text="Oke ^^"
      title="Thông báo!"
      description="Email này đã tồn tại!! Vui lòng chọn email khác"
    ></popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Popup from "../../components/Popup.vue";

export default {
  components: { Popup },
  name: "DialogCreateUser",
  data() {
    return {
      dialog: false,
      user: {},
      showDialogCreateRequired: false,
      showDialogCreateSuccess: false,
      showDialogDuplicateEmail: false,
      listRole: [],
    };
  },
  mounted() {
    const resPo = JSON.parse(localStorage.getItem("position"));
    let result = resPo.map((a) => a.role);
    this.listRole = result;
  },
  methods: {
    async createUser() {
      if (
        this.user.email == "" ||
        this.user.password == "" ||
        this.user.role == ""
      ) {
        this.showDialogCreateRequired = true;
        this.dialog = false;
      } else {
        if (this.userExists(this.user.email) == true) {
          this.showDialogDuplicateEmail = true;
          this.dialog = false;
        } else {
          const resUser = JSON.parse(localStorage.getItem("user"));
          const detailsIdUser = resUser[resUser.length - 1];
          resUser.push({
            id: detailsIdUser.id + 1,
            email: this.user.email,
            password: this.user.password,
            role: this.user.role,
            timeLogin: this.user.timeLogin,
          });
          this.account = resUser;
          localStorage.setItem("user", JSON.stringify(resUser));
          const resEm = JSON.parse(localStorage.getItem("employee"));
          const detailsIdEm = resEm[resEm.length - 1];
          resEm.push({
            id: detailsIdEm.id + 1,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            password: this.user.password,
            role: this.user.role,
            position_id: this.user.position_id,
            depart_id: this.user.depart_id,
            depart_name: this.user.depart_name,
            address: this.user.address,
            imgUrl: this.user.imgUrl,
          });
          localStorage.setItem("employee", JSON.stringify(resEm));
          this.dialog = false;
          this.showDialogCreateSuccess = true;
        }
      }
    },
    cancel() {
      //   this.showDialogDelete = false;
      //   this.showDialogUpdate = false;
      // this.showDialogCreateRequired = false;
      // this.showDialogCreateSuccess = false;
      // this.showDialogDuplicateEmail = false;
    },
    confirm() {
      //   this.showDialogDelete = false;
      //   this.showDialogUpdate = false;
      this.showDialogCreateRequired = false;
      this.showDialogCreateSuccess = false;
      //   this.showDialogDeleteSuccess = false;
      this.showDialogDuplicateEmail = false;
    },
    showPassword() {
      this.$store.dispatch("actionSetShowPassword");
    },
    userExists(email) {
      const resUser = JSON.parse(localStorage.getItem("user"));
      return resUser.some(function(el) {
        return el.email === email;
      });
    },
  },
  computed: {
    ...mapState({
      choose: (state) => state.choose,
      visibility: (state) => state.visibility,
    }),
  },
};
</script>

<style>
.input-container {
  position: relative !important;
}
.material-icons {
  margin: 0 10px;
  color: #aaa;
  cursor: default;
  position: absolute !important;
  content: "";
  top: 16px;
  right: -8px;
}
</style>
