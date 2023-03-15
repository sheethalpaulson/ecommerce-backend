const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const cors = require("cors");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

app.use(
  cors(
    {
      "origin": ["http://localhost:3000", "https://sheethal-ecommerce-site.onrender.com"],
      "methods": ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
      "headers.allow": ["Authorization", "Accept", "Content-Type", "Access-Control-Request-Headers", "Access-Control-Request-Method"],
        "credentials": true,
        "cache": 86400
    }
  )
);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
// })