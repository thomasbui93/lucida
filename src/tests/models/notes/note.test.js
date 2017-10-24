import NoteApi from './../../../models/notes/note';
import {stub, assert} from 'sinon';
import {expect} from 'chai';

/**
 * Unit test
 */
describe('NoteModel validation', () => {
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