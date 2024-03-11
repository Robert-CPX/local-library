import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  // don't use arrow function here, because we need to use `this`
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  return fullname;
});
// save url as virtual in schema, so we can use it in our views, working with routes
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

const Author = models?.Author || model("Author", AuthorSchema);

export default Author;
