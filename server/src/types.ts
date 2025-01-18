export interface IUser {
  id: string;
  username: string
  email: string
  firstName: string
  lastName: string
}

export interface KeycloakError {
  errorMessage: string;
  error: string;
  error_description?: string;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  refresh_token: string;
}