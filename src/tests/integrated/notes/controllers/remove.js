import app from './../../../../app';
import FolderApi from './../../../../models/notes/folder';
import NoteApi from './../../../../models/notes/note';
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import {Types} from 'mongoose';
chai.use(chaiHttp);

describe('DELETE /v1/api/notes/:noteId', () => {
  
  before(async function () { 
      try {
        await FolderApi.remove({});
        await NoteApi.remove({});
      } catch (err) {
        throw new Error(err);
      }
  });

  it('should delete a note with correct information', async function(){
    const folder = await FolderApi.saveFolder({ name: 'Folder' });
    const noteData = {title: 'Sample Note', content: 'sample content', folder: folder._id + ''};
    const note = await NoteApi.saveNote(noteData);
    const res = await chai
    .request(app)
    .del(`/v1/api/notes/${note._id + ''}`);

    expect(res).to.have.property('status',200);
    expect(res).to.have.property('body');
    expect(res.body).to.have.property('note');
    expect(res.body.note).to.be.an('object');
    expect(res.body.note).to.have.property('title', noteData.title);
    expect(res.body.note).to.have.property('content', noteData.content);

    const existingNote = await NoteApi.findById(folder._id);
    expect(existingNote).to.be.an('null'); 
  });

  it('should not delete a note without correct information', function(done){
    chai
    .request(app)
    .del(`/v1/api/notes/${Types.ObjectId() + ''}`)
    .end((res, err) => {
      expect(err.status).to.equal(200);
      expect(err).to.be.an('object');
      done();
    })
  })

  it('should not delete a note without correct information', function(done){
    chai
    .request(app)
    .del(`/v1/api/notes/xyz`)
    .end((res, err) => {
      expect(err.status).to.equal(404);
      expect(err).to.be.an('object');
      done();
    })
  })

  afterEach(async function () {
    try {
      await FolderApi.remove({});
      await NoteApi.remove({});
    } catch (err) {
      throw new Error(err);
    }
  });
})