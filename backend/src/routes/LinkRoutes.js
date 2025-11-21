import express from "express";
import { createLink, getAllLinks, codeDetail, reDirect, deletecode } from "../controllers/LinkController.js";

const router = express.Router();

router.post("/links", createLink);
router.get("/links", getAllLinks);
router.get("/code/:code", codeDetail); // stats
router.get("/:code", reDirect);        // redirect
router.delete("/del/:code", deletecode);

export default router;
