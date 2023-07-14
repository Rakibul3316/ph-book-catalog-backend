import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IBook } from "./book.interface";
import { Request, Response } from "express";
import { BookServices } from "./book.service";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
//   console.log({ bookData });
//   return false;
  const result = await BookServices.createBookToDB(bookData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book created successfully!",
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookServices.getSingleBookFromDB(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Find specific book",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  // const user = req.user;

  const result = await BookServices.deleteBookFromDB(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully",
    data: result,
  });
});

export const BookControllers = {
  createBook,
  getSingleBook,
  deleteBook,
};
