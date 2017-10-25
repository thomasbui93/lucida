import NoteApi from './../../../models/notes/note';
import {stub, assert, match} from 'sinon';
import {expect} from 'chai';

/**
 * Unit test
 */
describe('Note Model validation', () => {
  it('should validate successfully according to to the schema', (done) => {
    const note = new NoteApi({title: 'sample', content: 'content'});
    note.validate(function(err) {
      expect(err).to.be.null;
      done();
    });
  })

  it('should show error according to to the schema', (done) => {
    const note = new NoteApi({title: 'sample'});
    note.validate(function(err) {
      expect(err.errors.content).to.exist;
      done();
    });
  })

});

describe('#getItems', () => {
  before(()=> {
    stub(NoteApi, 'paginate');
  });

  it('should call function paginate once', () => {
    NoteApi.getItems({});
    assert.calledOnce(NoteApi.paginate);
  });

  it('should call function paginate with correct params', () => {
    NoteApi.getItems({
      tags: 'tag1,tag2',
      folder: 'folder',
      queryKey: 'queryKey',
      pageSize: 4,
      page: 2,
      sort: {'sampleSorting': -1}
    });

    assert.calledWith(NoteApi.paginate, match({
      tags: { $in: ["tag1", "tag2"]},
      folder: 'folder',
      $text: { $search: 'queryKey' }
    }), match({
      page: 2,
      offset: 4,
      limit: 4,
      sort: {'sampleSorting': -1}
    }));
  });

  it('should call function paginate without queryKey if queryKey length is smaller than 3', () => {
    NoteApi.getItems({
      tags: 'tag1,tag2',
      folder: 'folder',
      queryKey: 'qu',
      pageSize: 4,
      page: 2,
      sort: {'sampleSorting': -1}
    });

    assert.calledWith(NoteApi.paginate, match({
      tags: { $in: ["tag1", "tag2"]},
      folder: 'folder'
    }), match({
      page: 2,
      offset: 4,
      limit: 4,
      sort: {'sampleSorting': -1}
    }));
  })
})