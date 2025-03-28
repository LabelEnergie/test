export type TAuthTokenData = {
  id: string;
  email: string;
  password: string;
};

// User

export type TAuth = {
  id: string;
  isAdmin?: boolean;
  email: string;
  photo?: string;
  firstName: string;
  lastName: string;
  address: TAddress;
};

export type TAddress = {
  address: string;
  zipCode: string;
  city: string;
  address2?: string;
};

export type TUpdateUserBody = {
  email: string;
  firstName: string;
  lastName: string;
  address: TAddress;
  photo?: string;
};

// AUTH

export type TLoginBody = {
  email: string;
  password: string;
};

export type TSignupBody = {
  email: string;
  password: string;
  address: TAddress;
  firstName: string;
  lastName: string;
};

// FORGOT PASSWORD

export type TForgotPasswordEmailBody = {
  email: string;
};

export type TChangePasswordBody = {
  code: string;
  email: string;
  password: string;
};

export enum TempCodeType {
  ResetPassword = 1,
}
