export interface FilteredUser {
  id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserRegisterResponse {
  status: any;
  message: string;
}

export interface UserResponse {
  status: any;
  data: {
    user: FilteredUser;
  };
}

export interface UserLoginResponse {
  status: any;
  email: string;
  fullnmae: string;
  // token: string;
}

export interface GetEndpointResponse {
  status: any;
  message: any;
  data: any;
}