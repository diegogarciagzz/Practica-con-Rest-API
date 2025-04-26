
import { Router } from "express";
import {saludo, ping, marco, abc } from "../controllers/index.controllers.js";

const router = Router();


router.get("/", saludo);
router.get("/pong", ping);
router.get("/marco", marco);
router.get("/a/b/c", abc);


export default router;