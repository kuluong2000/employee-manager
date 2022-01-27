<template>
  <div class="facilities">
    <v-container class="container">
      <v-row>
        <v-col cols="12">
          <!-- <h1>employee list</h1> -->
          <v-card>
            <v-card-title class="pb-0">
              DANH SÁCH CƠ SỞ VẬT CHẤT
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Tìm Kiếm"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-dialog
              v-model="dialog"
              persistent
              max-width="600px"
              v-if="roleEm !== 'Nhân Viên'"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="green"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  class="ms-5 my-4"
                >
                  Thêm Mới
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="pt-7">
                  <span class="text-h5">Thêm mới cơ sở vật chất</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          :counter="30"
                          label="Mã Cơ Sở Vật Chất"
                          v-model="facilitiesItem.facilities_id"
                          required
                          class="pt-1"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          :counter="30"
                          label="Tên Cơ Sở Vật Chất"
                          v-model="facilitiesItem.title"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Giá Tiền"
                          v-model="facilitiesItem.price"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Số Lượng"
                          v-model="facilitiesItem.qty"
                          required
                          type="number"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Link Hình Ảnh"
                          v-model="facilitiesItem.image"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Thời Gian Nhập Hàng"
                          v-model="facilitiesItem.innitiated_date"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Nhân Viên Quản Lý"
                          v-model="facilitiesItem.email"
                          required
                        ></v-text-field>
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
                  <v-btn color="blue darken-1" text @click="createFacilities">
                    Cập nhật
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-data-table
              :headers="header"
              :items="facilities"
              :items-per-page="10"
              class="elevation-1 text-center"
              item-key="id"
              show-select
              :search="search"
              :footer-props="{
                showFirstLastPage: true,
                firstIcon: 'mdi-arrow-collapse-left',
                lastIcon: 'mdi-arrow-collapse-right',
              }"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <div v-if="roleEm !== 'Nhân Viên'">
                <v-dialog max-width="1000" persistent>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                      @click="DetailsUser(item)"
                      >Chi Tiết <v-icon dark right> mdi-eye </v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card class="pb-3">
                      <v-card-text class="pb-0">
                        <v-container class="px-0 pt-13 pb-0">
                          <h1 class="px-5 py-0 text-center primary--text">
                            Thông Tin Cơ Sở Vật Chất
                          </h1>
                          <v-row align="center" justify="center" class="">
                            <v-col cols="12" sm="6" class="text-center">
                              <div
                                class="mb-8"
                                v-if="detailsItem.image"
                              >
                                <v-img
                                  aspect-ratio="30"
                                  :src="detailsItem.image"
                                  height="300px"
                                />
                              </div>
                              <div
                                class="mb-8"
                                v-else
                              >
                                <v-img
                                  aspect-ratio="30"
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ19aD8j537tcC2xCMHnch9M7WAVifMq4gNw&usqp=CAU"
                                  height="300px"
                                />
                              </div>
                              <h1
                                class="black--text mt-2 mb-6"
                              >
                                {{ detailsItem.title }}
                              </h1>
                            </v-col>
                            <v-col cols="12" sm="6" class="text-center">
                              <v-form>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" md="12" class="pb-0 pt-1">
                                      <v-text-field
                                        label="ID"
                                        :value="detailsItem.id"
                                        required
                                        class="pt-1"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12" class="pb-0 pt-1">
                                      <v-text-field
                                        label="Mã Cơ Sở Vật Chất"
                                        :value="detailsItem.facilities_id"
                                        required
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12" class="pb-0 pt-1">
                                      <v-text-field
                                        label="Tên Cơ Sở Vật Chất"
                                        :value="detailsItem.title"
                                        required
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12" class="pb-0 pt-1">
                                      <v-text-field
                                        label="Giá Tiền"
                                        :value="detailsItem.price"
                                        required
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12" class="pb-0 pt-1">
                                      <v-text-field
                                        label="Số Lượng"
                                        :value="detailsItem.qty"
                                        required
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12" class="pb-0 pt-1">
                                      <v-text-field
                                        label="Ngày Nhập"
                                        :value="detailsItem.innitiated_date"
                                        required
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12" class="pb-0 pt-1">
                                      <v-text-field
                                        label="Nhân Viên Quản Lý"
                                        :value="detailsItem.email"
                                        required
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-form>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialog.value = false" color="primary">Đóng</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
                  <v-btn class="ma-2" color="orange darken-2" dark>
                    Sửa
                    <v-icon dark right> mdi-pencil </v-icon>
                  </v-btn>
                  <v-btn class="ma-2" color="red" dark @click="handleRow(item)">
                    Xóa
                    <v-icon dark right> mdi-delete </v-icon>
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn class="ma-2" color="primary" dark>
                    Chi Tiết
                    <v-icon dark right> mdi-eye </v-icon>
                  </v-btn>
                </div>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary"> Reset </v-btn>
              </template>
              <!-- <template v-slot:top>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="mx-5"
              ></v-text-field> </template> -->
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <popup
      :show="showDialogDelete"
      :cancel="cancel"
      :confirm="handleDelete"
      text="Có! Mình muốn xóa ^^"
      title="Thông báo!"
      textCancel="Không nha :v"
      description="Bạn có muốn xóa dữ liệu này không ???"
    ></popup>
    <popup
      :show="showDialogDeleteSuccess"
      :cancel="cancel"
      :confirm="confirm"
      text="Oke ^^"
      title="Thông báo!"
      description="Xoá dữ liệu thành công!!"
    ></popup>
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
  </div>
