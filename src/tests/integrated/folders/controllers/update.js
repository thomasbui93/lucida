import app from './../../../../app';
import FolderApi from './../../../../models/notes/folder';
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

describe('PUT /v1/api/folders', () => {
  before(async function () { 
    try {
      await FolderApi.remove({});
    } catch (err) {
      throw new Error(err);
    }
  });

  it('add parent folder', async function() {
    try {
      const folder = await FolderApi.saveFolder({ name: 'Parent Folder' });
      const childrenFolder = await FolderApi.saveFolder({ name: 'Child Folder'});

      const res = await chai
      .request(app)
      .put(`/v1/api/folders/${childrenFolder._id + ''}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({name: 'Update Child Folder', parent: folder._id + ''});

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('folder');
      expect(res.body.folder).to.have.property('parent', folder._id + '');
      expect(res.body.folder).to.have.property('name', 'Update Child Folder');

    } catch(err){
      throw new Error(err);
    }
  });

  it('swap parent operation', async function() {
    const folder1 = await FolderApi.saveFolder({ name: 'Parent Folder 1' });
    const folder2 = await FolderApi.saveFolder({ name: 'Parent Folder 2' });
    const childrenFolder = await FolderApi.saveFolder({ name: 'Child Folder', parent: folder1._id});

    const res = await chai
    .request(app)
    .put(`/v1/api/folders/${childrenFolder._id + ''}`)
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({name: 'Update Child Folder', parent: folder2._id + ''});

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('folder');
    expect(res.body.folder).to.have.property('parent', folder2._id + '');
    expect(res.body.folder).to.have.property('name', 'Update Child Folder');
  });

  afterEach(async function () {
    try {
      await FolderApi.remove({});
    } catch (err) {
      throw new Error(err);
    }
  });
})
