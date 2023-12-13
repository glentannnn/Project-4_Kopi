require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const auth = require("./src/routers/auth");
// const beans = require("./src/routers/beans");
// const equipment = require("./src/routers/equipment");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);
// app.use("/api/beans", beans);
// app.use("/api/equipment", equipment);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