</template>
<script>
import axios from "axios";
import Popup from "../components/Popup.vue";
export default {
  components: { Popup },
  data() {
    return {
      header: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "Mã CSVC",
          value: "facilities_id",
          align: "center",
        },
        {
          text: "Tên CSVC",
          value: "title",
          align: "center",
        },
        {
          text: "Giá Tiền",
          value: "price",
          align: "center",
        },
        {
          text: "Số Lượng",
          value: "qty",
          align: "center",
        },
        {
          text: "Ngày Nhập",
          value: "innitiated_date",
          align: "center",
        },
        {
          text: "Nhân Viên Quản Lý",
          value: "email",
          align: "center",
        },
        {
          text: "Chức Năng",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      facilities: [],
      search: "",
      roleEm: "",
      deleteId: 0,
      detailsId: 0,
      detailsItem: {},
      dialog: false,
      facilitiesItem: {
        facilities_id: "",
        title: "",
        price: "",
        qty: "",
        image: "",
        innitiated_date: "",
        email: "",
      },
      showDialogDelete: false,
      showDialogDeleteSuccess: false,
      showDialogCreateRequired: false,
      showDialogCreateSuccess: false,
    };
  },
  async mounted() {
    const dataLogin = JSON.parse(localStorage.getItem("user-info"));
    this.roleEm = dataLogin.role;
    if (dataLogin.role == "Nhân Viên") {
      const resEm = await axios.get(
        `${process.env.VUE_APP_SERVER_URL}/facilities?email=${dataLogin.email}`
      );
      this.facilities = resEm.data;
    } else {
      const res = await axios.get(
        `${process.env.VUE_APP_SERVER_URL}/facilities`
      );
      this.facilities = res.data;
    }
  },
  methods: {
    async DetailsUser(item) {
      this.detailsId = item.id;
      const res = await axios.get(
        `${process.env.VUE_APP_SERVER_URL}/facilities/${this.detailsId}`
      );
      this.detailsItem = res.data;
    },
    handleRow(item) {
      this.deleteId = item.id;
      this.showDialogDelete = true;
    },
    async handleDelete() {
      await axios.delete(
        `${process.env.VUE_APP_SERVER_URL}/facilities/${this.deleteId}`
      );
      this.showDialogDelete = false;
      this.showDialogDeleteSuccess = true;
      setTimeout(() => window.location.reload(), 1200);
    },
    async createFacilities() {
      if (
        this.facilitiesItem.facilities_id == "" ||
        this.facilitiesItem.title == "" ||
        this.facilitiesItem.price == "" ||
        this.facilitiesItem.qty == "" ||
        this.facilitiesItem.email == "" ||
        this.facilitiesItem.innitiated_date == ""
      ) {
        this.showDialogCreateRequired = true;
        this.dialog = false;
      } else {
        let resFa = await axios.post(
          `${process.env.VUE_APP_SERVER_URL}/facilities`,
          {
            facilities_id: this.facilitiesItem.facilities_id,
            title: this.facilitiesItem.title,
            price: this.facilitiesItem.price,
            qty: this.facilitiesItem.qty,
            image: this.facilitiesItem.image,
            innitiated_date: this.facilitiesItem.innitiated_date,
            email: this.facilitiesItem.email,
          }
        );
        console.log(resFa);
        this.dialog = false;
        this.showDialogCreateSuccess = true;
        setTimeout(() => window.location.reload(), 1500);
      }
    },
    cancel() {
      this.showDialogDelete = false;
      this.showDialogCreateRequired = false;
      this.showDialogCreateSuccess = false;
    },
    confirm() {
      this.showDialogDelete = false;
      this.showDialogDeleteSuccess = false;
      this.showDialogCreateRequired = false;
      this.showDialogCreateSuccess = false;
    },
  },
};
</script>
<style scoped>
h1 {
  text-transform: uppercase;
  text-align: center;
  margin: -10px 0 30px;
}
</style>