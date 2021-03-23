export default {
  defaults: {
    baseUrl: "",
  },
  post: (path, body) => {
    if (path === "/auth/signup") {
      if (
        body.firstname.length === 0 ||
        body.lastname.length === 0 ||
        body.email.length === 0 ||
        body.password.length < 8
      )
        return Promise.resolve({
          message: "Failed! All fields are required!",
        });

      return Promise.resolve({
        message: "User registered successfully!",
      });
    }
  },
};
