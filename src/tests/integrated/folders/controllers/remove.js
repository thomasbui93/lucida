import app from './../../../../app';
import FolderApi from './../../../../models/notes/folder';
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
describe('/v1/api/folders DELETE', () => {
  let folder;
  beforeEach(async function () { 
      try {
        await FolderApi.remove({});
        
      } catch (err) {
        throw new Error(err);
      }
  });

  it('should remove folder if they found one', async function() {
    try {
      const folder = await FolderApi.saveFolder({name: 'Folder'});
      const res = await chai
      .request(app)
      .del(`/v1/api/folders/${folder._id + ''}`)

      expect(res).to.have.property('status',200);
      expect(res).to.have.property('body');
      expect(res.body).to.have.property('folder');
      expect(res.body.folder).to.be.an('object');
      expect(res.body.folder).to.have.property('name', 'Folder');

      const existingFolder = await FolderApi.findById(folder._id);
      expect(existingFolder).to.be.a('null');
    } catch (err) {
      throw new Error(err);
    }
  });

  it('should remove folder cursively', async function(){
    try {
      const folder = await FolderApi.saveFolder({name: 'Folder'});
      const folderChild = await FolderApi.saveFolder({name: 'Child Folder', parent: folder._id});
      const folderGrand = await FolderApi.saveFolder({name: 'Grand Child Folder', parent: folderChild._id});

      const res = await chai
      .request(app)
      .del(`/v1/api/folders/${folder._id + ''}`)
      
      const existingFolder = await FolderApi.findById(folder._id);
      expect(existingFolder).to.be.a('null');

      const existingFolderChild = await FolderApi.findById(folderChild._id);
      expect(existingFolderChild).to.be.a('null');

      const existingFolderGrand = await FolderApi.findById(folderGrand._id);
      expect(existingFolderGrand).to.be.a('null');
    } catch (err) {
      throw new Error(err);
    }
  });

  afterEach(async function () {
    try {
      await FolderApi.remove({});
    } catch (err) {
      throw new new Error(err);
    }
  });
})