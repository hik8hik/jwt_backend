require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");

//connecting DB
connectDB();

const app = express();

//middleware
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
