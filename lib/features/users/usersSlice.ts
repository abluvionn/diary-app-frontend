import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout, register } from './usersThunks';
import { RegisterResponse } from '@/types/user';
import { RootState } from '@/lib/store';

interface UsersState {
  user: RegisterResponse | null;
}

const initialState: UsersState = {
  user: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
    updateState: (state, { payload: response }: PayloadAction<RegisterResponse>) => {
      state.user = response;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, {payload: user}: PayloadAction<RegisterResponse>) => {
      state.user = user;
    })
    builder
      .addCase(login.fulfilled, (state, { payload: user }: PayloadAction<RegisterResponse>) => {
        state.user = user;
      });
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
  },
});

export const { unsetUser, updateState } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user?.user;
