import { IAuthState } from "@/types";
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
    userLoggedOut: state => {
      state.user = undefined;
    }
  }
});

export const { userLoggedOut, setValue } = authSlice.actions;

export default authSlice.reducer;
