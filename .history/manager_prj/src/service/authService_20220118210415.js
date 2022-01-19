import axios from "axios";
const authService = {
  login: async function (user) {
    const res = await axios.get(`user?email=${email}&password=${password}`, {
      email: user.email,
      password: user.password,
    });
    return res.data;
  },
};
export default authService;
