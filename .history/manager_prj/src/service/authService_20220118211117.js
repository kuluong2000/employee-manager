import axios from "axios";
const authService = {
  login: async function (user) {
    const res = await axios.get(`user`, user);
    return res.data;
  },
};
export default authService;
