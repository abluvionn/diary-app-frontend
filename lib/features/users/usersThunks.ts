import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '@/lib/axiosApi';
import { LoginMutation, RegisterResponse } from '@/types/user';
import { GlobalError, ValidationError } from '@/types/error';

export const register = createAsyncThunk<
  RegisterResponse,
  LoginMutation,
  { rejectValue: ValidationError }
>('users/register', async (registerForm, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>('/users', registerForm);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 422) {
      return rejectWithValue(error.response.data as ValidationError);
    }
    throw error;
  }
});

export const login = createAsyncThunk<
  RegisterResponse,
  LoginMutation,
  {
    rejectValue: GlobalError;
  }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const { data: response } = await axiosApi.post<RegisterResponse>(
      '/users/sessions',
      loginMutation,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 401) {
      return rejectWithValue(error.response.data as GlobalError);
    }

    throw error;
  }
});

export const logout = createAsyncThunk<void, undefined>('users/logout', async () => {
  try {
    await axiosApi.delete('/users/logout', { withCredentials: true });
  } catch (e) {
    console.log(e);
  }
});
