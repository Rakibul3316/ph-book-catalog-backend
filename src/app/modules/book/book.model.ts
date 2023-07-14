import { Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "fiction",
        "non-fiction",
        "novel",
        "mystrey",
        "historical",
        "science fiction",
      ],
    },
    reviews: {
      type: [String],
    },
    publication_date: {
      type: Date,
      default: new Date(),
    },
    author_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook, BookModel>("book", bookSchema, "book");
