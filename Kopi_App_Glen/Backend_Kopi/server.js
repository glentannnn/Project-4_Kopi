require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./src/db/db");
const kopi = require("./src/routers/kopi");
const roles = require("./src/routers/authroles");
const auth = require("./src/routers/auth");

const limiter = rateLimit({
  windowMS: 15 * 16 * 1000,
  max: 100,
  standardHeaders: true,
  lecgacyHeaders: false,
});

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", kopi);
app.use("/roles", roles);
app.use("/auth", auth);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
