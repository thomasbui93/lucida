import app from './../../../../app';
import FolderApi from './../../../../models/notes/folder';
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
describe('/v1/api/folders GET', () => {
  before(async function () { 
      try {
        await FolderApi.remove({});
        const parentFolder = await FolderApi.saveFolder({name: 'Parent Folder'});
        await FolderApi.saveFolder({'name': 'Children Folder 1', parent: parentFolder._id});
      } catch (err) {
        throw new Error(err);
      }
  });

  it('/v1/api/folders should get only root folders', done => {
    chai.request(app)
    .get('/v1/api/folders')
    .end((err, res) => {
      expect(res).to.have.property('status',200);
      expect(res).to.have.property('body');
      expect(res.body).to.have.property('folders');
      expect(res.body.folders).to.be.an('array');
      expect(res.body.folders).to.have.property('length', 1);
      done();
    });
  });

  after(async function () {
    try {
      await FolderApi.remove({});
    } catch (err) {
      throw new new Error(err);
    }
  });
})