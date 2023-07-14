import { IBook } from "./book.interface";
import { Book } from "./book.model";

const createBookToDB = async (payload: IBook): Promise<IBook> => {
  const result = (await Book.create(payload));
  return result;
};

const getSingleBookFromDB = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOne({ _id: id }).populate('author_id');
  return result;
};

export const BookServices = {
  createBookToDB,
  getSingleBookFromDB
};
