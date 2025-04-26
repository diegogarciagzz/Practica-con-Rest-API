import { Router } from "express";
import { 
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser,
    login
 } from "../controllers/users.controller.js";


const router = Router();

router.get("/users", getUsers );
router.get("/users/:id", getUser); // toma una id 
router.post("/users", postUser);
router.put("/users/:id",putUser); //
router.delete("/users/:id", deleteUser);
router.post("/login", login);


export default router;