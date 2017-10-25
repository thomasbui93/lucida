import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import paginate from 'mongoose-paginate';
import beautifyUnique from 'mongoose-beautiful-unique-validation';
import { readConfig } from './../../service/config/file-loader';

/**
 * Pagination setting
 */
const PAGE_SIZE = readConfig('collection/page-size') || 5;
const CURRENT_PAGE = 1;
const ORDER_BY = readConfig('collection/sort') || {
  createdAt: -1
};

/**
 * autopopulate
 * @param {*} next
 */
// eslint-disable-next-line func-names
const autoPopulate = function (next) {
  this.populate('folder');
  next();
};

/**
 * Define initial schema
 */
const schema = new Schema({
  title: {
    type: String,
    index: true,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [
    {
      type: String
    }
  ],
  folder: {
    type: Schema.Types.ObjectId,
    ref: 'Folder'
  }
});

class NoteSchema {
  /**
   * Get Items by query and pagination options
   * @param {*} query
   */
  static getItems(query) {
    let queryObject = {};
    const {
      tags,
      queryKey,
      folder,
      pageSize = PAGE_SIZE,
      page = CURRENT_PAGE,
      sort = ORDER_BY
    } = query;

    const offset = page - 1 >= 0 ? pageSize * (page - 1) : 0;

    const pagination = {
      page: page,
      offset: offset,
      limit: pageSize,
      sort: sort
    };

    if (tags) {
      queryObject = Object.assign(
        {}, queryObject,
        {
          tags: {
            $in: tags.split(',')
          }
        }
      );
    }

    if (folder) {
      queryObject = Object.assign({}, queryObject, {
        folder: folder
      });
    }

    if (queryKey && queryKey.length > 2) {
      queryObject = Object.assign(
        {}, queryObject,
        {
          $text: { $search: queryKey }
        }
      );
    }

    return this.paginate(queryObject, pagination);
  }
}
/**
 * Bootstrap model
 */
schema.loadClass(NoteSchema);
schema.plugin(timestamps);
schema.plugin(paginate);
schema.plugin(beautifyUnique);
schema.index({ title: 'text', content: 'text' }, { weights: { title: 2, content: 1 } });

/**
 * Add hooks to model
 */
schema.pre('find', autoPopulate);
schema.pre('findOne', autoPopulate);

export default mongoose.model('Note', schema);
