import express from "express";

import mountRoutes from "./routes/index.js";
import generalConfigs, { dotenvConfig } from "./configs/general.js";
import dbConnection from "./configs/database.js";
import ApiError from "./utils/apiError.js";
import serverconfig from "./configs/server.js";
import globalError from "./middlewares/errorMiddleware.js";

dotenvConfig();
const app = express();
generalConfigs(app);
dbConnection();
app.use("/api/v1", mountRoutes);
app.all("*", (req, res, next) => {
  next(new ApiError(`can not find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

const server = serverconfig(app);

process.on("unhandledRejection", (err) => {
  console.error(
    `${"unhandledRejection Error: ".red}${err.name} => ${err.message}`
  );
  server.close(() => {
    console.error(`shutting down...`);
    process.exit(1);
  });
});
