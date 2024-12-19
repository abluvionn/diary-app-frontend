export interface UserFromDb {
  _id: string;
  email: string;
}

export interface RegisterResponse {
  user: UserFromDb;
  accessToken: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}
