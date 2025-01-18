import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectTODB from "../database/db";
import shortUrl from "../routes/shortUrl";
// dotenv config
dotenv.config();
// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// routes

app.use("/api/", shortUrl);

// databse connection
connectTODB();
// port
const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
