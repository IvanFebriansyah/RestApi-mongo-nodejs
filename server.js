const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

// Routes
const postsRoutes = require("./routes/api/posts");
const app = express();

mongoose
  .connect(MONGO_URI, { useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//Body parse middleware
app.use(express.json());

// User routes
app.use("/api/posts", postsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server run at port ${PORT}"));
