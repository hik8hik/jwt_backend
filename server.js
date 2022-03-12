require("dotenv").config({path: "./config.env"})
const express = require("express");

const app = express();

//middleware
app.use(express.json())

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
