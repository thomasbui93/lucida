import app from './../../../../app';
import FolderApi from './../../../../models/notes/folder';
import NoteApi from './../../../../models/notes/note';
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

describe('GET /v1/api/notes/:noteId', () => {
  
  before(async function () { 
      try {
        await FolderApi.remove({});
        await NoteApi.remove({});
      } catch (err) {
        throw new Error(err);
      }
  });

  it('should get a note with correct information', async function(){
    const folder = await FolderApi.saveFolder({ name: 'Folder' });
    const noteData = {title: 'Sample Note', content: 'sample content', folder: folder._id + ''};
    const note = await NoteApi.saveNote(noteData);
    const res = await chai
    .request(app)
    .get(`/v1/api/notes/${note._id + ''}`);

    expect(res).to.have.property('status',200);
    expect(res).to.have.property('body');
    expect(res.body).to.have.property('note');
    expect(res.body.note).to.be.an('object');
    expect(res.body.note).to.have.property('title', noteData.title);
    expect(res.body.note).to.have.property('content', noteData.content);
    expect(res.body.note).to.have.property('folder');
    expect(res.body.note.folder).to.be.an('object');
    expect(res.body.note.folder).to.have.property('_id', folder._id + '');
  });

  it('should not get a note without correct information', function(done){
    chai
    .request(app)
    .get(`/v1/api/notes/xyz`)
    .end((res, err) => {
      expect(res.status).to.equal(404);
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