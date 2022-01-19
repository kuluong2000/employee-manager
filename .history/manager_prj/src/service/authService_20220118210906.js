import axios from "axios";
const authService = {
  login: async function (user) {
    const res = await axios.get(`user?email=${user.email}&&password=${user.password}`, user);
    return res.data;
  },
};
export default authService;
