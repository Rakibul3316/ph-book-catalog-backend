import express from 'express'
import { BookControllers } from './book.controller';
const router = express.Router();

router.post('/', BookControllers.createBook);
router.get('/', BookControllers.getAllBooks);
router.patch('/:id', BookControllers.updateBook);
router.get("/:id", BookControllers.getSingleBook);
router.delete("/:id", BookControllers.deleteBook);

export const BookRoutes = router;