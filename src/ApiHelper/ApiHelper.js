import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const token = Cookies.get("token");

const serverUrl = "http://0.tcp.in.ngrok.io:13377";
const middleUrl = "/api/v1/";

var headers = {
  "Content-Type": "application/json",
  "X-localization": "en",
  "ngrok-skip-browser-warning": "123456",
};

export const PostData = (url, data) => {
  var headers = {
    "Content-Type": "application/json",
    "X-localization": "en",
    "ngrok-skip-browser-warning": "123456",
  };
  return axios
    .post(serverUrl + middleUrl + url, data, { headers: headers })
    .then((responce) => {
      return responce.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const GetData = (url) => {
  return axios.get(serverUrl + middleUrl + url, {}).then((responce) => {
    return responce.data;
  });
};

export const PostDataWithToken = (url, data) => {
  var headers = {
    "Content-Type": "application/json",
    "X-localization": "en",
    Authorization: `Bearer ${token}`,
  };

  return axios
    .post(serverUrl + middleUrl + url, data, { headers: headers })
    .then((responce) => {
      return responce.data;
    });
};

export const GetDataSkipWarning = (url) => {
  return axios
    .get(serverUrl + middleUrl + url, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
    .then((responce) => {
      return responce.data;
    });
};

export const GetDataWithToken = (url) => {
  const token = Cookies.get("token");


  const headers = {
    Authorization: "Bearer " + token,
  };
  return fetch(serverUrl + middleUrl + url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const PutDataWithToken = (url, data) => {
  var headers = {
    Authorization: "Bearer " + token,
    "Accept-Language": "en",
  };
  return axios
    .put(serverUrl + middleUrl + url, data, { headers: headers })
    .then((resposne) => {
      return resposne.data;
    })
    .catch((error) => {
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      return errorStatus;
    });
};
