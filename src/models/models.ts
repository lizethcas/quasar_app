export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Texts {
  textLink: string;
}

export interface PasswordResetResponse {
  success: boolean;
  errorCode: number;
  msgError: string;
}
