import express from "express";
import followCtrl from "../controllers/followCtrl";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/follow", auth, followCtrl.addFollowing);
router.patch("/follow", auth, followCtrl.removeFollowing);

export default router;