import express, { Router } from "express";
import controller from "../controllers/index.mjs";

const router = Router();

/// BOOK ROUTES ///

// GET catalog home page.
router.get("/", controller.bookController.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/book/create", controller.bookController.bookCreateGet);

// POST request for creating Book.
router.post("/book/create", controller.bookController.bookCreatePost);

// GET request to delete Book.
router.get("/book/:id/delete", controller.bookController.bookDeleteGet);

// POST request to delete Book.
router.post("/book/:id/delete", controller.bookController.bookDeletePost);

// GET request to update Book.
router.get("/book/:id/update", controller.bookController.bookUpdateGet);

// POST request to update Book.
router.post("/book/:id/update", controller.bookController.bookUpdatePost);

// GET request for one Book.
router.get("/book/:id", controller.bookController.bookDetail);

// GET request for list of all Book items.
router.get("/books", controller.bookController.bookList);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/author/create", controller.authorController.authorCreateGet);

// POST request for creating Author.
router.post("/author/create", controller.authorController.authorCreatePost);

// GET request to delete Author.
router.get("/author/:id/delete", controller.authorController.authorDeleteGet);

// POST request to delete Author.
router.post("/author/:id/delete", controller.authorController.authorDeletePost);

// GET request to update Author.
router.get("/author/:id/update", controller.authorController.authorUpdateGet);

// POST request to update Author.
router.post("/author/:id/update", controller.authorController.authorUpdatePost);

// GET request for one Author.
router.get("/author/:id", controller.authorController.authorDetail);

// GET request for list of all Authors.
router.get("/authors", controller.authorController.authorList);

/// GENRE ROUTES ///
// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", controller.genreController.genreCreateGet);

//POST request for creating Genre.
router.post("/genre/create", controller.genreController.genreCreatePost);

// GET request to delete Genre.
router.get("/genre/:id/delete", controller.genreController.genreDeleteGet);

// POST request to delete Genre.
router.post("/genre/:id/delete", controller.genreController.genreDeletePost);

// GET request to update Genre.
router.get("/genre/:id/update", controller.genreController.genreUpdateGet);

// POST request to update Genre.
router.post("/genre/:id/update", controller.genreController.genreUpdatePost);

// GET request for one Genre.
router.get("/genre/:id", controller.genreController.genreDetail);

// GET request for list of all Genre.
router.get("/genres", controller.genreController.genreList);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get(
  "/bookinstance/create",
  controller.bookinstanceController.bookinstanceCreateGet
);

// POST request for creating BookInstance.
router.post(
  "/bookinstance/create",
  controller.bookinstanceController.bookinstanceCreatePost
);

// GET request to delete BookInstance.
router.get(
  "/bookinstance/:id/delete",
  controller.bookinstanceController.bookinstanceDeleteGet
);

// POST request to delete BookInstance.
router.post(
  "/bookinstance/:id/delete",
  controller.bookinstanceController.bookinstanceDeletePost
);

// GET request to update BookInstance.
router.get(
  "/bookinstance/:id/update",
  controller.bookinstanceController.bookinstanceUpdateGet
);

// POST request to update BookInstance.
router.post(
  "/bookinstance/:id/update",
  controller.bookinstanceController.bookinstanceUpdatePost
);

// GET request for one BookInstance.
router.get(
  "/bookinstance/:id",
  controller.bookinstanceController.bookinstanceDetail
);

// GET request for list of all BookInstance.
router.get(
  "/bookinstances",
  controller.bookinstanceController.bookinstanceList
);

export default router;
