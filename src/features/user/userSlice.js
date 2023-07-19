import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {
  registerUserThunk,
  loginUserThunk,
  updateuserThunk,
} from "./userThunk";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";

const initialState = {
  isLoading: false,
  isSideBarOpen: true,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk(user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk(user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateuserThunk(user, thunkAPI);
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  (message, thunkAPI) => {
    try {
      thunkAPI.dispatch(logOutUser(message));
      thunkAPI.dispatch(clearAllJobsState());
      thunkAPI.dispatch(clearValues());

      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSideBar: (state, action) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
    logOutUser: (state, action) => {
      state.user = null;
      state.isSideBarOpen = false;
      removeUserFromLocalStorage();
      if (action.payload) {
        toast.success(action.payload);
      }
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello there ${user.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome back ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;

      addUserToLocalStorage(user);
      toast.success(`Hello there ${user.name}`);
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.rejected]: (state, action)=>{
      toast.error('There was an error');
    }
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(registerUser.pending, () => {})
  //       .addCase(registerUser.fulfilled, (state, { payload }) => {})
  //       .addCase(registerUser.rejected, (state, payload) => {});
  //   },
});

export const { toggleSideBar, logOutUser } = userSlice.actions;
export default userSlice.reducer;
