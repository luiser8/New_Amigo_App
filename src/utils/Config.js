const API_CONFIG = {
  env: process.env.REACT_APP_ENV || "development",
  baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1/PSMApiRest/api/",
  auth: {
    type: process.env.REACT_APP_AUTH_TYPE || "Basic",
    password: process.env.REACT_APP_AUTH_PASS || "",
  },
};

export default API_CONFIG;
