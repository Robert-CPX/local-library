import express from "express";

const router = express.Router();

router.get("/cool", (req, res) => {
  res.send("You're cool");
});

export default router;
