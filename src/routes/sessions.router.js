import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  githubAuth,
  githubAuthCallback
} from '../controllers/sessions.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/github', githubAuth);
router.get('/githubcallback', githubAuthCallback);

export default router;