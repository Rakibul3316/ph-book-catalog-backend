import { Model, Types } from "mongoose";

export type IBook = {
  title: string;
  author: string;
  genre:
    | "fiction"
    | "non-fiction"
    | "novel"
    | "mystrey"
    | "historical"
    | "science-fiction";
  publication_date: Date;
  reviews?: string[];
  author_id: Types.ObjectId;
};

export type IBookFilters = {
  searchTerm?: string;
  title?: string;
  genre?: string;
  publication_date?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
