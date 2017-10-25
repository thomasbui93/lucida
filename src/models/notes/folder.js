import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
/**
 * autopopulate
 * @param {*} next
 */
// eslint-disable-next-line func-names
const autoPopulate = function (next) {
  this.populate('ancestor');
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
  children: [{
    type: Schema.Types.ObjectId,
    ref: 'Folder'
  }],
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Folder'
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
});

class FolderSchema {
  /**
   * Get direct notes
   */
  static getNotes(folderId) {
    return this.findOne(folderId).populate('notes').exec();
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
