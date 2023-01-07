import express from "express";
import controller from "../controllers/User";

const router = express.Router();

router.post("/create/", controller.createUser);
router.get("/get/", controller.getAllUsers);
// Getting id seems to not be working
router.get("/get/:id", controller.getUser);
router.delete("/delete/:id", controller.deleteUser);
router.get("/resume/", controller.resumeSession)

export = router;
