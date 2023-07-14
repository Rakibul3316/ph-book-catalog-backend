import { IBook } from "./book.interface";
import { Book } from "./book.model";

const createBookToDB = async (payload: IBook): Promise<IBook> => {
  const result = (await Book.create(payload));
  return result;
};

export const BookServices = {
    createBookToDB
}
