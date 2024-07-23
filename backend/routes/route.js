import express from 'express';
import register from '../controllers/register.js';
import login from '../controllers/login.js';
import logout from '../controllers/logout.js';
import { getProfile } from '../controllers/profileController.js';
import auth from '../middleware/auth.js';
import { create, deleteProblem, getAll, getOneProblem, update } from '../controllers/prob-controller.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get('/profile', auth, getProfile);

router.post("/create", create);
router.get("/AllProblems", getAll);
router.get("/Problem/:id", getOneProblem);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteProblem);

export default router;