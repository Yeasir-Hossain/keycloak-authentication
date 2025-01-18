import { IAuthState, IUser } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IAuthState = {
  user: undefined
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setValue: <K extends keyof IAuthState>(state: IAuthState, action: PayloadAction<{ target: K; value: IAuthState[K] }>) => {
      state[action.payload.target] = action.payload.value;
    },
    userLoggedIn: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    userLoggedOut: state => {
      state.user = undefined;
    }
  }
});

export const { userLoggedIn, userLoggedOut, setValue } = authSlice.actions;

export default authSlice.reducer;
