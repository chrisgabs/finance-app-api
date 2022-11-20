import express from "express";
import controller from "../controllers/Record";

const router = express.Router();

router.post("/create", controller.createRecord);
router.get("/get/", controller.getRecords);
// Getting id seems to not be working
router.get("/get/:id", controller.getRecord);
router.delete("/delete/:id", controller.deleteRecord);

export = router;
