import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import NoteApi from './note';
/**
 * autopopulate
 * @param {*} next
 */
// eslint-disable-next-line func-names
const autoPopulate = function (next) {
  this.populate('parent children');
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

  static async saveFolder(folderId, folderData) {
    try {
      const folder = await this.findByIdAndUpdate(folderId, folderData);
      
      if(typeof folderData.children === 'array' && folderData.children.length > 0){
        await Promise.all(folderData.children.forEach((child)=>{
          return this.findByIdAndUpdate(child, { parent: folder._id })
        }))
      }

      if(typeof folder.parent !== 'undefined'){
        await this.findByIdAndUpdate(folder.parent, { $addToSet: { children: folder._id } })        
      }
      
    } catch(err) {
      return false;
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
