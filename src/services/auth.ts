import Axios from "axios";

const AuthApi = Axios.create({
  baseURL: "https://www.googleapis.com",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export { AuthApi };
