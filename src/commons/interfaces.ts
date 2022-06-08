export interface IRequest {}

export interface IResult {
  response: any;
  data: any;
}

export interface IError {
  code: string;
  message?: string;
  extras?: any;
}

export interface IInput {
  value?: any;
  error?: string;
}

export interface IUserInfo {
  id?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  roleCode?: number;
}
