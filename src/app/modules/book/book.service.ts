import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IGenericResponse } from "../../../interfaces/common";
import { bookSearchFields } from "./book.contant";
import { IBook, IBookFilters } from "./book.interface";
import { Book } from "./book.model";

const createBookToDB = async (payload: IBook): Promise<IBook> => {
  const result = await Book.create(payload);
  return result;
};

// : Promise<IGenericResponse<IBook[]>>
const getAllBooksFromDB = async (filters: IBookFilters) => {
  // Searching & filtering
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereCondition)
    .populate("author_id")
    .sort({ createdAt: -1 });

  // const total = await AcademicSemester.countDocuments();
  const total = result.length;

  return {
    meta: {
      total,
    },
    data: result,
  };
};

const getSingleBookFromDB = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOne({ _id: id }).populate("author_id");
  return result;
};

const updateBookToDB = async (
  id: string,
  payload: Partial<IBook>,
  userId: string
): Promise<IBook | null> => {
  const book = await Book.findOne({ _id: id });
  let result = null;

  if (book?.author_id.toString() === userId) {
    result = await Book.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    }).populate("author_id");
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You can't update this book");
  }
  return result;
};

const deleteBookFromDB = async (
  id: string,
  userId: string
): Promise<IBook | null> => {
  const book = await Book.findOne({ _id: id });
  let result = null;

  if (book?.author_id.toString() === userId) {
    result = await Book.findByIdAndDelete(id);
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You can't delete this book");
  }
  return result;
};

export const BookServices = {
  createBookToDB,
  getSingleBookFromDB,
  getAllBooksFromDB,
  updateBookToDB,
  deleteBookFromDB,
};
