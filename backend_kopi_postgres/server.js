require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const auth = require("./src/routers/auth");
// const connectDB = require("./src/db/db");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
