import Product from "../models/product.js";
import ProductStat from "../models/productStat.js";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import Transaction from "../models/transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  const productsWithStats = await Promise.all(
    products.map(async (product) => {
      const stat = await ProductStat.find({
        productId: product._id,
      });
      return {
        ...product._doc,
        stat,
      };
    })
  );
  res.status(200).json(productsWithStats);
});

export const getCustomers = asyncHandler(async (req, res, next) => {
  const customers = await User.find({ role: "user" }).select("-password");
  res.status(200).json(customers);
});

export const getTransactions = asyncHandler(async (req, res, next) => {
  const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

  // formatted sort should look like { userId: -1 }
  const generateSort = () => {
    const sortParsed = JSON.parse(sort);
    const sortFormatted = {
      [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
    };

    return sortFormatted;
  };
  const sortFormatted = Boolean(sort) ? generateSort() : {};

  const transactions = await Transaction.find({
    $or: [
      { cost: { $regex: new RegExp(search, "i") } },
      { userId: { $regex: new RegExp(search, "i") } },
    ],
  })
    .sort(sortFormatted)
    .skip(page * pageSize)
    .limit(pageSize);

  const total = await Transaction.countDocuments({
    name: { $regex: search, $options: "i" },
  });

  res.status(200).json({
    transactions,
    total,
  });
});

export const getGeography = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  const mappedLocations = users.reduce((acc, { country }) => {
    const countryISO3 = getCountryIso3(country);
    if (!acc[countryISO3]) {
      acc[countryISO3] = 0;
    }
    acc[countryISO3]++;
    return acc;
  }, {});
  const formattedLocations = Object.entries(mappedLocations).map(
    ([country, count]) => {
      return { id: country, value: count }
    }
  )
  res.status(200).json(formattedLocations)
});
