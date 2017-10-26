import FolderApi from './../../models/notes/folder';

/**
 * List all folders
 * @param req
 * @param res
 * @param next
 */
export const index = async (req, res, next) => {
  try {
    const folders = await FolderApi.find({ parent: null });
    res.status(200).json({ folders: folders });
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
    res.status(200).json({ folder: folder });
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
    const folder = await FolderApi.saveFolder(req.body);
    res.status(200).json({ folder: folder });
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
    res.status(200).json({ folder: folder });
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
    const folder = await FolderApi.findByIdAndRemove(folderId);
    res.status(200).json({ folder: folder });
  } catch (err) {
    next(err);
  }
};
