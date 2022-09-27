const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");

//routers
const catsRouter = require("./routes/cat")



//built-in middleware

app.use(cors());
app.use(express.json());


// router middleware

app.use("/Cats",catsRouter)

const PORT = 5000;  




app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
