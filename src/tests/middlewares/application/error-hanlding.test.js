import { errorHandling, logError } from './../../../middlewares/application/error-handling';
import { stub, assert } from 'sinon';
import { expect } from 'chai';
import fs from 'fs';

describe('#logError', () => {
  before(function() {
    stub(fs, 'writeFile');
  }) 

  it('should return false if and writeFile should not be called if err is not an object', async function() {
    const err = false;
    const result = await logError(err);
    assert.notCalled(fs.writeFile);
    expect(result).to.eq(false);
  });

  it('should call writeFile if err is an object', async function() {
    const err = {stack: 'stack'};
    await logError(err);
    assert.calledOnce(fs.writeFile);
  });
});