import express from "express";
import usersRoute from "./routes/user.js";

const app = express();

//express.json() is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// if the user types /users, then go to user.js
app.use("/users", usersRoute);
// route-level middleware

app.listen(3000, () => console.log("Server running on port 3000"));