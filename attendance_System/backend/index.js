// Importing required packages
import express from "express"; // Express framework to create server and handle routes
import cors from "cors"; // To enable Cross-Origin Resource Sharing (for frontend-backend connection)
import cookieParser from "cookie-parser"; // To parse cookies from client requests
import morgan from "morgan"; // For logging HTTP requests (useful for debugging)
import dotenv, { config } from "dotenv"; // To load environment variables from .env file
// import { ConnectDB } from "./config/db.js"; // Import database connection function (custom file)
import Authrouter from "./router/Auth.route.js";
import AdminRegister from "./router/Auth.route.js";

// Load environment variables from the .env file
dotenv.config();

// Create an Express app instance
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Allow requests only from specific frontend URL (from .env)
    credentials: true, // Allow cookies and authentication headers
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allow specific HTTP methods
  })
);

// Parse incoming JSON data (used for POST/PUT requests with JSON body)
app.use(express.json());

// Parse cookies attached to client requests
app.use(cookieParser());

// Parse URL-encoded data (like form submissions)
// extended: true allows rich objects and arrays to be encoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Use morgan middleware to log details of each request in console (method, status, time, etc.)
app.use(morgan("dev"));

app.use("/api/v1", Authrouter);
app.use("/api/v1", AdminRegister);

// Test route — when user visits "/", send a success message
app.get("/", (req, res) => {
  res.send("<h1>SuccessFully Connected</h1>");
});

// Start the server on the port defined in .env file
app.listen(process.env.PORT, () => {
  console.log(`✅ Server Running At Port ${process.env.PORT}`);
});
