import express from "express";
import usersRoute from "./routes/user.js";
import chalk from "chalk";

const app = express();

//express.json() is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// Basically translator - translates all requests to json file.
// !!! IMPORTANT - DATA NEED TO BE TRANSLATED BEFORE HANDLING REQUESTS

app.use(express.json()); // Used for postman

app.use(express.urlencoded()); // Used for form submission - html


function maintenanceMode(req, res, next){
    res.status(503).json({message: "Server is under maintenance. Please try again later."});
}
//app.use(maintenanceMode);

// let's server know static resources are available
// public is the folder name where static resources are located
app.use(express.static(`public`));

// app-level custom middleware
// logging all requests
app.use((req, res, next) => {

    // color the log based on the request method
    const method = req.method;
    let color = chalk.blue;
    if (method === "GET")
    {
        color = chalk.green;
    }
    if (method === "POST")
    {
        color = chalk.yellow;
    }

    // log the request method, url, and timestamp
    const timestamp = new Date().toLocaleDateString(`en-us`, {
        year: `numeric`,
        month: `2-digit`,
        day: `2-digit`,
        hour: `2-digit`,
        minute: `2-digit`,
        seconds: `2-digit`,
        hour12: false //use 24-hour clock
    });
    console.log(color(`${req.method} ${req.url} received at ${timestamp}`));
    next(); //forces the request to go to the next stage (another middleware or the end)
})

// if the user types /users, then go to user.js
// route-level middleware
app.use("/user", usersRoute);

app.listen(3000, () => console.log("Server running on port 3000"));