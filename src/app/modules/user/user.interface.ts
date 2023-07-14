import { Model } from "mongoose";

export type IUser = {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
};

export type ILoginUserReponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IUserExistResponse = {
  _id: string;
  password: string;
  email: string;
};

export type UserModel = {
  isUserExist(email: string): Promise<IUserExistResponse>;

  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
