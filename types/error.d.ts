import { InternalAxiosRequestConfig } from 'axios';

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface ApiError {
  response: {
    data: {
      error: string;
    };
    status: number;
  };
  config: InternalAxiosRequestConfig;
}
