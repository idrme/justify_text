import {Router} from "express";
import { justify, getToken } from "../controllers/apiController.js"


const router = Router();

router.post("/justify", justify);
router.post("/token", getToken);

export default router;

