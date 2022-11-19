import express from "express";
import controller from "../controllers/Record";

const router = express.Router();

router.post("/create", controller.createRecord);
router.get("/get/", controller.getRecords);
router.get("/get/:id", controller.getRecord);
router.get("/delete/:id", controller.deleteRecord);

export = router;
