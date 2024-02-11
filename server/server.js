const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require('path')

//consfig
dotenv.config();

//mongoDB connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes (test)
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoute"));
app.use("/api/v1/analytics", require("./routes/anylaticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));



////Static folder
app.use(express.static(path.join(__dirname, './client/build')))

/////Statics Routes
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Node Server running in ${process.env.DEV_MODE} mode on port ${process.env.PORT}`
      .bgBlue.green
  );
});
