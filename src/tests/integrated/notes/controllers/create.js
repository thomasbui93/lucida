import app from './../../../../app';
import FolderApi from './../../../../models/notes/folder';
import NoteApi from './../../../../models/notes/note';
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

describe('POST /v1/api/notes', () => {
  
  before(async function () { 
      try {
        await FolderApi.remove({});
        await NoteApi.remove({});
      } catch (err) {
        throw new Error(err);
      }
  });

  it('should create a note while correct information', async function(){
    const folder = await FolderApi.saveFolder({ name: 'Folder' });
    const noteData = {title: 'Sample Note', content: 'sample content', folder: folder._id + ''};
    const res = await chai
    .request(app)
    .post('/v1/api/notes')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(noteData);

    expect(res).to.have.property('status',200);
    expect(res).to.have.property('body');
    expect(res.body).to.have.property('note');
    expect(res.body.note).to.be.an('object');
    expect(res.body.note).to.have.property('title', noteData.title);
    expect(res.body.note).to.have.property('content', noteData.content);
    expect(res.body.note).to.have.property('folder');
    expect(res.body.note.folder).to.eq(folder._id + '');
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