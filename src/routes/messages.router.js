import express from 'express';
import { retrieveMessages, saveMessage } from '../controllers/messages.controller.js';
import { adminAuthorize, userAuthorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', retrieveMessages);
router.post('/', userAuthorize, saveMessage);

export default router;