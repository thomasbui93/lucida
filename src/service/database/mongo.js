import mongoose from 'mongoose';
import { readConfig } from './../config/file-loader';

/**
 * Connect To MongoDB
 * @param {*} options
 * @param {*} mongoConfigPath
 */
export const connectToDB = (options = { useMongoClient: true }, mongoConfigPath = 'database/mongodb')=> {
  const mongoConfig = readConfig(mongoConfigPath);
  if (mongoConfig) {
    const {
      username, password, host, port, name
    } = mongoConfig;
    mongoose.Promise = global.Promise;
    return mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${name}`, options);
  }
  return false;
};
