import axios from "axios";
import { getUserToLocalStorage } from "./localStorage";
import { clearStore } from "../features/user/userSlice";

const customFetch = axios.create({
  baseURL: "https://redux-toolkit-jobster-api-server.onrender.com/api/v1",
});

customFetch.interceptors.request.use(
  (config) => {
    const user = getUserToLocalStorage();
    if (user) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const checkForUnauthorizedResponse = async (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized. Logging out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
