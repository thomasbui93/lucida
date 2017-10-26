import FolderApi from './../../../models/notes/folder';
import {stub, assert, match} from 'sinon';
import {expect} from 'chai';

/**
 * In this state, it would be best for only do unit test
 */
describe('Folder Model Validation', ()=> {
  it('should validate successfully according to to the schema', (done) => {
    const folder = new FolderApi({name: 'sample'});
    folder.validate(function(err) {
      expect(err).to.be.null;
      done();
    });
  })

  it('should show error according to to the schema', (done) => {
    const folder = new FolderApi({test: 'sample'});
    folder.validate(function(err) {
      expect(err.errors.name).to.exist;
      done();
    });
  })
})