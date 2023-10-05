import mongoose from "mongoose";
import "colors";
import { dataProduct,dataOverallStat, dataProductStat,dataUser, dataTransaction } from "../utils/dummyData/data.js";
import Product from "../models/product.js";
import ProductStat from "../models/productStat.js";
import User from "../models/user.js";
import Transaction from "../models/transaction.js";
import OverallStat from "../models/OverallStat.js"

const dbConnection = () => {
  mongoose.set("strictQuery", true);
  const URI = process.env.DB_URI;

  mongoose.connect(URI).then((connect) => {
    console.log(`connected to database: ${connect.connection.name.green}`);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // User.insertMany(dataUser)
    // Transaction.insertMany(dataTransaction)
    // OverallStat.insertMany(dataOverallStat)
  });
};

export default dbConnection;
