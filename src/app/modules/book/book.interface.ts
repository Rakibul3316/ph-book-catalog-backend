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
    | "science fiction";
  publication_date: Date;
  reviews?: string[];
  author_id: Types.ObjectId;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
