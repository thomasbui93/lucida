import {getConfig, readConfig} from '../../../service/config/file-loader';
import assert from 'assert';

describe("getConfig", () => {
  it("should return false if the env file is not found", ()=> {
    const data = getConfig('env-failed.json'); 
    assert.equal(data, false);  
  })

  it("should not return false if the env file is found", () => {
    const data = getConfig('env-sample.json');
    assert.notEqual(data, false);
  })
});

describe("readConfig", ()=> {
  const correctConfigPaths = 'database/mongodb/host';
  const failedConfigPaths = 'database/failed/host'
  it("should return false if the env file is not found", ()=> {
    const data = readConfig(correctConfigPaths, '/', 'env-failed.json'); 
    assert.equal(data, false);  
  });

  it("should return value different than undefined if the env file is found and path is correct", ()=> {
    const data = readConfig(correctConfigPaths, '/', 'env-sample.json');
    console.log(data); 
    assert.notEqual(data, undefined);  
  });

  it("should return undefined if the env file is found and path is wrong", ()=> {
    const data = readConfig(failedConfigPaths, '/', 'env-sample.json'); 
    console.log(data);
    assert.equal(data, undefined);  
  });
})