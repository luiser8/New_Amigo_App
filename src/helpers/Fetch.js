import PropTypes from "prop-types";
import API_CONFIG from "../utils/Config";

const api_url = API_CONFIG.baseURL;
const authType = API_CONFIG.auth.type;
const authPass = API_CONFIG.auth.password || "P$m:Bn@";

export const get = async (route) => {
  const url = `${api_url}${route}`;
  return await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: new Headers({
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `${authType} ${btoa(authPass)}`,
    }),
  })
    .then(async (response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      }
      if (response.status === 401) {
        return response.text();
      } else {
        return response.json().then((json) => {
          return json;
        });
      }
    })
    .catch((e) => console.log(e));
};
export const post = async (route, data) => {
  const url = `${api_url}${route}`;
  return await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: new Headers({
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `${authType} ${btoa(authPass)}`,
    }),
    body: JSON.stringify(data),
    json: true,
  })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      }
      if (response.status === 401) {
        return response.text();
      } else {
        response.json().then((json) => {
          return json;
        });
        return null;
      }
    })
    .catch((e) => console.log(e));
};
export const put = async (route, data) => {
  const url = `${api_url}${route}`;
  return await fetch(url, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: new Headers({
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `${authType} ${btoa(authPass)}`,
    }),
    body: JSON.stringify(data),
    json: true,
  })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      }
      if (response.status === 401) {
        return response.text();
      } else {
        response.json().then((json) => {
          return json;
        });
        return null;
      }
    })
    .catch((e) => console.log(e));
};
export const del = async (route) => {
  const url = `${api_url}${route}`;
  return await fetch(url, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    headers: new Headers({
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `${authType} ${btoa(authPass)}`,
    }),
    json: true,
  })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      }
      if (response.status === 401) {
        return response.text();
      } else {
        response.json().then((json) => {
          return json;
        });
        return null;
      }
    })
    .catch((e) => console.log(e));
};
export const blob = async (route) => {
  const url = `${api_url}${route}`;
  return await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: new Headers({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      Authorization: `${authType} ${btoa(authPass)}`,
    }),
  })
    .then((response) => {
      return response;
    })
    .catch((e) => console.log(e));
};

get.propTypes = {
  route: PropTypes.string,
};
post.propTypes = {
  route: PropTypes.string,
  data: PropTypes.object,
};
put.propTypes = {
  route: PropTypes.string,
  data: PropTypes.object,
};
del.propTypes = {
  route: PropTypes.string,
};
blob.propTypes = {
  route: PropTypes.string,
};
