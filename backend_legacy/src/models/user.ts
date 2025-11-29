export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Only for backend, never send to frontend
  avatar?: string;
  joinedDate: string;
  bio?: string;
  location?: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}



