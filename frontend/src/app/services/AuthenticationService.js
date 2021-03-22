import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

class AuthenticationService {
  login = (email, password) => {
    return axios
      .post("/auth/login", { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  signOut() {
    localStorage.removeItem("user");
  }

  register = async (firstname, lastname, email, password) => {
    return axios.post("/auth/signup", {
      firstname,
      lastname,
      email,
      password,
    });
  };

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthenticationService();
