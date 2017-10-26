import { index, read, create, update, remove } from './../../../routers/notes/controllers';
import {stub, assert } from 'sinon';
import httpMocks from 'node-mocks-http';
import NoteApi from '../../../models/notes/note';

describe('#index', () => {
  before(()=>{
    stub(NoteApi, 'getItems');
  })

  it('shoud call find with correct params', async () => {
    const next = ()=> { console.log('sample') };
    const query = {
      tags: 'sa'
    };
    const request  = httpMocks.createRequest({
      method: 'GET',
      query: query
    });
    await index(request, {}, next);

    assert.calledWith(NoteApi.getItems, request.query);
  })
});

describe('#read', () => {
  before(()=>{
    stub(NoteApi, 'findById');
  })

  it('shoud call findById with correct params', async () => {
    const next = ()=> { console.log('sample') };
    const noteId = '123';
    const request  = httpMocks.createRequest({
      method: 'GET',
      params: {
        noteId: noteId
      }
    });

    await read(request, {}, next);

    assert.calledWith(NoteApi.findById, noteId);
  })
})

describe('#create', () => {
  before(()=>{
    stub(NoteApi, 'saveNote');
  })

  it('shoud call saveNote with correct params', async () => {
    const next = ()=> { console.log('sample') };
    const body = {sample: 'test'};
    const request  = httpMocks.createRequest({
      method: 'POST',
      body: body
    });
    
    await create(request, {}, next);

    assert.calledWith(NoteApi.saveNote, body);
  })
})

describe('#update', () => {

  it('shoud call saveNote with correct params', async () => {
    const next = ()=> { console.log('sample') };
    const body = {sample: 'test'};
    const noteId = '123';
    const request  = httpMocks.createRequest({
      method: 'PUT',
      params: {
        noteId: noteId
      },
      body: body
    });
    
    await update(request, {}, next);

    assert.calledWith(NoteApi.saveNote, body, noteId);
  })
})

describe('#remove', () => {
  before(()=>{
    stub(NoteApi, 'findByIdAndRemove');
  })

  it('shoud call findByIdAndRemove with correct params', async () => {
    const next = ()=> { console.log('sample') };
    const noteId = '123';
    const request  = httpMocks.createRequest({
      method: 'DELETE',
      params: {
        noteId: noteId
      }
    });
    
    await remove(request, {}, next);

    assert.calledWith(NoteApi.findByIdAndRemove, noteId);
  })
})