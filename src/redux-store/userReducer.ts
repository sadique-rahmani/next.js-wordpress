import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserData } from "@/interfaces/UserInterface";

interface InitialStateTypes {
  isAuthenticated: boolean;
  userData: UserData | null;
}

const initialState: Partial<InitialStateTypes> = {
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<InitialStateTypes>>) => {
      console.log("🚀 ~ action:", action);

      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;

const UserReducer = userSlice.reducer;

export default UserReducer;
