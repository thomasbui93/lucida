import FolderApi from './../../models/notes/folder';
import { Types } from 'mongoose';
/**
 * List all folders
 * @param req
 * @param res
 * @param next
 */
export const index = async (req, res, next) => {
  try {
    const collection = await FolderApi.find({ parent: null });
    res.json({ folders: collection });
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
    if (Types.ObjectId.isValid(folderId)) {
      const folder = await FolderApi.getFolder(folderId);
      res.status(200).json({ folder: folder });
    } else {
      res.status(404).json({ folder: null });
    }
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
    const folder = await FolderApi.removeFolder(folderId);
    res.status(200).json({ folder: folder });
  } catch (err) {
    next(err);
  }
};
