<template>
  <v-navigation-drawer v-if="!drawer" app>
    <v-img
      height="140"
      class="pa-4"
      src="https://pdp.edu.vn/wp-content/uploads/2021/04/hinh-nen-cong-nghe-1.jpg"
    >
      <div class="text-center">
        <v-avatar class="mb-2" color="grey darken-1" size="77" v-if="imgUrl">
          <v-img
            aspect-ratio="30"
            :src="imgUrl"
          />
        </v-avatar>
        <v-avatar class="mb-2" color="grey darken-1" size="77" v-else>
          <v-img
            aspect-ratio="30"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_8jyrBjic0ELBWNbA2JH7ufzOb3jkJvN8Q&usqp=CAU"
          />
        </v-avatar>
        <h3 class="white--text">{{ lastName }} {{ firstName }}</h3>
      </div>
    </v-img>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="[icon, text, url] in links" :key="icon" link :to='url' class="item-sidebar">
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          {{ text }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// import { mapState } from "vuex";
import axios from "axios"
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      links: [
        ["mdi-microsoft-windows", "Trang Chủ", "/"],
        ["mdi-account", "Quản Lý Tài Khoản", "/user"],
        ["mdi-card-account-details-outline", "Quản Lý Nhân Viên", "/employee"],
        ["mdi-desktop-classic", "Quản Lý CS Vật Chất", "/facilities"],
        ["mdi-home-city", "Quản Lý Phòng Ban", "/department"],
        ["mdi-shield-account", "Quản Lý Chức Vụ", "/position"],
        ["mdi-cash-multiple", "Quản Lý Tiền Lương", "/payment"],
        ["mdi-cog", "Cài Đặt", "/"],
      ],
      firstName: '',
      lastName: '',
      imgUrl: '',
    };
  },
      async mounted() {
            const res = await axios.get(`http://localhost:3001/employee`);
            const dataLogin =JSON.parse(localStorage.getItem("user-info"));
            console.log(dataLogin)
            let id = dataLogin.email;
            console.log(id);
            let data = res.data;
             const index =  data.find(el => el.email === id )
            //  const index =  data.map(el => el.email == id)
             console.log(index)
             this.firstName = index.firstName
             this.lastName = index.lastName
             this.imgUrl = index.imgUrl
           console.log(index.firstName);
  },
  //     computed: {
  //   ...mapState({
  //     userInfo: (state) => state.userInfo,
  //     imageInfo: (state) => state.imageInfo,
  //   }),
  // },
};
</script>

<style scoped>
  a{
    text-decoration: none;
    color: green !important;
    display: block;
  }
  a,i{
    color:#9ca6ac!important;
    transition: 0.3s;
  }
  .v-list-item--link{
    transition: 0.3s;
  }
  .v-list-item--link:hover{
    background-color: green
  }
  .v-list-item--link:hover,
    .v-list-item--link:hover i{
    color: #fff !important;;
  }
  .item-sidebar{
    display: flex;
  }
</style>
