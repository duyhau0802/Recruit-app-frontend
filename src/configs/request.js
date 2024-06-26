import Axios from "axios";

const request = Axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8800",
  headers: {
    Authorization: localStorage.getItem("access_token"),
  },
});

export default request;
