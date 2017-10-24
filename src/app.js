import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import normalizePort from 'normalize-port';
import compression from 'compression';
import mongoose from 'mongoose';

const port = normalizePort(process.env.PORT || 8000);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression({ threshold: 0 }));


/**
 * Init the server
 */
app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> Open up http://0.0.0.0:%s/ in your browser.', port);
})

export default app;