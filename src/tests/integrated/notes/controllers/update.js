import app from './../../../../app';
import FolderApi from './../../../../models/notes/folder';
import NoteApi from './../../../../models/notes/note';
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

describe('PUT /v1/api/notes/:noteId', () => {
  
  before(async function () { 
      try {
        await FolderApi.remove({});
        await NoteApi.remove({});
      } catch (err) {
        throw new Error(err);
      }
  });

  it('should update a note while correct information', async function(){
    const folder = await FolderApi.saveFolder({ name: 'Folder' });
    const noteData = {title: 'Sample Note', content: 'sample content', folder: folder._id + ''};
    const note = await NoteApi.saveNote(noteData);
    const updatedData = {title: 'Another Note', content: 'Updated content'}
    const res = await chai
    .request(app)
    .put(`/v1/api/notes/${note._id + ''}`)
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(updatedData);

    expect(res).to.have.property('status',200);
    expect(res).to.have.property('body');
    expect(res.body).to.have.property('note');
    expect(res.body.note).to.be.an('object');
    expect(res.body.note).to.have.property('title', updatedData.title);
    expect(res.body.note).to.have.property('content', updatedData.content);
    expect(res.body.note).to.have.property('folder');
    expect(res.body.note.folder).to.eq(folder._id + '');
  });

  it('should not update a note while wrong information', async function(){
    try {
      const folder = await FolderApi.saveFolder({ name: 'Folder' });
      const noteData = {title: 'Sample Note', content: 'sample content', folder: folder._id + ''};
      const note = await NoteApi.saveNote(noteData);
      const updatedData = {title: 'Another Note', content: 'Updated content', folder: 'sample'}
      const res = await chai
      .request(app)
      .put(`/v1/api/notes/${note._id + ''}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(updatedData);
      expect(res).to.have.property('status',500);

      const existingNote = await NoteApi.findById(folder._id);
      expect(existingNote).to.be.an('object');
      expect(existingNote).to.have.property('title', noteData.title); 
      expect(existingNote).to.have.property('content', noteData.content); 
      expect(existingNote).to.have.property('folder');
      expect(existingNote.folder).to.have.property('_id', folder._id + '');
    } catch (err) {
      expect(err).to.have.property('status',400);
    }
  });

  afterEach(async function () {
    try {
      await FolderApi.remove({});
      await NoteApi.remove({});
    } catch (err) {
      throw new Error(err);
    }
  });
})