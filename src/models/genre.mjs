import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const GenreSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

// Virtual for genre's URL
GenreSchema.virtual("url").get(function () {
  return `/catalog/genre/${this._id}`;
});

const Genre = models?.Genre || model("Genre", GenreSchema);

export default Genre;
