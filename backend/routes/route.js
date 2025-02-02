import express from 'express';
import register from '../controllers/register.js';
import login from '../controllers/login.js';
import logout from '../controllers/logout.js';
import { getProfile } from '../controllers/profileController.js';
import auth from '../middleware/auth.js';
import { create, deleteProblem, getAll, getOneProblem, update } from '../controllers/prob-controller.js';
import verifyCreator from '../middleware/verifyCreator.js';
import { addTestCase, getTestCasesByProblemId } from '../controllers/testcaseController.js';
import { runCode, submitCode } from '../controllers/compilerController.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get('/profile', auth, getProfile);

router.post("/create", auth, create);
router.get("/AllProblems", getAll);
router.get("/Problem/:id", getOneProblem);
router.put("/update/:id", auth, verifyCreator, update);
router.delete("/delete/:id", auth, verifyCreator, deleteProblem);

router.post('/testcase/:id', addTestCase);
router.get('/getTestcases/:id', getTestCasesByProblemId);

router.post('/submit', submitCode);
router.post('/run', runCode);
export default router;