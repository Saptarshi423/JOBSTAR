import customFetch from "../../utils/axios";
import { logOutUser } from "./userSlice";
import { toast } from "react-toastify";

export const registerUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/auth/register", user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/auth/login", user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateuserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.patch("/auth/updateUser", user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`
        //authorization: "Bearer",
      },
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logOutUser());
      toast.error("Unauthorized! Logging out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
