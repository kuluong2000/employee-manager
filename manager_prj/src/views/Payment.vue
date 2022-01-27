<template>
  <div class="payment">
    <v-container class="container">
      <v-row>
        <v-col cols="12">
          <!-- <h1>employee list</h1> -->
          <v-card>
            <v-card-title>
              DANH SÁCH TIỀN LƯƠNG
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Tìm Kiếm"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="header"
              :items="payment"
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
              <template v-slot:[`item.actions`]="">
                <div v-if="roleEm !== 'Nhân Viên'">
                  <v-btn class="ma-2" color="primary" dark>
                    Chi Tiết
                    <v-icon dark right> mdi-eye </v-icon>
                  </v-btn>
                  <v-btn class="ma-2" color="orange darken-2" dark>
                    Sửa
                    <v-icon dark right> mdi-pencil </v-icon>
                  </v-btn>
                  <v-btn class="ma-2" color="red" dark>
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
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      header: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "Mã Tiền Lương",
          value: "Payment_ID",
          align: "center",
        },
        {
          text: "Email",
          value: "email",
          align: "center",
        },
        {
          text: "Tên Nhân Viên",
          value: "firstName",
          align: "center",
        },
        {
          text: "Tổng Lương",
          value: "amount",
          align: "center",
        },
        {
          text: "Mã Chức Vụ",
          value: "position_id",
          align: "center",
        },
        {
          text: "Chi Tiết",
          value: "description",
          align: "center",
        },
        {
          text: "Ngày Bắt Đầu",
          value: "innitiated_date",
          align: "center",
        },
        {
          text: "Chức Năng",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      payment: [],
      search: "",
      roleEm: "",
    };
  },
  async mounted() {
    const dataPayment = JSON.parse(localStorage.getItem("user-info"));
    this.roleEm = dataPayment.role;
    if (dataPayment.role == "Nhân Viên") {
      const resEm = await axios.get(
        `${process.env.VUE_APP_SERVER_URL}/payment?email=${dataPayment.email}`
      );
      this.payment = resEm.data;
    } else {
      const res = await axios.get(`${process.env.VUE_APP_SERVER_URL}/payment`);
      this.payment = res.data;
    }
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