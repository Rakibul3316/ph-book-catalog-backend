import express from 'express'
import { BookControllers } from './book.controller';
const router = express.Router();

router.post('/', BookControllers.createBook);

export const BookRoutes = router;