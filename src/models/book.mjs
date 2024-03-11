import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

// Virtual for book's URL
BookSchema.virtual("url").get(function () {
  return `/catalog/book/${this._id}`;
});

const Book = models?.Book || model("Book", BookSchema);

export default Book;
