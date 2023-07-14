import { Request, Response } from "express";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import { ILoginUserReponse } from "../user/user.interface";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { AuthServices } from "./auth.service";
import { IRefershTokenResponse } from "./auth.interface";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthServices.loginUserToSystem(loginData);
  const { refreshToken, ...otherData } = result;

  // Set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production" ? true : false,
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginUserReponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: otherData,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  // Set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production" ? true : false,
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefershTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  refreshToken,
};
