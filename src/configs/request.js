import Axios from "axios";

const request = Axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8800",
});

export default request;
