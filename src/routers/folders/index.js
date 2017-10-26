import { Router } from 'express';
import { index, read, create, update, remove } from './controllers';

const router = Router();

router.get('/', index);
router.get('/:folderId', read);
router.post('/', create);
router.put('/:folderId', update);
router.delete('/:folderId', remove);

export default router;