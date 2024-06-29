import Axios from "axios";

const token = await localStorage.getItem("access_token");
const request = Axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8800",
  headers: {
    Authorization: token,
  },
});

export default request;
