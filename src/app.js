import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import normalizePort from 'normalize-port';
import compression from 'compression';
import mongoose from 'mongoose';
import {readConfig} from './service/config/file-loader';
import {connectToDB} from './service/database/mongo';
import {loggerService} from './service/logger';

const port = normalizePort(readConfig('server/port') || 3000);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression({ threshold: 0 }));

/**
* Mongo Initialization
*/
connectToDB().then(()=> {
  loggerService('connected to MongoDB');
}).catch(err => {
  loggerService('Failed to connect to MongoDB', err);
})

/**
 * Init the server
 */
app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    loggerService(err);
  }
  console.info('==> Open up http://0.0.0.0:%s/ in your browser.', port);
})

export default app;