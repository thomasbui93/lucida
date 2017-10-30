import app from './../../../../app';
import FolderApi from './../../../../models/notes/folder';
import NoteApi from './../../../../models/notes/note';
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

describe('GET /v1/api/notes', () => {
  let notes = [];
  before(async function () { 
      try {
        await FolderApi.remove({});
        await NoteApi.remove({});
        for(let i = 0; i < 10; i ++){
          notes[i] = await NoteApi.saveNote({title: `Title ${i}`, content: `Content ${i}`, tags: ['sample tags']});
        }
      } catch (err) {
        throw new Error(err);
      }
  });

  it('should get list of notes with pagination with default page and page size', async function(){
    const res =  await chai
    .request(app)
    .get('/v1/api/notes/');

    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property('notes');
    expect(res.body.notes).to.have.property('length', 5);

    for(let i = 0; i < 5; i ++){
      expect(res.body.notes[i]).to.have.property('title', `Title ${9 - i}`);
      expect(res.body.notes[i]).to.have.property('content', `Content ${9 - i}`);
    }
  });

  it('should get list of notes with pagination with custom page and page size', async function(){
    try {
      const res =  await chai
      .request(app)
      .get('/v1/api/notes?pageSize=3&page=2');

      expect(res).to.have.property('status', 200);
      expect(res.body).to.have.property('notes');
      expect(res.body.notes).to.have.property('length', 3);

      for(let i = 0; i < 3; i ++){
        expect(res.body.notes[i]).to.have.property('title', `Title ${6 - i}`);
        expect(res.body.notes[i]).to.have.property('content', `Content ${6 - i}`);
      }
    } catch (err) {
      console.log(err);
    }
  });

  after(async function () {
    try {
      await FolderApi.remove({});
      await NoteApi.remove({});
    } catch (err) {
      throw new Error(err);
    }
  });
})