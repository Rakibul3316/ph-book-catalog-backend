import express from 'express'
import { BookControllers } from './book.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.AUTHOR), BookControllers.createBook);
router.get('/', BookControllers.getAllBooks);
router.patch('/:id', auth(), BookControllers.updateBook);
router.get("/:id", BookControllers.getSingleBook);
router.delete("/:id", BookControllers.deleteBook);

export const BookRoutes = router;