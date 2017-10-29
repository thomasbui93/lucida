import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import NoteApi from './note';
/**
 * autopopulate
 * @param {*} next
 */
// eslint-disable-next-line func-names
const autoPopulate = function (next) {
  this.populate('parent');
  next();
};

/**
 * Define initial schema
 */
const schema = new Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Folder'
  }
});

class FolderSchema {
  static async saveFolder(folderData, folderId) {
    try {
      let folder;
      if (folderId) {
        folder = await this.findByIdAndUpdate(folderId, folderData, {new: true});
      } else {
        folder = new this(folderData);
        folder = await folder.save();
      }
      return folder;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async removeFolder(folderId) {
    try {
      const folder = await this.findByIdAndRemove(folderId);
      const children = await this.find({
        parent: folderId
      });
      await Promise.all(children.map( child => {
        return this.removeFolder(child._id);
      }));
      return folder;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getFolder(folderId) {
    try {
      const folder = await this.findById(folderId).exec();
      const notes = await NoteApi.find({ folder: folderId });
      const children = await this.find({
        parent: folder._id
      });
      return Object.assign({}, folder.toObject(), {notes:notes, children: children});
    } catch (err) {
      throw new Error(err);
    }
  }
}

/**
 * Bootstrap model
 */
schema.loadClass(FolderSchema);
schema.plugin(timestamps);

/**
 * Add hooks to model
 */
schema.pre('find', autoPopulate);
schema.pre('findOne', autoPopulate);

export default mongoose.model('Folder', schema);
