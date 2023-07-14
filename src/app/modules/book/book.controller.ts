import httpStatus from "http-status";
import { Request, Response } from "express";
import { IBook } from "./book.interface";
import { BookServices } from "./book.service";
import { bookFilterableFields } from "./book.contant";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";

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

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);

  const result = await BookServices.getAllBooksFromDB(filters);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrived books data",
    meta: result.meta,
    data: result.data,
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

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await BookServices.updateBookToDB(id, updateData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully",
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
  getAllBooks,
  updateBook,
  deleteBook,
};
