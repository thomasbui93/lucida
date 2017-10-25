import { Router } from 'express';
import { index, read, create, update, remove } from './controllers';

const router = Router();

router.get('/', index);
router.get('/:noteId', read);
router.post('/', create);
router.put('/:noteId', update);
router.del('/:noteId', remove);

export default router;
