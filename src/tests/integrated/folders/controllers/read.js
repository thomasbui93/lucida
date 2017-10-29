import app from './../../../../app';
import FolderApi from './../../../../models/notes/folder';
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

describe('GET /v1/api/folders', () => {
  let folder;
  let childrenFolder;
  let grandChildFolder;
  before(async function () { 
    try {
      await FolderApi.remove({});
      folder = await FolderApi.saveFolder({ name: 'Parent Folder' });
      childrenFolder = await FolderApi.saveFolder({ name: 'Child Folder', parent: folder._id + ''});
      grandChildFolder = await FolderApi.saveFolder({ name: 'Child L2 Folder', parent: childrenFolder._id + ''});
    } catch (err) {
      throw new Error(err);
    }
  });

  it('READ /v1/api/folders should read folder with populated children field', async function() {
    try {
      const res = await chai
      .request(app)
      .get(`/v1/api/folders/${childrenFolder._id + ''}`);

      expect(res.status).to.equal(200);
      expect(res.body.folder).to.have.property('children');
      expect(res.body.folder.children).to.have.be.an('array');
      expect(res.body.folder.children).to.have.property('length', 1);
      expect(res.body.folder.children[0]).to.have.property('name', 'Child L2 Folder');
      expect(res.body.folder).to.have.property('parent');
      expect(res.body.folder.parent).to.have.property('name', 'Parent Folder');

    } catch(err){
      throw Error(err);
    }
  });

  it('READ /v1/api/folders should show null if not found', done => {
    chai
    .request(app)
    .get(`/v1/api/folders/sample}`)
    .end((res, err) => {
      expect(res.status).to.equal(404);
      expect(err).to.be.an('object');
      done();
    })
  });

  afterEach(async function () {
    try {
      await FolderApi.remove({});
    } catch (err) {
      throw Error(err);
    }
  });
})
