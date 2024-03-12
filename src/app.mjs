import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index.mjs";
import usersRouter from "./routes/users.mjs";
import catalogRouter from "./routes/catalog.mjs";
import createHttpError from "http-errors";
import { connectToDatabase } from "./lib/mongoose.mjs";

const app = express();

// Connect to database
try {
  await connectToDatabase();
} catch (error) {
  console.error("Error connecting to database", error);
  process.exit(1);
}

const PORT = process.env.PORT || 1234;

// Logging middleware
app.use(logger("dev"));

// Handlebars Middleware
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
app.set("views", `${import.meta.dirname}/views`);

// Cookie parser middleware
app.use(cookieParser());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(path.join(import.meta.dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createHttpError(404));
});

// error handleing middleware, due to its 4 parameters, express knows it is an error handling middleware
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
