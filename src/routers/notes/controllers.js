import NoteApi from './../../models/notes/note';

/**
 * List all categories
 * @param req
 * @param res
 * @param next
 */
export const index = async (req, res, next) => {
  try {
    const notes = await NoteApi.getItems(req.query);
    res.json({ notes: notes });
  } catch (err) {
    next(err);
  }
};

/**
 * Get One Note
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const read = async (req, res, next) => {
  try {
    const { noteId } = req.query;
    const note = await NoteApi.findById(noteId);
    res.json({ note: note });
  } catch (err) {
    next(err);
  }
};

/**
 * Create One Note
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const create = async (req, res, next) => {
  try {
    const note = await NoteApi.saveNote(req.body);
    res.json({ note: note });
  } catch (err) {
    next(err);
  }
};

/**
 * Update One Note
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const update = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await NoteApi.saveNote(req.body, noteId);
    res.json({ note: note });
  } catch (err) {
    next(err);
  }
};

/**
 * Remove One Note
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const remove = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await NoteApi.findByIdAndRemove(noteId);
    res.json({ note: note });
  } catch (err) {
    next(err);
  }
};
