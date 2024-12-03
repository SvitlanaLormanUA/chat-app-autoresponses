import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware';
import { getMessages, getUsersForSideBar, sendMessage } from '../controllers/message.controller';
import { get } from 'http';

const router = express.Router();

router.get('/users', protectedRoute, getUsersForSideBar);
router.get('/messages/:id', protectedRoute, getMessages);

router.post("/send/:id", protectedRoute, sendMessage);
export default router;