
import { loadUserApi, loginUserApi, logoutUserApi, registerUserApi } from "../../api/userApi.js";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const {data} = await loginUserApi(email, password);

    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};


export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const {data} = await loadUserApi();

    if(data)dispatch({ type: "loadUserSuccess", payload: data.user });
    else dispatch({ type: "loadUserFail", payload: "User Not logged In" });
  } catch (error) {
    console.log(error);
    dispatch({ type: "loadUserFail", payload: error?.response?.data?.message });
  }
};

export const register = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });

    const {data} = await registerUserApi(formdata);

    dispatch({ type: "registerSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "registerFail", payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    const {data} = await logoutUserApi();
    dispatch({ type: "logoutSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error.response.data.message });
  }
};
