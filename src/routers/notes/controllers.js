import NoteApi from './../../models/notes/note';

/**
 * List all notes
 * @param req
 * @param res
 * @param next
 */
export const index = async (req, res, next) => {
  try {
    const collection = await NoteApi.getItems(req.query);
    res.json({ notes: collection.docs });
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
    const { noteId } = req.params;
    const note = await NoteApi.findById(noteId);
    res.status(200).json({ note: note });
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
    res.status(200).json({ note: note });
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
    res.status(200).json({ note: note });
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
    res.status(200).json({ note: note });
  } catch (err) {
    next(err);
  }
};
