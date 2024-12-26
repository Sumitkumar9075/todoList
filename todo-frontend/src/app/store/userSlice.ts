import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  username: string | null; // Now includes username
}


const initialState: UserState = {
  token: null,
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ token: string; username: string }>) {
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    logout(state) {
      state.token = null;
      state.username = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
