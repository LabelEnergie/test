export type TLoginBody = {
  email: string;
  password: string;
};

export type TSignUpBody = {
  email: string;
  password: string;
  address: TAddress;
  firstName: string;
  lastName: string;
};

export type TForgotPasswordBody = {
  email: string;
};

export type TResetPasswordBody = {
  password: string;
  code: string;
  email: string;
};

// User

export type TUser = {
  id: string;
  isAdmin?: boolean; // Rendre optionnel
  email: string;
  photo?: string; // Rendre optionnel
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
};
