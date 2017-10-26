import FolderApi from './../../models/notes/folder';

/**
 * List all folders
 * @param req
 * @param res
 * @param next
 */
export const index = async (req, res, next) => {
  try {
    const folders = await FolderApi.find({parent: null});
    res.json({ folders: folders });
  } catch (err) {
    next(err);
  }
};

/**
 * Get One folder
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const read = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    const folder = await FolderApi.findById(folderId).populate('notes').exec();
    res.json({ folder: folder });
  } catch (err) {
    next(err);
  }
};

/**
 * Create One Folder
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const create = async (req, res, next) => {
  try {
    const folder = await FolderApi.saveNote(req.body);
    res.json({ folder: folder });
  } catch (err) {
    next(err);
  }
};

/**
 * Update One Folder
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const update = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    const folder = await FolderApi.saveFolder(req.body, folderId);
    res.json({ folder: folder });
  } catch (err) {
    next(err);
  }
};

/**
 * Remove One Folder
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const remove = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    const folder = await NoteApi.findByIdAndRemove(folderId);
    res.json({ folder: folder });
  } catch (err) {
    next(err);
  }
};
