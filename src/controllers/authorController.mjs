import Author from "../models/authorModel.mjs";
import expressAsyncHandler from "express-async-handler";

// Display list of all authors.
export const authorList = expressAsyncHandler(async (req, res) => {
  const authors = await Author.find();
  res.render("authorList", { title: "Author List", authors });
});

// Display detail page for a specific author.
export const authorDetail = expressAsyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  res.render("authorDetail", { title: "Author Detail", author });
});

// Display author create form on GET.
export const authorCreateGet = (req, res) => {
  res.send("NOT IMPLEMENTED: Author create GET");
};

// Handle author create on POST.
export const authorCreatePost = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Author create POST");
});

// Display author delete form on GET.
export const authorDeleteGet = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
});

// Display author delete on Post.
export const authorDeletePost = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
});

// Display author update form on GET.
export const authorUpdateGet = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Author update GET");
});

// Handle author update on POST.
export const authorUpdatePost = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Author update POST");
});
