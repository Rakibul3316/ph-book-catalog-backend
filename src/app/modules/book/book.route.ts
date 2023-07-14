import express from 'express'
import { BookControllers } from './book.controller';
const router = express.Router();

router.post('/', BookControllers.createBook);
router.get("/:id", BookControllers.getSingleBook);
router.delete("/:id", BookControllers.deleteBook);

export const BookRoutes = router;