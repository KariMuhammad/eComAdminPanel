import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as authServices from "../../../../apis/services/auth-services";
import type { CommonState } from "@/interfaces";
import { toast } from "sonner";

interface AuthState {
  isAuthenticated: boolean;
  token: string;
  user: {
    token: string;
    username: string;
    email: string;
    mobile: string;
  };
}

const initialState: CommonState & AuthState = {
  isAuthenticated: false,
  token: "",
  user: {
    email: "",
    mobile: "",
    token: "",
    username: ""
  },
  loading: false,
  error: null,
  message: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await authServices.login(
        credentials.email,
        credentials.password
      );

      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }

      // Assuming response.data contains user information
      toast.success("Login successful");
      console.log("Login response:", response);
      return thunkAPI.fulfillWithValue(response.data);
      // return data;
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      return thunkAPI.rejectWithValue(error);

      // return value is action.payload
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.error = null;
      state.token = "";
      state.isAuthenticated = false;
      state.loading = false;
      state.user = initialState.user;
      state.message = "Logout";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.token = "";
      state.isAuthenticated = false;
      state.user = initialState.user;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = "Login successful";
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = {
        token: action.payload.token,
        username: action.payload.username,
        email: action.payload.email,
        mobile: action.payload.mobile,
      };
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.message = "Login failed";
      state.token = "";
      state.isAuthenticated = false;
      state.user = initialState.user;
    });
  },
});

export const authReducer = authSlice.reducer; // used in wire configureStore
export const authActions = authSlice.actions; // used when we dispatch
export const authSelector = (state: { auth: AuthState }) => state.auth;
export type AuthStateType = AuthState; // useDispatch<RootState, AuthStateTyp>
export type AuthActionsType = typeof authSlice.actions;
