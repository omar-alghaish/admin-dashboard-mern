import OverallStat from "../models/OverallStat.js";
import asyncHandler from "express-async-handler";


export const getSales = asyncHandler(async (req, res) => {
    const overallStats = await OverallStat.find();

    res.status(200).json(overallStats[0]);

})