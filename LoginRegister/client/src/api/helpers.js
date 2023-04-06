import axios from "./axios";
const LOGIN_URL = "/auth";

const handleLoginHelper = (username, password) => {
  return axios
    .post(
      LOGIN_URL, //await not required
      JSON.stringify({ username, password }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then(
      (response) => {
        return response?.data;
      },
      (err) => {
        let errhelper = "";
        if (!err?.response) {
          errhelper += "No Server Response";
        } else if (err.response?.status === 400) {
          errhelper += "Missing Username or Password";
        } else if (err.response?.status === 401) {
          errhelper += "Unauthorized";
        } else {
          errhelper += "Login Failed";
        }
        return { err, errhelper };
      }
    );
  //   console.log(response, accessToken, errhelper);
};

export default handleLoginHelper;
