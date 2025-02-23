export interface Login {
  email: string;
  password: string;
}
export interface Register {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
}
export interface AuthStore {
  uid: string;
  statusLogin: boolean;
  isLoading: boolean;
  email: string | null;
  name: string | null;
  photoProfile?: string | null;
  displayName: string;
  userInfo?: object | null;
}
export interface Errors {
  login: ErrorsInterface;
  register: ErrorsInterface;
}
export interface ErrorsInterface {
  status?: boolean;
  text?: string;
}
