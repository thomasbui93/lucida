import { index, read, create, update, remove } from './../../../routers/folders/controllers';
import {stub, spy, assert } from 'sinon';
import httpMocks from 'node-mocks-http';
import FolderApi from '../../../models/notes/folder';
import {Types} from 'mongoose';

describe('#index', () => {
  before(()=>{
    stub(FolderApi, 'find');
  })

  it('shoud call find with correct params', async () => {
    const next = spy();
    await index({}, {}, next);

    assert.calledWith(FolderApi.find, {parent: null});
  })
});

describe('#read', () => {
  before(()=>{
    stub(FolderApi, 'getFolder');
  })

  it('shoud call getFolder with correct params', async () => {
    const next = spy();
    const folderId = Types.ObjectId();
    const request  = httpMocks.createRequest({
      method: 'GET',
      params: {
        folderId: folderId
      }
    });
    const response = httpMocks.createResponse();
    await read(request, response, next);

    assert.calledWith(FolderApi.getFolder, folderId);
  })

  it('shoud not call getFolder if folderId is not a valid ObjectId', async () => {
    const next = spy();
    const folderId = '12132..asd.asd.';
    const request  = httpMocks.createRequest({
      method: 'GET',
      params: {
        folderId: folderId
      }
    });
    const response = httpMocks.createResponse();

    await read(request, response, next);

    assert.calledOnce(FolderApi.getFolder);
  })
})

describe('#create', () => {
  before(()=>{
    stub(FolderApi, 'saveFolder');
  })

  it('shoud call saveFolder with correct params', async () => {
    const next = spy();
    const body = {sample: 'test'};
    const request  = httpMocks.createRequest({
      method: 'POST',
      body: body
    });
    
    await create(request, {}, next);

    assert.calledWith(FolderApi.saveFolder, body);
  })
})

describe('#update', () => {

  it('shoud call saveFolder with correct params', async () => {
    const next = spy();
    const body = {sample: 'test'};
    const folderId = '123';
    const request  = httpMocks.createRequest({
      method: 'PUT',
      params: {
        folderId: folderId
      },
      body: body
    });
    
    await update(request, {}, next);

    assert.calledWith(FolderApi.saveFolder, body, folderId);
  })
})

describe('#remove', () => {
  before(()=>{
    stub(FolderApi, 'findByIdAndRemove');
  })

  it('shoud call findByIdAndRemove with correct params', async () => {
    const next = spy();
    const folderId = '123';
    const request  = httpMocks.createRequest({
      method: 'DELETE',
      params: {
        folderId: folderId
      }
    });
    
    await remove(request, {}, next);

    assert.calledWith(FolderApi.findByIdAndRemove, folderId);
  })
})