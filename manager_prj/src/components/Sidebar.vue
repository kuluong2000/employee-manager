<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-img
      height="140"
      class="pa-4"
      src="https://pdp.edu.vn/wp-content/uploads/2021/04/hinh-nen-cong-nghe-1.jpg"
    >
      <div class="text-center">
        <v-avatar class="mb-4" color="grey darken-1" size="70">
          <v-img
            aspect-ratio="30"
            src="https://scontent.fdad3-5.fna.fbcdn.net/v/t1.6435-9/131983622_1764246023751239_4482106337413797845_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=32WUFSKYPfUAX-pE8-N&_nc_ht=scontent.fdad3-5.fna&oh=00_AT_vsrN4kC20wtJDWQfJc0B421sECpPBlqqxWct85cQKPA&oe=6206A48D"
          />
        </v-avatar>
        <h3 class="white--text">Nguyễn Sỹ Dũng</h3>
      </div>
    </v-img>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="[icon, text, url] in links" :key="icon" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <router-link :to='url'>{{ text }}</router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      links: [
        ["mdi-microsoft-windows", "Trang Chủ", "/"],
        ["mdi-account", "Quản Lý Tài Khoản", "/user"],
        ["mdi-clipboard-list-outline", "Quản Lý Nhân Viên", "/employee"],
        ["mdi-card-account-details-outline", "Quản Lý CS Vật Chất", "/facilities"],
        ["mdi-card-account-details-outline", "Quản Lý Phòng Ban", "/department"],
        ["mdi-card-account-details-outline", "Quản Lý Chức Vụ", "/position"],
        ["mdi-cog", "Cài Đặt", "/about"],
      ],
    };
  },
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
  .v-list-item--link:hover a,
    .v-list-item--link:hover i{
    color: #fff !important;;
  }
</style>
