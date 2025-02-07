export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  userId: number;
  token: string;
}
