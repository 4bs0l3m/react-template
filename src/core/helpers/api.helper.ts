import * as axiosHook from "axios-hooks";
import axios from "axios";

import { envoriment } from "../../envoriment";
import {
  getAllSessionParameters,
  resetAuthenticatedSession,
} from "../actions/session";
import { UniqueHelper } from "./unique.helper";

const APIInstance = axios.create({
  baseURL: envoriment.BASE_URL,
});

APIInstance.interceptors.request.use(
  (config) => {
    const token = getAllSessionParameters()["ACCESS_TOKEN"];
    const header = config.headers;

    header.setAccept("application/json");
    header.setContentType("application/json");
    header.set("guid", UniqueHelper.newGuid());
    header.set("ip", "127.0.0.1");
    header.set("dialect", "TR");
    header.set("channel", "administration-channel");
    header.Authorization = "Bearer " + token;

    config.headers = header;

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

APIInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      resetAuthenticatedSession();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export const useApi = axiosHook.makeUseAxios({ axios: APIInstance });
