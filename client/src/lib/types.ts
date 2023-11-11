export interface FilteredUser {
    id: string;
    name: string;
    email: string;
    role: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UserResponse {
    status: any;
    data: {
      user: FilteredUser;
    };
  }
  
  export interface UserLoginResponse {
    status: any;
    token: string;
  }  