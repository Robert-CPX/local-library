import Author from "../models/author.mjs";
import expressAsyncHandler from "express-async-handler";

// Display list of all authors.
export const authorList = expressAsyncHandler(async (req, res) => {
  const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
  res.render("authorList", { title: "Author List", authors: allAuthors });
});

// Display detail page for a specific author.
export const authorDetail = expressAsyncHandler(async (req, res) => {
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
  ]);
  if (author === null) {
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }
  res.render("authorDetail", {
    title: "Author Detail",
    author,
    allBooksByAuthor,
  });
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
