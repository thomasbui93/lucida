import app from './../../../../app';
import FolderApi from './../../../../models/notes/folder';
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

describe('POST /v1/api/folders', () => {
  const parentFolder = { name: 'Parent Folder' };
  before(async function () { 
      try {
        await FolderApi.remove({});
      } catch (err) {
        throw new Error(err);
      }
  });

  it('POST /v1/api/folders should create folder', done => {
    chai.request(app)
    .post('/v1/api/folders')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(parentFolder)
    .end((err, res) => {
      expect(res).to.have.property('status',200);
      expect(res).to.have.property('body');
      expect(res.body).to.have.property('folder');
      expect(res.body.folder).to.be.an('object');
      expect(res.body.folder).to.have.property('name', 'Parent Folder');
      done();
    });
  });

  it('POST /v1/api/folders should create folder with parent', async function() {
    try {
      const folder = await FolderApi.saveFolder(parentFolder);
      const childrenFolder = { name: 'Child Folder', parent: folder._id + ''};
      const res = await chai.request(app)
      .post('/v1/api/folders')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(childrenFolder);

      expect(res).to.have.property('status',200);
      expect(res).to.have.property('body');
      expect(res.body).to.have.property('folder');
      expect(res.body.folder).to.have.property('parent');
      expect(res.body.folder).to.be.an('object');
      expect(res.body.folder).to.have.property('name', 'Child Folder');
      expect(res.body.folder.parent).to.be.a('string');
    } catch (err) {
      throw new Error(err);
    }
  });

  afterEach(async function () {
    try {
      await FolderApi.remove({});
    } catch (err) {
      throw new Error(err);
    }
  });
})