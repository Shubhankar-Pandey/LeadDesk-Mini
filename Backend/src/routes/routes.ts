import express from "express";
import { signin, signout, signup } from "../controller/auth.js";
import { auth } from "../middleware/auth.js";
import { createLead } from "../controller/client.js";
import { callme, changeStatus, getLead } from "../controller/admin.js";
const router = express.Router();


// auth routes
router.post("/api/v1/signup", signup);
router.post("/api/v1/signin", signin);
router.get("/api/v1/signout", auth, signout)

// client route
router.post("/api/v1/lead", createLead);

// admin routes
router.get("/api/v1/meCall", auth, callme)
router.get("/api/v1/lead", auth, getLead);
router.put("/api/v1/lead/:id", auth, changeStatus);


export default router;