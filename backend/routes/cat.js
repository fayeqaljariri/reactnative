const express = require("express");
const {
  getAllCats,
  createNewCats,
  updateCatsById,
  deleteCatsById,
} = require("../controllers/cat");

const catsRouter = express.Router();

catsRouter.get("/", getAllCats);
catsRouter.post("/", createNewCats);
catsRouter.put("/:id", updateCatsById);
catsRouter.delete("/:id", deleteCatsById);
module.exports = catsRouter;
