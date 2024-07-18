import express from 'express';
import register from '../controllers/register.js';
import login from '../controllers/login.js';
import logout from '../controllers/logout.js';
import { getProfile } from '../controllers/profileController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get('/profile', auth, getProfile);

export default router;