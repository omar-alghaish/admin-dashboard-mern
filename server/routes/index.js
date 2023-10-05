import express from "express";
import clientRoutes from "./client.rouer.js";
import generalRoutes from "./general.router.js";
import managementRoutes from "./management.router.js";
import salesRoutes from "./sales.rouer.js";

const router = express.Router();

router.use("/client", clientRoutes);
router.use("/general", generalRoutes);
router.use("/management", managementRoutes);
router.use("/sales", salesRoutes);

export default router;
